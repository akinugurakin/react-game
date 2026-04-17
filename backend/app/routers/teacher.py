"""
Öğretmen paneli endpoint'leri.
Öğretmenler, velilerden bağımsız bir rol değil — şimdilik veli tokenıyla erişebilirler.
Gelecekte ayrı öğretmen hesabı eklenebilir.
"""
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Query
from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_parent
from app.models.game_session import GameSession
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile

router = APIRouter(prefix="/teacher", tags=["teacher"])

GAME_TITLES: dict[str, str] = {
    "es-anlamli-hafiza": "Eş Anlamlı Hafıza",
    "harita-kaptani": "Harita Kaptanı",
    "inkilap-yolu": "İnkılap Yolu",
    "periyodik-tablo": "Periyodik Tablo",
    "soz-avcisi": "Söz Avcısı",
    "world-explorer": "World Explorer",
}


@router.get("/stats")
async def get_class_stats(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Tüm öğrencilerin genel istatistikleri."""
    students_result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = students_result.scalars().all()
    student_ids = [s.id for s in students]

    if not student_ids:
        return {
            "total_students": 0,
            "total_games": 0,
            "total_time_minutes": 0,
            "avg_score": 0,
            "active_today": 0,
            "top_game": None,
        }

    # Genel istatistikler
    stats = await db.execute(
        select(
            func.count(GameSession.id).label("total_games"),
            func.sum(GameSession.duration_seconds).label("total_seconds"),
            func.avg(GameSession.score).label("avg_score"),
        ).where(GameSession.student_id.in_(student_ids))
    )
    row = stats.one()

    # Bugün aktif olan öğrenci sayısı
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)
    active_result = await db.execute(
        select(func.count(func.distinct(GameSession.student_id))).where(
            GameSession.student_id.in_(student_ids),
            GameSession.completed_at >= today_start,
        )
    )
    active_today = active_result.scalar() or 0

    # En çok oynanan oyun
    top_game_result = await db.execute(
        select(GameSession.game_id, func.count(GameSession.id).label("cnt"))
        .where(GameSession.student_id.in_(student_ids))
        .group_by(GameSession.game_id)
        .order_by(desc("cnt"))
        .limit(1)
    )
    top_row = top_game_result.first()
    top_game = None
    if top_row:
        top_game = {
            "game_id": top_row.game_id,
            "title": GAME_TITLES.get(top_row.game_id, top_row.game_id),
            "play_count": top_row.cnt,
        }

    return {
        "total_students": len(students),
        "total_games": row.total_games or 0,
        "total_time_minutes": (row.total_seconds or 0) // 60,
        "avg_score": round(float(row.avg_score or 0)),
        "active_today": active_today,
        "top_game": top_game,
    }


@router.get("/students")
async def list_class_students(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    """Öğrenci listesi + her birinin özet istatistikleri."""
    students_result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = students_result.scalars().all()

    out = []
    for s in students:
        stats = await db.execute(
            select(
                func.count(GameSession.id).label("total_games"),
                func.max(GameSession.score).label("best_score"),
                func.max(GameSession.completed_at).label("last_played"),
            ).where(GameSession.student_id == s.id)
        )
        row = stats.one()
        out.append({
            "id": s.id,
            "first_name": s.first_name,
            "last_name": s.last_name,
            "avatar": s.avatar,
            "class_level": s.class_level,
            "total_games": row.total_games or 0,
            "best_score": row.best_score or 0,
            "last_played": row.last_played.isoformat() if row.last_played else None,
        })
    return out


@router.get("/students/{student_id}/sessions")
async def get_student_sessions(
    student_id: int,
    limit: int = Query(20, le=100),
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    """Bir öğrencinin son oyun seansları."""
    # Öğrencinin bu veliye ait olduğunu doğrula
    student_result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = student_result.scalar_one_or_none()
    if not student:
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")

    sessions_result = await db.execute(
        select(GameSession)
        .where(GameSession.student_id == student_id)
        .order_by(desc(GameSession.completed_at))
        .limit(limit)
    )
    sessions = sessions_result.scalars().all()
    return [
        {
            "id": s.id,
            "game_id": s.game_id,
            "game_title": GAME_TITLES.get(s.game_id, s.game_id),
            "score": s.score,
            "correct_count": s.correct_count,
            "wrong_count": s.wrong_count,
            "duration_seconds": s.duration_seconds,
            "platform": s.platform.value if s.platform else "web",
            "completed_at": s.completed_at.isoformat() if s.completed_at else None,
        }
        for s in sessions
    ]


@router.get("/leaderboard")
async def get_class_leaderboard(
    period: str = Query("weekly", pattern="^(weekly|alltime)$"),
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    """Sınıf içi liderlik tablosu — tüm oyunların toplam skoru."""
    students_result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = students_result.scalars().all()
    student_ids = [s.id for s in students]
    student_map = {s.id: s for s in students}

    if not student_ids:
        return []

    query = select(
        GameSession.student_id,
        func.sum(GameSession.score).label("total_score"),
        func.count(GameSession.id).label("total_games"),
    ).where(GameSession.student_id.in_(student_ids))

    if period == "weekly":
        since = datetime.now(timezone.utc) - timedelta(days=7)
        query = query.where(GameSession.completed_at >= since)

    query = query.group_by(GameSession.student_id).order_by(desc("total_score"))

    result = await db.execute(query)
    rows = result.all()

    leaderboard = []
    for rank, row in enumerate(rows, start=1):
        s = student_map[row.student_id]
        leaderboard.append({
            "rank": rank,
            "student_id": s.id,
            "first_name": s.first_name,
            "avatar": s.avatar,
            "total_score": row.total_score or 0,
            "total_games": row.total_games or 0,
        })
    return leaderboard


@router.get("/games/stats")
async def get_games_stats(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    """Her oyun için toplam oynama sayısı, ortalama skor, toplam süre."""
    students_result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = students_result.scalars().all()
    student_ids = [s.id for s in students]

    if not student_ids:
        return []

    result = await db.execute(
        select(
            GameSession.game_id,
            func.count(GameSession.id).label("play_count"),
            func.avg(GameSession.score).label("avg_score"),
            func.sum(GameSession.duration_seconds).label("total_seconds"),
        )
        .where(GameSession.student_id.in_(student_ids))
        .group_by(GameSession.game_id)
        .order_by(desc("play_count"))
    )
    rows = result.all()

    return [
        {
            "game_id": r.game_id,
            "title": GAME_TITLES.get(r.game_id, r.game_id),
            "play_count": r.play_count,
            "avg_score": round(float(r.avg_score or 0)),
            "total_minutes": (r.total_seconds or 0) // 60,
        }
        for r in rows
    ]

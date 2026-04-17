from datetime import datetime, timedelta, timezone
from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_parent
from app.core.security import hash_pin
from app.models.game_session import GameSession
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile
from app.schemas.auth import StudentResponse
from app.schemas.student import StudentCreate, StudentUpdate

router = APIRouter(prefix="/students", tags=["students"])


@router.get("", response_model=list[StudentResponse])
async def list_students(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[StudentResponse]:
    result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = result.scalars().all()
    return [StudentResponse.model_validate(s) for s in students]


@router.post("", response_model=StudentResponse, status_code=201)
async def create_student(
    data: StudentCreate,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> StudentResponse:
    student = StudentProfile(
        parent_id=parent.id,
        first_name=data.first_name,
        last_name=data.last_name,
        avatar=data.avatar,
        pin_hash=hash_pin(data.pin),
        class_level=data.class_level,
    )
    db.add(student)
    await db.flush()
    return StudentResponse.model_validate(student)


@router.patch("/{student_id}", response_model=StudentResponse)
async def update_student(
    student_id: int,
    data: StudentUpdate,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> StudentResponse:
    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")

    if data.first_name is not None:
        student.first_name = data.first_name
    if data.last_name is not None:
        student.last_name = data.last_name
    if data.avatar is not None:
        student.avatar = data.avatar
    if data.pin is not None:
        student.pin_hash = hash_pin(data.pin)
    if data.class_level is not None:
        student.class_level = data.class_level

    await db.flush()
    return StudentResponse.model_validate(student)


@router.get("/screen-time")
async def get_screen_time(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> list[dict]:
    """Tüm çocukların günlük ekran süresi durumunu döner."""
    result = await db.execute(
        select(StudentProfile).where(StudentProfile.parent_id == parent.id)
    )
    students = result.scalars().all()

    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0)

    out = []
    for s in students:
        usage_result = await db.execute(
            select(func.coalesce(func.sum(GameSession.duration_seconds), 0)).where(
                GameSession.student_id == s.id,
                GameSession.completed_at >= today_start,
            )
        )
        today_seconds = usage_result.scalar() or 0
        out.append({
            "id": s.id,
            "first_name": s.first_name,
            "avatar": s.avatar,
            "daily_limit_minutes": s.daily_limit_minutes,
            "screen_time_enabled": s.screen_time_enabled,
            "today_used_minutes": today_seconds // 60,
        })
    return out


@router.get("/{student_id}/stats")
async def get_student_stats(
    student_id: int,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> dict:
    # Verify student belongs to this parent
    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")

    stats = await db.execute(
        select(
            func.count(GameSession.id).label("total_games"),
            func.max(GameSession.score).label("best_score"),
            func.sum(GameSession.duration_seconds).label("total_time"),
            func.sum(GameSession.correct_count).label("total_correct"),
            func.sum(GameSession.wrong_count).label("total_wrong"),
        ).where(GameSession.student_id == student_id)
    )
    row = stats.one()

    recent = await db.execute(
        select(GameSession)
        .where(GameSession.student_id == student_id)
        .order_by(desc(GameSession.completed_at))
        .limit(5)
    )
    recent_sessions = [
        {
            "game_id": s.game_id,
            "score": s.score,
            "duration_seconds": s.duration_seconds,
            "completed_at": s.completed_at.isoformat() if s.completed_at else None,
        }
        for s in recent.scalars().all()
    ]

    return {
        "student_id": student.id,
        "first_name": student.first_name,
        "last_name": student.last_name,
        "avatar": student.avatar,
        "class_level": student.class_level,
        "total_games": row.total_games or 0,
        "best_score": row.best_score or 0,
        "total_time": row.total_time or 0,
        "total_correct": row.total_correct or 0,
        "total_wrong": row.total_wrong or 0,
        "recent_sessions": recent_sessions,
    }


@router.delete("/{student_id}", status_code=204)
async def delete_student(
    student_id: int,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> None:
    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")
    await db.delete(student)


@router.get("/{student_id}/activity")
async def get_student_activity(
    student_id: int,
    period: Literal["weekly", "monthly"] = Query("weekly"),
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Gün bazlı aktivite verisi döner (haftalık: 7 gün, aylık: 30 gün)."""
    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")

    days = 7 if period == "weekly" else 30
    since = datetime.now(timezone.utc) - timedelta(days=days)

    sessions_result = await db.execute(
        select(GameSession).where(
            GameSession.student_id == student_id,
            GameSession.completed_at >= since,
        )
    )
    sessions = sessions_result.scalars().all()

    # Gün bazlı gruplama
    day_map: dict[str, dict] = {}
    for i in range(days):
        day = (datetime.now(timezone.utc) - timedelta(days=days - 1 - i)).date()
        day_map[day.isoformat()] = {"date": day.isoformat(), "games": 0, "time": 0, "score_sum": 0, "score_count": 0}

    for s in sessions:
        day_key = s.completed_at.date().isoformat() if s.completed_at else None
        if day_key and day_key in day_map:
            day_map[day_key]["games"] += 1
            day_map[day_key]["time"] += s.duration_seconds // 60
            day_map[day_key]["score_sum"] += s.score
            day_map[day_key]["score_count"] += 1

    daily = []
    for entry in day_map.values():
        avg_score = round(entry["score_sum"] / entry["score_count"]) if entry["score_count"] > 0 else 0
        daily.append({
            "date": entry["date"],
            "games": entry["games"],
            "time": entry["time"],
            "score": avg_score,
        })

    total_games = sum(e["games"] for e in daily)
    total_time = sum(e["time"] for e in daily)
    scored = [e["score"] for e in daily if e["score"] > 0]
    avg_score = round(sum(scored) / len(scored)) if scored else 0

    return {
        "period": period,
        "days": days,
        "daily": daily,
        "summary": {
            "total_games": total_games,
            "total_time": total_time,
            "avg_score": avg_score,
        },
    }


@router.patch("/{student_id}/screen-time")
async def update_screen_time(
    student_id: int,
    data: dict,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> dict:
    """Günlük limit ve etkinlik ayarını günceller."""
    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent.id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Öğrenci bulunamadı.")

    if "daily_limit_minutes" in data:
        student.daily_limit_minutes = int(data["daily_limit_minutes"])
    if "screen_time_enabled" in data:
        student.screen_time_enabled = bool(data["screen_time_enabled"])

    await db.flush()
    return {"ok": True}

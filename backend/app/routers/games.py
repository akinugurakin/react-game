from fastapi import APIRouter, Depends
from sqlalchemy import select, desc, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.game_session import GameSession
from app.models.user import User
from app.schemas.game import GameSessionCreate, GameSessionResponse, LeaderboardEntry

router = APIRouter(prefix="/games", tags=["games"])


@router.post("/{game_id}/session", response_model=GameSessionResponse, status_code=201)
async def create_game_session(
    game_id: int,
    data: GameSessionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> GameSessionResponse:
    session = GameSession(
        user_id=current_user.id,
        game_id=game_id,
        score=data.score,
        correct_count=data.correct_count,
        wrong_count=data.wrong_count,
        duration_seconds=data.duration_seconds,
    )
    db.add(session)
    await db.flush()
    return GameSessionResponse.model_validate(session)


@router.get("/{game_id}/leaderboard", response_model=list[LeaderboardEntry])
async def get_leaderboard(
    game_id: int,
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardEntry]:
    result = await db.execute(
        select(
            User.username,
            GameSession.score,
            GameSession.correct_count,
            GameSession.duration_seconds,
            GameSession.completed_at,
        )
        .join(User, GameSession.user_id == User.id)
        .where(GameSession.game_id == game_id)
        .order_by(desc(GameSession.score), GameSession.duration_seconds)
        .limit(50)
    )
    rows = result.all()
    return [
        LeaderboardEntry(
            username=r.username,
            score=r.score,
            correct_count=r.correct_count,
            duration_seconds=r.duration_seconds,
            completed_at=r.completed_at,
        )
        for r in rows
    ]


@router.get("/my-sessions", response_model=list[GameSessionResponse])
async def get_my_sessions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[GameSessionResponse]:
    result = await db.execute(
        select(GameSession)
        .where(GameSession.user_id == current_user.id)
        .order_by(desc(GameSession.completed_at))
        .limit(20)
    )
    return [GameSessionResponse.model_validate(s) for s in result.scalars().all()]


@router.get("/my-stats")
async def get_my_stats(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    # Toplam oyun, en yüksek skor, toplam süre
    stats = await db.execute(
        select(
            func.count(GameSession.id).label("total_games"),
            func.max(GameSession.score).label("best_score"),
            func.sum(GameSession.duration_seconds).label("total_time"),
            func.sum(GameSession.correct_count).label("total_correct"),
            func.sum(GameSession.wrong_count).label("total_wrong"),
        ).where(GameSession.user_id == current_user.id)
    )
    row = stats.one()

    # Son oynanan oyunlar
    recent = await db.execute(
        select(GameSession)
        .where(GameSession.user_id == current_user.id)
        .order_by(desc(GameSession.completed_at))
        .limit(5)
    )
    recent_sessions = [
        {
            "game_id": s.game_id,
            "score": s.score,
            "correct_count": s.correct_count,
            "wrong_count": s.wrong_count,
            "duration_seconds": s.duration_seconds,
            "completed_at": s.completed_at.isoformat() if s.completed_at else None,
        }
        for s in recent.scalars().all()
    ]

    # Sıralama (tüm kullanıcılar arasında en yüksek skora göre)
    rank_result = await db.execute(
        select(func.count(func.distinct(GameSession.user_id)))
        .where(
            GameSession.score > (
                select(func.coalesce(func.max(GameSession.score), 0))
                .where(GameSession.user_id == current_user.id)
                .scalar_subquery()
            )
        )
    )
    rank = (rank_result.scalar() or 0) + 1

    return {
        "username": current_user.username,
        "total_games": row.total_games or 0,
        "best_score": row.best_score or 0,
        "total_time": row.total_time or 0,
        "total_correct": row.total_correct or 0,
        "total_wrong": row.total_wrong or 0,
        "rank": rank,
        "recent_sessions": recent_sessions,
    }

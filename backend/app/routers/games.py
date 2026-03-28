from fastapi import APIRouter, Depends
from sqlalchemy import select, desc
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

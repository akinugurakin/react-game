from fastapi import APIRouter, Depends
from sqlalchemy import desc, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.deps import get_current_student, require_active_subscription
from app.models.game_session import GameSession, Platform
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile
from app.schemas.game import GameSessionCreate, GameSessionResponse, LeaderboardEntry

router = APIRouter(prefix="/games", tags=["games"])


# Static routes must come before /{game_id}/... to avoid path conflicts
@router.get("/my-stats")
async def get_my_stats(
    current_student: StudentProfile = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
) -> dict:
    stats = await db.execute(
        select(
            func.count(GameSession.id).label("total_games"),
            func.max(GameSession.score).label("best_score"),
            func.sum(GameSession.duration_seconds).label("total_time"),
            func.sum(GameSession.correct_count).label("total_correct"),
            func.sum(GameSession.wrong_count).label("total_wrong"),
        ).where(GameSession.student_id == current_student.id)
    )
    row = stats.one()

    recent = await db.execute(
        select(GameSession)
        .where(GameSession.student_id == current_student.id)
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

    return {
        "student_id": current_student.id,
        "first_name": current_student.first_name,
        "total_games": row.total_games or 0,
        "best_score": row.best_score or 0,
        "total_time": row.total_time or 0,
        "total_correct": row.total_correct or 0,
        "total_wrong": row.total_wrong or 0,
        "recent_sessions": recent_sessions,
    }


@router.get("/my-sessions", response_model=list[GameSessionResponse])
async def get_my_sessions(
    current_student: StudentProfile = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
) -> list[GameSessionResponse]:
    result = await db.execute(
        select(GameSession)
        .where(GameSession.student_id == current_student.id)
        .order_by(desc(GameSession.completed_at))
        .limit(20)
    )
    return [GameSessionResponse.model_validate(s) for s in result.scalars().all()]


@router.post("/{game_id}/session", response_model=GameSessionResponse, status_code=201)
async def create_game_session(
    game_id: str,
    data: GameSessionCreate,
    current_student: StudentProfile = Depends(get_current_student),
    db: AsyncSession = Depends(get_db),
) -> GameSessionResponse:
    session = GameSession(
        student_id=current_student.id,
        game_id=game_id,
        score=data.score,
        correct_count=data.correct_count,
        wrong_count=data.wrong_count,
        duration_seconds=data.duration_seconds,
        platform=Platform(data.platform) if data.platform else Platform.WEB,
    )
    db.add(session)
    await db.flush()
    return GameSessionResponse.model_validate(session)


@router.get("/{game_id}/leaderboard", response_model=list[LeaderboardEntry])
async def get_leaderboard(
    game_id: str,
    db: AsyncSession = Depends(get_db),
) -> list[LeaderboardEntry]:
    result = await db.execute(
        select(
            StudentProfile.first_name,
            StudentProfile.avatar,
            GameSession.score,
            GameSession.correct_count,
            GameSession.duration_seconds,
            GameSession.completed_at,
        )
        .join(StudentProfile, GameSession.student_id == StudentProfile.id)
        .where(GameSession.game_id == game_id)
        .order_by(desc(GameSession.score), GameSession.duration_seconds)
        .limit(100)
    )
    rows = result.all()
    return [
        LeaderboardEntry(
            display_name=r.first_name,
            avatar=r.avatar,
            score=r.score,
            correct_count=r.correct_count,
            duration_seconds=r.duration_seconds,
            completed_at=r.completed_at,
        )
        for r in rows
    ]

"""
Haftalık leaderboard sıfırlama cron job'u.
Her Pazartesi 00:00 UTC'de çalışır.
FastAPI lifespan event'i ile başlatılır.
"""
import asyncio
import logging
from contextlib import asynccontextmanager
from datetime import UTC, datetime

from sqlalchemy import delete

from app.core.database import async_session as AsyncSessionLocal
from app.models.leaderboard import LeaderboardEntry

logger = logging.getLogger(__name__)


async def reset_weekly_leaderboard() -> None:
    """Haftalık leaderboard kayıtlarını siler."""
    async with AsyncSessionLocal() as db:
        result = await db.execute(
            delete(LeaderboardEntry).where(LeaderboardEntry.period == "weekly")
        )
        await db.commit()
        logger.info("Weekly leaderboard reset: %d rows deleted", result.rowcount)


def _seconds_until_next_monday() -> float:
    """Bir sonraki Pazartesi 00:00 UTC'ye kadar kalan saniye."""
    now = datetime.now(UTC)
    days_ahead = (7 - now.weekday()) % 7  # 0=Monday
    if days_ahead == 0 and now.hour == 0 and now.minute == 0:
        days_ahead = 7
    elif days_ahead == 0:
        days_ahead = 7
    next_monday = now.replace(hour=0, minute=0, second=0, microsecond=0)
    next_monday = next_monday.replace(
        day=next_monday.day + days_ahead
    )
    return (next_monday - now).total_seconds()


async def _weekly_reset_loop() -> None:
    while True:
        wait = _seconds_until_next_monday()
        logger.info("Next weekly leaderboard reset in %.0f seconds", wait)
        await asyncio.sleep(wait)
        try:
            await reset_weekly_leaderboard()
        except Exception:
            logger.exception("Weekly leaderboard reset failed")
        await asyncio.sleep(60)  # Pazartesi sabahı tekrar çalışmaması için kısa bekleme


_task: asyncio.Task | None = None


@asynccontextmanager
async def lifespan(app):
    global _task
    _task = asyncio.create_task(_weekly_reset_loop())
    logger.info("Weekly leaderboard scheduler started")
    yield
    if _task:
        _task.cancel()
        try:
            await _task
        except asyncio.CancelledError:
            pass

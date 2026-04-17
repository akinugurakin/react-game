"""Oyun oturumu ve leaderboard testleri."""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, create_student_session_token, hash_password, hash_pin
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile


async def _setup(db: AsyncSession, email: str = "gamer@lumo.com"):
    parent = ParentUser(
        first_name="Veli",
        last_name="Test",
        email=email,
        password_hash=hash_password("sifre"),
        phone_number="+905550000099",
        phone_verified=True,
        is_active=True,
        kvkk_accepted=True,
    )
    db.add(parent)
    await db.flush()

    student = StudentProfile(
        parent_id=parent.id,
        first_name="Oyuncu",
        last_name="Test",
        avatar="avatar_1",
        pin_hash=hash_pin("1234"),
        class_level=3,
    )
    db.add(student)
    await db.flush()

    parent_token = create_access_token({"sub": str(parent.id), "role": "parent"})
    student_token = create_student_session_token(student.id)
    return parent, student, parent_token, student_token


@pytest.mark.asyncio
async def test_create_game_session(client: AsyncClient, db: AsyncSession):
    """Oyun oturumu kaydedilir."""
    _, _, _, student_token = await _setup(db, "gamer1@lumo.com")
    headers = {"Authorization": f"Bearer {student_token}"}

    response = await client.post(
        "/games/es-anlamli-hafiza/session",
        headers=headers,
        json={
            "score": 850,
            "correct_count": 8,
            "wrong_count": 2,
            "duration_seconds": 120,
            "platform": "web",
        },
    )
    assert response.status_code == 201
    data = response.json()
    assert data["score"] == 850
    assert data["game_id"] == "es-anlamli-hafiza"


@pytest.mark.asyncio
async def test_my_stats(client: AsyncClient, db: AsyncSession):
    """Oturum kaydedildikten sonra /games/my-stats güncellenir."""
    _, _, _, student_token = await _setup(db, "gamer2@lumo.com")
    headers = {"Authorization": f"Bearer {student_token}"}

    await client.post(
        "/games/periyodik-tablo/session",
        headers=headers,
        json={"score": 500, "correct_count": 5, "wrong_count": 5, "duration_seconds": 90, "platform": "web"},
    )

    stats_response = await client.get("/games/my-stats", headers=headers)
    assert stats_response.status_code == 200
    stats = stats_response.json()
    assert stats["total_games"] == 1
    assert stats["best_score"] == 500


@pytest.mark.asyncio
async def test_leaderboard(client: AsyncClient, db: AsyncSession):
    """Leaderboard endpoint'i oturum kaydından sonra veri döner."""
    _, _, _, student_token = await _setup(db, "gamer3@lumo.com")
    headers = {"Authorization": f"Bearer {student_token}"}

    await client.post(
        "/games/inkilap-yolu/session",
        headers=headers,
        json={"score": 1000, "correct_count": 10, "wrong_count": 0, "duration_seconds": 60, "platform": "web"},
    )

    lb_response = await client.get("/games/inkilap-yolu/leaderboard")
    assert lb_response.status_code == 200
    leaderboard = lb_response.json()
    assert len(leaderboard) >= 1
    assert leaderboard[0]["score"] == 1000

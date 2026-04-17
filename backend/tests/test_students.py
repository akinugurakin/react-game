"""Öğrenci endpoint happy-path testleri."""
import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import create_access_token, hash_password
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile


async def _create_parent(db: AsyncSession, email: str = "parent@lumo.com") -> ParentUser:
    parent = ParentUser(
        first_name="Test",
        last_name="Veli",
        email=email,
        password_hash=hash_password("sifre123"),
        phone_number="+905550000001",
        phone_verified=True,
        is_active=True,
        kvkk_accepted=True,
    )
    db.add(parent)
    await db.flush()
    return parent


def _auth_headers(parent: ParentUser) -> dict:
    token = create_access_token({"sub": str(parent.id), "role": "parent"})
    return {"Authorization": f"Bearer {token}"}


@pytest.mark.asyncio
async def test_list_students_empty(client: AsyncClient, db: AsyncSession):
    """Yeni veli için öğrenci listesi boş döner."""
    parent = await _create_parent(db, "empty@lumo.com")
    headers = _auth_headers(parent)

    response = await client.get("/students", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


@pytest.mark.asyncio
async def test_create_and_list_student(client: AsyncClient, db: AsyncSession):
    """Öğrenci oluşturulur, liste endpoint'inde görünür."""
    parent = await _create_parent(db, "withchild@lumo.com")
    headers = _auth_headers(parent)

    create_response = await client.post(
        "/students",
        headers=headers,
        json={
            "first_name": "Ali",
            "last_name": "Yılmaz",
            "avatar": "avatar_1",
            "pin": "1234",
            "class_level": 3,
        },
    )
    assert create_response.status_code == 201
    student_data = create_response.json()
    assert student_data["first_name"] == "Ali"
    assert "id" in student_data

    list_response = await client.get("/students", headers=headers)
    assert list_response.status_code == 200
    students = list_response.json()
    assert len(students) == 1
    assert students[0]["id"] == student_data["id"]


@pytest.mark.asyncio
async def test_update_student(client: AsyncClient, db: AsyncSession):
    """Öğrenci güncelleme çalışır."""
    parent = await _create_parent(db, "update@lumo.com")
    headers = _auth_headers(parent)

    create_response = await client.post(
        "/students",
        headers=headers,
        json={
            "first_name": "Ayşe",
            "last_name": "Kaya",
            "avatar": "avatar_2",
            "pin": "5678",
            "class_level": 4,
        },
    )
    student_id = create_response.json()["id"]

    update_response = await client.patch(
        f"/students/{student_id}",
        headers=headers,
        json={"first_name": "Fatma", "class_level": 5},
    )
    assert update_response.status_code == 200
    assert update_response.json()["first_name"] == "Fatma"
    assert update_response.json()["class_level"] == 5


@pytest.mark.asyncio
async def test_delete_student(client: AsyncClient, db: AsyncSession):
    """Öğrenci silinir, listede görünmez."""
    parent = await _create_parent(db, "delete@lumo.com")
    headers = _auth_headers(parent)

    create_response = await client.post(
        "/students",
        headers=headers,
        json={
            "first_name": "Silinen",
            "last_name": "Profil",
            "avatar": "avatar_3",
            "pin": "0000",
            "class_level": 2,
        },
    )
    student_id = create_response.json()["id"]

    delete_response = await client.delete(f"/students/{student_id}", headers=headers)
    assert delete_response.status_code == 204

    list_response = await client.get("/students", headers=headers)
    assert list_response.json() == []


@pytest.mark.asyncio
async def test_cannot_access_other_parents_student(client: AsyncClient, db: AsyncSession):
    """Başka velinin öğrencisine erişim engellenir."""
    parent1 = await _create_parent(db, "parent1@lumo.com")
    parent2 = await _create_parent(db, "parent2@lumo.com")

    headers1 = _auth_headers(parent1)
    headers2 = _auth_headers(parent2)

    create_response = await client.post(
        "/students",
        headers=headers1,
        json={
            "first_name": "Özel",
            "last_name": "Çocuk",
            "avatar": "avatar_1",
            "pin": "1111",
            "class_level": 1,
        },
    )
    student_id = create_response.json()["id"]

    response = await client.patch(
        f"/students/{student_id}",
        headers=headers2,
        json={"first_name": "Hacklenmiş"},
    )
    assert response.status_code == 404

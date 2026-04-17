"""Auth endpoint happy-path testleri."""
import pytest
from httpx import AsyncClient
from unittest.mock import AsyncMock, patch


REGISTER_DATA = {
    "first_name": "Test",
    "last_name": "Kullanıcı",
    "email": "test@lumo.com",
    "password": "Gizli123!",
    "phone_number": "+905551234567",
    "kvkk_accepted": True,
}


@pytest.mark.asyncio
async def test_register_sends_otp(client: AsyncClient):
    """Kayıt endpoint'i OTP gönderir ve 201 döner."""
    response = await client.post("/auth/register", json=REGISTER_DATA)
    assert response.status_code == 201
    data = response.json()
    assert "phone_number" in data
    assert data["phone_number"] == REGISTER_DATA["phone_number"]


@pytest.mark.asyncio
async def test_register_duplicate_email(client: AsyncClient):
    """Aynı e-posta ile tekrar kayıt 400 döner."""
    await client.post("/auth/register", json=REGISTER_DATA)
    response = await client.post("/auth/register", json=REGISTER_DATA)
    assert response.status_code == 400


@pytest.mark.asyncio
async def test_verify_phone_and_login(client: AsyncClient):
    """OTP doğrulama → token alınır → login çalışır."""
    # Kayıt
    reg_data = {**REGISTER_DATA, "email": "verify@lumo.com", "phone_number": "+905559876543"}

    # Redis mock'un get'ini doğru OTP döndürecek şekilde ayarla
    otp_code = None

    original_post = client.post

    async def capturing_post(url, **kwargs):
        nonlocal otp_code
        resp = await original_post(url, **kwargs)
        if url == "/auth/register" and resp.status_code == 201:
            otp_code = resp.json().get("dev_code")
        return resp

    client.post = capturing_post  # type: ignore

    await client.post("/auth/register", json=reg_data)
    client.post = original_post  # type: ignore

    # dev_code None ise (DEBUG=False ortamda), testi atla
    if otp_code is None:
        pytest.skip("dev_code not available (DEBUG=False)")

    response = await client.post(
        "/auth/verify-phone",
        json={"phone_number": reg_data["phone_number"], "code": otp_code},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert "refresh_token" in data


@pytest.mark.asyncio
async def test_login_wrong_password(client: AsyncClient):
    """Yanlış şifre ile giriş 401 döner."""
    response = await client.post(
        "/auth/login",
        json={"email": "nonexistent@lumo.com", "password": "yanlis"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    """/health endpoint'i ok döner."""
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

"""
SMS gönderme servisi — Netgsm entegrasyonu.
NETGSM_USERCODE, NETGSM_PASSWORD, NETGSM_HEADER env variable'larından okunur.
Tanımlı değilse (geliştirme ortamı) OTP kodu loglanır, SMS gönderilmez.
"""
import logging

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

_NETGSM_URL = "https://api.netgsm.com.tr/sms/send/get"


async def send_otp_sms(phone_number: str, otp_code: str) -> bool:
    """
    OTP kodunu SMS ile gönderir.
    Başarılıysa True, hata durumunda False döner.
    Netgsm credentials tanımlı değilse sadece loglar (dev modu).
    """
    if not settings.NETGSM_USERCODE or not settings.NETGSM_PASSWORD:
        logger.info("SMS (dev mode) → %s: %s", phone_number, otp_code)
        return True

    # Netgsm E.164 formatı bekler ama başındaki + olmadan
    # +905551234567 → 905551234567
    clean_number = phone_number.lstrip("+")

    params = {
        "usercode": settings.NETGSM_USERCODE,
        "password": settings.NETGSM_PASSWORD,
        "gsmno": clean_number,
        "message": f"Lumo doğrulama kodunuz: {otp_code}",
        "msgheader": settings.NETGSM_HEADER,
        "dil": "TR",
    }

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(_NETGSM_URL, params=params)
            response_text = response.text.strip()

            # Netgsm başarı kodu "00" veya "01" ile başlar
            if response_text.startswith(("00", "01")):
                logger.info("SMS sent to %s, response: %s", phone_number, response_text)
                return True
            else:
                logger.error("Netgsm error for %s: %s", phone_number, response_text)
                return False
    except httpx.HTTPError as e:
        logger.error("SMS send failed for %s: %s", phone_number, str(e))
        return False

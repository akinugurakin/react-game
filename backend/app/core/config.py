from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Lumo API"
    DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://lumo:lumo_dev@localhost:5432/lumo"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Auth
    SECRET_KEY: str = "change-this-secret-key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    STUDENT_SESSION_EXPIRE_MINUTES: int = 480  # 8 saat
    ALGORITHM: str = "HS256"

    # PIN brute-force koruması
    PIN_MAX_ATTEMPTS: int = 5
    PIN_LOCKOUT_MINUTES: int = 15

    # Stripe
    STRIPE_SECRET_KEY: str = ""
    STRIPE_WEBHOOK_SECRET: str = ""
    STRIPE_MONTHLY_PRICE_ID: str = ""
    STRIPE_YEARLY_PRICE_ID: str = ""

    # SMS — Netgsm
    NETGSM_USERCODE: str = ""
    NETGSM_PASSWORD: str = ""
    NETGSM_HEADER: str = "LUMO"  # Onaylı başlık (alfanümerik, max 11 karakter)

    # CORS — virgülle ayrılmış
    ALLOWED_ORIGINS: str = "http://localhost:3000"

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",")]

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()

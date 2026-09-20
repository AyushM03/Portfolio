from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    allowed_origins: str = "http://localhost:3000"
    resend_api_key: str | None = None
    notify_email_from: str = "onboarding@resend.dev"
    notify_email_to: str = "aayushmeshram9168@gmail.com"
    rate_limit: str = "5/hour"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.allowed_origins.split(",") if origin.strip()]


settings = Settings()

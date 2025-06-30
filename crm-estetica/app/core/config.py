# app/core/config.py
from pydantic import BaseSettings

class Settings(BaseSettings):
    DB_URL: str
    OPENAI_KEY: str
    ASAAS_TOKEN: str
    WPP_API_URL: str
    WPP_TOKEN: str

    class Config:
        env_file = ".env"

settings = Settings()

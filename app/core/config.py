from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "UniConnect API"
    API_V1_STR: str = "/api/v1"
    
    # Cấu hình Database & Redis
    DATABASE_URL: str
    REDIS_URL: str
    DB_SERVER: str 
    DB_USER: str 
    DB_PASSWORD: str 
    DB_NAME: str 
    DB_PORT: str = "5432"

    # Cấu hình Bảo mật (JWT)
    REDIS_URL: Optional[str] = None
    SECRET_KEY: str  
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 ngày

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_SERVER}:{self.DB_PORT}/{self.DB_NAME}"

    class Config:
        # File .env (nếu chạy local không qua docker)
        env_file = ".env" 
        case_sensitive = True
        extra = "ignore"

settings = Settings()
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "UniConnect API"
    API_V1_STR: str = "/api/v1"
    
    # Cấu hình Database & Redis
    DATABASE_URL: str
    REDIS_URL: str

    # Cấu hình Bảo mật (JWT)
    SECRET_KEY: str  
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 ngày

    class Config:
        # File .env (nếu chạy local không qua docker)
        env_file = ".env" 
        case_sensitive = True
        extra = "ignore"

settings = Settings()
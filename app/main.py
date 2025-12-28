from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import cấu hình
# from app.core.database import engine, Base
from app.core.config import settings
from app.api import auth, users, activities

# Import Redis
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Khởi tạo Redis Cache
    if settings.REDIS_URL:
        redis = aioredis.from_url(settings.REDIS_URL, encoding="utf8", decode_responses=True)
        FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
    
    yield
    
    # Đóng kết nối Redis khi tắt app
    if settings.REDIS_URL:
        await redis.close()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json", # Đường dẫn file docs
    lifespan=lifespan
)

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth.router, 
    prefix=f"{settings.API_V1_STR}/auth", 
    tags=["Authentication"]
)

app.include_router(
    users.router, 
    prefix=f"{settings.API_V1_STR}/users", 
    tags=["Users"]
)

app.include_router(
    activities.router, 
    prefix=f"{settings.API_V1_STR}/activities", 
    tags=["Activities"]
)

@app.get("/")
async def root():
    return {
        "message": "Welcome to UniConnect API",
        "docs": "/docs",
        "version": "1.0.0"
    }
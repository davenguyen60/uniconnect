from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.core.database import get_db
from app.api import deps
from app.schemas.activity import ActivityCreate, ActivityResponse
from app.crud import activity as activity_crud
from app.models.user import User

router = APIRouter()

@router.post("/", response_model=ActivityResponse, status_code=status.HTTP_201_CREATED)
async def create_new_activity(
    activity_in: ActivityCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_user) # Bắt buộc phải Login
):
    """
    Tạo hoạt động mới tại vị trí (Lat, Lon)
    """
    return await activity_crud.create_activity(db=db, activity=activity_in, owner_id=current_user.id)

@router.get("/", response_model=List[ActivityResponse])
async def read_activities(
    offset: int = 0, 
    limit: int = 100, 
    db: AsyncSession = Depends(get_db)
):
    """
    Lấy danh sách hoạt động (Public - Ai cũng xem được)
    """
    return await activity_crud.get_activities(db, offset=offset, limit=limit)
from fastapi import APIRouter, Depends
from app.schemas.user import UserResponse
from app.models.user import User
from app.api import deps # <-- Import ông bảo vệ

router = APIRouter()

# API này ĐƯỢC BẢO VỆ
# Client phải gửi Token thì mới chạy được
@router.get("/me", response_model=UserResponse)
async def read_user_me(current_user: User = Depends(deps.get_current_user)):
    """
    Lấy thông tin của user đang đăng nhập.
    """
    return current_user
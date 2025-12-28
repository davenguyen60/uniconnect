from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin, Token
from app.core.security import verify_password, create_access_token
# Import CRUD
from app.crud import user as user_crud 
from datetime import timedelta
from app.core.config import settings

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    # 1. Gọi CRUD check tồn tại
    email_exists = await user_crud.check_email_exists(db, email=user_in.email)
    
    if email_exists:
        raise HTTPException(
            status_code=400,
            detail="Email này đã được đăng ký."
        )
    
    # 2. Gọi CRUD tạo mới
    try:
        new_user = await user_crud.create_user(db, user=user_in)
        return new_user
    except Exception as e:
        # Log lỗi ra console để debug (sau này dùng logger)
        print(f"Error creating user: {e}") 
        raise HTTPException(
            status_code=500,
            detail="Không thể tạo tài khoản lúc này. Vui lòng thử lại sau."
        )

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), 
    db: AsyncSession = Depends(get_db)
):
    """
    Nhận Email/Pass -> Trả về JWT Token
    """
    # 1. Tìm user trong DB (Lấy full thông tin để có hashed_password)
    user = await user_crud.get_user_by_email(db, email=form_data.username)
    
    # 2. Kiểm tra: User không tồn tại HOẶC Mật khẩu sai
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email hoặc mật khẩu không chính xác",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 3. Nếu đúng hết -> Tạo Access Token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Payload: "sub" thường chứa ID của user (convert sang string)
    access_token = create_access_token(
        data={"sub": str(user.id)}, 
        expires_delta=access_token_expires
    )
    
    # 4. Trả về Token
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
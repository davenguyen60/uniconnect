from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import ValidationError

from app.core.config import settings
from app.core.database import get_db
from app.crud import user as user_crud
from app.models.user import User

# 1. Cấu hình đường dẫn để Swagger UI biết chỗ lấy Token
# Khi bạn bấm nút ổ khóa trên Swagger, nó sẽ gọi vào API này
oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login"
)

# 2. Hàm Dependency: Get Current User (Ông bảo vệ)
async def get_current_user(
    token: str = Depends(oauth2), 
    db: AsyncSession = Depends(get_db)
) -> User:
    
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Không thể xác thực tài khoản (Token không hợp lệ)",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # A. Giải mã Token
        payload = jwt.decode(
            token, 
            settings.SECRET_KEY, 
            algorithms=[settings.ALGORITHM]
        )
        
        # B. Lấy user_id từ payload (lúc tạo token mình lưu vào key 'sub')
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
            
    except (JWTError, ValidationError):
        raise credentials_exception
        
    # C. Kiểm tra User có tồn tại trong DB không?
    # Lưu ý: Cần convert user_id sang int vì trong DB là số, trong Token là chuỗi
    user = await user_crud.get_user_by_id(db, user_id=int(user_id))
    
    if not user:
        raise credentials_exception
        
    return user
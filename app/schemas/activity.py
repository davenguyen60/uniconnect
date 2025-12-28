from pydantic import BaseModel, Field
from typing import Optional, Any
from datetime import datetime

# Base: Dùng chung
class ActivityBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str = "general"
    address: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

# Create: Dữ liệu cần thiết để tạo
class ActivityCreate(ActivityBase):
    latitude: float = Field(..., ge=-90, le=90, description="Vĩ độ")
    longitude: float = Field(..., ge=-180, le=180, description="Kinh độ")

# Response: Dữ liệu trả về cho Client
class ActivityResponse(ActivityBase):
    id: int
    owner_id: int
    created_at: datetime
    is_active: bool
    
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    class Config:
        from_attributes = True
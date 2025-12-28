from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.sql import func
from app.models.activity import Activity
from app.schemas.activity import ActivityCreate

async def create_activity(db: AsyncSession, activity: ActivityCreate, owner_id: int):
    # 1. Chuyển đổi Lat/Lon thành chuỗi WKT (Well-Known Text)
    # Format chuẩn: POINT(longitude latitude) -> Lưu ý thứ tự: Kinh độ trước!
    wkt_point = f'POINT({activity.longitude} {activity.latitude})'
    
    db_activity = Activity(
        title=activity.title,
        description=activity.description,
        categories=activity.categories,
        address=activity.address,
        start_time=activity.start_time,
        end_time=activity.end_time,
        owner_id=owner_id,
        # PostGIS sẽ tự ép kiểu string này sang Geography
        location=wkt_point 
    )
    
    db.add(db_activity)
    try:
        await db.commit()
        await db.refresh(db_activity)
        return db_activity
    except Exception as e:
        await db.rollback()
        raise e

# Hàm lấy danh sách (Tạm thời lấy hết, chưa lọc khoảng cách)
async def get_activities(db: AsyncSession, offset: int = 0, limit: int = 100):
    query = select(Activity).offset(offset).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()
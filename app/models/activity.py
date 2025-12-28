from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func
from geoalchemy2 import Geography 
from sqlalchemy.orm import relationship
from app.core.database import Base

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text)
    address = Column(String, nullable=True)
    category = Column(String, index=True, nullable=False, default="general")
    location = Column(Geography(geometry_type='POINT', srid=4326), nullable=True)

    owner_id = Column(Integer, ForeignKey("users.id"), index=True)
    owner = relationship("User", back_populates="activities")

    start_time = Column(DateTime(timezone=True), default=func.now())
    end_time = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    is_active = Column(Boolean, default=True)
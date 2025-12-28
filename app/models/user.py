from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

# Follow relationship
follows = Table(
    'follows', Base.metadata,
    Column('follower_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('followed_id', Integer, ForeignKey('users.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone_number = Column(String, nullable=True)
    hashed_password = Column(String, nullable=False) 
    
    # Additional fields
    avatar_url = Column(String, nullable=True)
    student_id = Column(String, nullable=True) 
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationshio: Activities (Owner)
    activities = relationship("Activity", back_populates="owner")

    # Relationshio: Follow
    followers = relationship(
        "User",
        secondary=follows,
        primaryjoin=id==follows.c.followed_id,
        secondaryjoin=id==follows.c.follower_id,
        backref="following"
    )
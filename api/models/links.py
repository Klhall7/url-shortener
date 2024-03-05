from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from models.base import Base
from pydantic import BaseModel

class Links (Base):
    __tablename__="links"
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    og_url = Column(String)
    short_url = Column(String)
    user_id = Column(Integer)
    private = Column(Boolean(), default=False)
    #user_id = Column(Integer, ForeignKey('users.id'))
    
class LinkSchema(BaseModel):
    title: str
    og_url: str
    short_url: str
    user_id: int
    private: bool

    class Config:
        populate_by_name = True

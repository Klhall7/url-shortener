from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base
from db_connect import engine
from pydantic import BaseModel



Base = declarative_base()

class Link (Base):
    __tablename__="link"
    
    id = Column(Integer, primary_key=True)
    title = Column(String)
    og_url = Column(String)
    short_url = Column(String)
    private = Column(Boolean(), default=False)
    #user_id = Column(Integer, ForeignKey('users.id'))
    
class LinkCreate(BaseModel):
    title: str
    og_url: str
    short_url: str
    private: bool


Base.metadata.create_all(bind=engine)
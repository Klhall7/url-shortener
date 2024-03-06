from sqlalchemy import Column, Integer, String, UniqueConstraint
from pydantic import BaseModel, Field

from config import settings
from models.base import Base

import bcrypt #entire library
class Users(Base):
    __tablename__= "users"
    
    id= Column(Integer, primary_key=True)
    email = Column(String(255), unique=True)
    hashed_password = Column(String)
    
    UniqueConstraint("email", name="uq_user_email")
    
    def __repr__(self):
        return f"<User {self.email!r}>" 
    #generates a string representation of a User instance for process viewing 
    
    @staticmethod #won't modify the state of any instance variables
    def hash_password(password) -> str: #type annotation is a control for pydantic
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        #hashpw function will take password converted to byte array and random salt as inputs then return them as bytes, then decode will convert the returned bytes into a string again
        
    def validate_password(self, pwd):
        return bcrypt.checkpw(password=pwd.encode(), hashed_password=self.hashed_password.encode())
    #boolean check to verify pwd matches hashed_password
    
class UserBaseSchema(BaseModel):
    email: str
#only want to call user info that isn't protected

class UserSchema(UserBaseSchema):
    id: int
#calls id & email
    class Config: 
        populate_by_name = True
        
class UserAccountSchema(UserBaseSchema):
    hashed_password: str = Field(alias="password")
    

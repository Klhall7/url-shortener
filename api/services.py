from fastapi import HTTPException, status, Query
from models.users import Users, UserAccountSchema

from db_connect import session
from config import settings

def create_user(user: UserAccountSchema):
    db_user = Users(**user.model_dump()) #take user attr in dict format
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user(email: str):
    return session.query(Users).filter(Users.email == email).one() #should get one email back
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session, engine
from models.base import Base
from config import settings
from services import create_user, get_user
from datetime import date, timedelta
from models.links import Links, LinkSchema
from models.users import Users, UserSchema, UserAccountSchema
from models.tokens import Token, TokenData, create_access_token

def create_tables():
    Base.metadata.create_all(bind=engine)
    
def start_application():
    app=FastAPI(title=settings.PROJECT_NAME, 
                version=settings.PROJECT_VERSION)
    
    create_tables()
    return app

app = start_application()

origins = [
    "http://localhost/*",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return{"message": "root route"}

@app.get("/url")
def get_links():
    id = session.query(Links)
    return id.all()

@app.get("/users")
def get_users():
    user= session.query(Users)
    return user.all()

@app.post("/register", response_model=UserSchema)
def register_user(payload: UserAccountSchema):
    payload.hashed_password = Users.hash_password(payload.hashed_password)
    return create_user(user=payload)

@app.post("/login")
async def login(payload: UserAccountSchema):
    try:
        user: Users = get_user(email=payload.email)
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid User Credentials"
        )
        
    is_validated: bool= user.validate_password(payload.hashed_password)
    
    if not is_validated: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail= "Invalid User Credentials"
        )
    access_token_expires = timedelta(minutes=120)
    access_token = create_access_token(
        data={"email": user.email}, expires_delta=access_token_expires
    )   
    return Token(access_token=access_token, token_type="bearer")

@app.post("/url/create")
async def create_link(url_data: LinkSchema):
    url =Links(**url_data.model_dump())
    session.add(url)
    session.commit()
    return {"url added": url.title}



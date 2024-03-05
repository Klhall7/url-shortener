from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session, engine
from models.base import Base
from models.links import Links, LinkSchema
from models.users import Users


app = FastAPI ()

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

@app.post('/create/url')
async def create_link(url_data: LinkSchema):
    url= Links(title=url_data.title, og_url=url_data.og_url, short_url=url_data.short_url, user_id=url_data.user_id, private=url_data.private)
    session.add(url)
    session.commit()
    return {"url added": url.title}

# def create_tables():
#     Base.metadata.create_all(bind=engine)
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from db_connect import session
from models import Link, Base, LinkCreate


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
def get_link():
    id = session.query(Link)
    return id.all()

@app.post('/create/url')
async def create_link(url_data: LinkCreate):
    url= Link(title=url_data.title, og_url=url_data.og_url, short_url=url_data.short_url, private=url_data.private)
    session.add(url)
    session.commit()
    return {"url added": url.title}
    
    
def create_tables():
	Base.metadata.create_all(session)
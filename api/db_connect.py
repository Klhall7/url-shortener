from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from config import settings

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)
print("SQLAlchemy DB URL is: ", engine) #check, not needed

Session = sessionmaker(bind=engine)
session = Session()
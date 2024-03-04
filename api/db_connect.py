from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from config import settings

engine = create_engine(settings.DATABASE_URL)
print("Database URL is ", engine)


Session = sessionmaker(bind=engine)
session = Session()
import os
from dotenv import load_dotenv
from pathlib import Path

env_path = Path('.')/'.env'
load_dotenv(dotenv_path=env_path)

class Settings:
    PROJECT_NAME:str = "URL Shortener App"
    PROJECT_VERSION: str = "1.0.0"

    POSTGRES_USER : str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
    POSTGRES_SERVER : str = os.getenv("POSTGRES_SERVER","localhost") #default localhost
    POSTGRES_PORT : int = os.getenv("POSTGRES_PORT",5432) #default postgres port 
    POSTGRES_DB : str = os.getenv("POSTGRES_DB")
    
    DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
    SECRET_KEY: str = os.getenv("SECRET_KEY")

settings = Settings()
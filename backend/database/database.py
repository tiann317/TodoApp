from sqlalchemy import create_engine
from sqlalchemy.pool import NullPool
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# TODO:
load_dotenv(dotenv_path="/home/tianna/Desktop/TodoApp/backend/.env")
# load_dotenv(dotenv_path="../.env")
import os

DATABASE_URL = (
    f"postgresql+psycopg2://"
    f"{os.getenv('POSTGRES_USER', 'tmp')}:"
    f"{os.getenv('POSTGRES_PASSWORD', 'tmp')}@"
    f"{os.getenv('POSTGRES_HOST', 'pg_sql')}:5432/"
    f"{os.getenv('POSTGRES_DB', 'tmp')}"
)

engine = create_engine(DATABASE_URL, echo=True, poolclass=NullPool)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

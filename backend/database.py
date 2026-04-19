from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = f"postgresql://{os.getenv('DB_USER', 'tianna')}@{
    os.getenv('DB_EXTERNAL_HOST', '0.0.0.0')
}/{os.getenv('DB_NAME', 'TodoAppDB')}"

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

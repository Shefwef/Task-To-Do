# dependencies.py
from .database import SessionLocal
from .auth import get_current_user
from fastapi import Depends

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
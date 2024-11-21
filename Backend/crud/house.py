from sqlalchemy.orm import Session
from database.models import InfoHouse

def get_houses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(InfoHouse).offset(skip).limit(limit).all()
from sqlalchemy.orm import Session
from database.models import InfoHouse

def get_houses(db: Session, skip: int = 0, limit: int = 10):
    return db.query(InfoHouse).offset(skip).limit(limit).all()


def get_house(db: Session, house_id: int):
    return db.query(InfoHouse).filter(InfoHouse.id == house_id).first()
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.session import get_db
from schemas.house import InfoHouse
from crud.house import get_houses

router = APIRouter()

@router.get("/houses", response_model=List[InfoHouse])
def read_houses(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    houses = get_houses(db, skip=skip, limit=limit)
    return houses
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from database.session import get_db
from schemas.house import InfoHouse, neighborhood
from crud.house import get_houses, get_house, get_neighborhoods

router = APIRouter()

group = "/house"

@router.get("/houses", response_model=List[InfoHouse])
def read_houses(
    neighborhood: str = None,
    created_at: str = None,
    company: str = None,
    size: int = None,
    number_rooms: int = None,
    number_bathrooms: int = None,
    number_parking_spaces: int = None,
    min_rent: int = None,
    max_rent: int = None,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    houses = get_houses(
        db,
        skip=skip,
        limit=limit,
        neighborhood=neighborhood,
        created_at=created_at,
        company=company,
        size=size,
        number_rooms=number_rooms,
        number_bathrooms=number_bathrooms,
        number_parking_spaces=number_parking_spaces,
        min_rent=min_rent,
        max_rent=max_rent
    )
    return houses


@router.get(group+"/id/{house_id}", response_model=InfoHouse)
def read_house(house_id: int, db: Session = Depends(get_db)):
    house = get_house(db, house_id=house_id)
    return house


@router.get(group+"/neighborhoods", response_model=List[neighborhood])
def read_neighborhoods(created_at: str = None, db: Session = Depends(get_db)):
    neighborhoods = get_neighborhoods(db, created_at)
    return neighborhoods
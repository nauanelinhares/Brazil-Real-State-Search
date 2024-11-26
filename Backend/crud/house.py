from sqlalchemy.orm import Session
from sqlalchemy import func
from database.models import InfoHouse, UrlHouse

def get_houses(db: Session, skip: int = 0, limit: int = 20, neighborhood: str = None, created_at: str = None, company: str = None):
    query = db.query( InfoHouse.id,
        InfoHouse.rent,
        InfoHouse.tax_hotel,
        InfoHouse.iptu,
        InfoHouse.adress,
        InfoHouse.company,
        InfoHouse.description,
        InfoHouse.size,
        InfoHouse.number_rooms,
        InfoHouse.number_bathrooms,
        InfoHouse.number_parking_spaces,
        InfoHouse.neighborhood,
        InfoHouse.images,
        InfoHouse.created_at,
        InfoHouse.updated_at,
        UrlHouse.url).outerjoin(UrlHouse, InfoHouse.id == UrlHouse.id)
    
    if neighborhood:
        query = query.filter(InfoHouse.neighborhood == neighborhood)
    
    if created_at:
        query = query.filter(InfoHouse.created_at >= created_at)
    
    if company:
        query = query.filter(InfoHouse.company == company)
    
    return query.order_by(InfoHouse.rent).offset(skip).limit(limit).all()


def get_house(db: Session, house_id: int):
    return db.query(
        InfoHouse.id,
        InfoHouse.rent,
        InfoHouse.tax_hotel,
        InfoHouse.iptu,
        InfoHouse.adress,
        InfoHouse.company,
        InfoHouse.description,
        InfoHouse.size,
        InfoHouse.number_rooms,
        InfoHouse.number_bathrooms,
        InfoHouse.number_parking_spaces,
        InfoHouse.neighborhood,
        InfoHouse.images,
        InfoHouse.created_at,
        InfoHouse.updated_at,
        UrlHouse.url
    ).outerjoin(UrlHouse, InfoHouse.id == UrlHouse.id).filter(InfoHouse.id == house_id).first()
    
def get_neighborhoods(db: Session, created_at: str = None):
    query = db.query(
        InfoHouse.neighborhood,
        func.count(InfoHouse.id).label('count')
    ).group_by(InfoHouse.neighborhood)

    print(created_at)
    if created_at:
        
        query = query.filter(InfoHouse.created_at >= created_at)
    
    return query.all()
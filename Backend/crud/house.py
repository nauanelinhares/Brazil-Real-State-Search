from sqlalchemy.orm import Session
from database.models import InfoHouse, UrlHouse

def get_houses(db: Session, skip: int = 0, limit: int = 10, neighborhood: str = None):
        query = db.query(InfoHouse).outerjoin(UrlHouse, InfoHouse.id == UrlHouse.id)
        
        if neighborhood:
            query = query.filter(InfoHouse.neighborhood == neighborhood)
        
        return query.offset(skip).limit(limit).all()


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
    
def get_neighborhoods(db: Session):
    return db.query(InfoHouse.neighborhood).distinct().all()
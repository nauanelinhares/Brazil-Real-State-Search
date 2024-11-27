from sqlalchemy.orm import Session
from sqlalchemy import func
from database.models import InfoHouse, UrlHouse

def get_houses(db: Session, skip: int = 0,
               limit: int = 20,
               neighborhood: str = None,
               created_at: str = None,
               company: str = None,
               size: int = None,
               number_rooms: int = None,
               number_bathrooms: int = None,
               number_parking_spaces: int = None,
               min_rent: int = None,
               max_rent: int = None):
    filters = []
    
    if neighborhood:
        filters.append(InfoHouse.neighborhood == neighborhood)
    
    if created_at:
        filters.append(InfoHouse.created_at >= created_at)
    
    if company:
        filters.append(InfoHouse.company == company)
    
    if number_rooms:
        filters.append(InfoHouse.number_rooms == number_rooms)
    
    if number_bathrooms:
        filters.append(InfoHouse.number_bathrooms == number_bathrooms)
    
    if number_parking_spaces:
        filters.append(InfoHouse.number_parking_spaces == number_parking_spaces)
    
    if size:
        filters.append(InfoHouse.size >= size)
        
    if min_rent:
        filters.append(InfoHouse.rent >= min_rent)
    
    if max_rent:
        filters.append(InfoHouse.rent <= max_rent)
    
    query = db.query(
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
    ).outerjoin(UrlHouse, InfoHouse.id == UrlHouse.id).filter(*filters)
    
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
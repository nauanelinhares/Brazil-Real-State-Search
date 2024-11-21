from sqlalchemy import ARRAY, Column, Integer, String, DateTime
from datetime import datetime
from database.session import Base

class InfoHouse(Base):
    __tablename__ = "info_houses"

    id = Column(Integer, primary_key=True, index=True)
    rent = Column(Integer)
    tax_hotel = Column(Integer, nullable=True)
    iptu = Column(Integer, nullable=True)
    adress = Column(String, nullable=True)
    company = Column(String, nullable=True)
    description = Column(String, nullable=True)
    size = Column(Integer, nullable=True)
    number_rooms = Column(Integer, nullable=True)
    number_bathrooms = Column(Integer, nullable=True)
    number_parking_spaces = Column(Integer, nullable=True)
    neighborhood = Column(String, nullable=True)
    images = Column(ARRAY(String), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
    
    

class UrlHouse(Base):
    __tablename__ = "url_houses"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)
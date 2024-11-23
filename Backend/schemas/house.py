from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class InfoHouse(BaseModel):
    id: int
    rent: int
    tax_hotel: int
    iptu: int
    adress: str
    neighborhood: Optional[str] = None
    company: Optional[str] = None
    size: Optional[int] = None
    number_rooms: Optional[int] = None
    number_bathrooms: Optional[int] = None
    number_parking_spaces: Optional[int] = None
    images: Optional[List[str]] = None
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    url: Optional[str] = None

    class Config:
        orm_mode = True
        

class UrlHouse(BaseModel):
    id: int
    url: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
        
        
class neighborhood(BaseModel):
    neighborhood: str

    class Config:
        orm_mode = True
from sqlalchemy import Column, Integer, String, Float, Boolean
from Backend.database import Base

class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    brand = Column(String(100))
    price = Column(Float)
    fuel_type = Column(String(50))
    available = Column(Boolean)
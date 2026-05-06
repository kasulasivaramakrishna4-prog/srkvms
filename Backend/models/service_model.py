from sqlalchemy import Column, Integer, String, Date, Float
from database import Base

class ServiceModel(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100))
    phone = Column(String(20))
    vehicle_id = Column(Integer)
    service_type = Column(String(100))
    service_date = Column(Date)
    delivery_date = Column(Date)
    bill_amount = Column(Float)
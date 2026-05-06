from sqlalchemy import Column, Integer, String
from database import Base

class EnquiryModel(Base):
    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100))
    phone = Column(String(20))
    vehicle_id = Column(Integer)
    message = Column(String(255))
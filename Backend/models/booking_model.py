from sqlalchemy import Column,Integer,String,Date
from database import Base

class BookingModel(Base):
    __tablename__="bookings"

    id=Column(Integer,primary_key=True,index=True)
    customer_name=Column(String(100))
    phone=Column(String(20))
    vehicle_id=Column(Integer)
    booking_date=Column(Date)

from pydantic import BaseModel
from datetime import date


class Booking(BaseModel):
    customer_name:str
    phone:str
    vehicle_id: int
    booking_date:date


class BookingResponse(Booking):
    id: int

    class Config:
        from_attributes = True

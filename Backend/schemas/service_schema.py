from datetime import date

from pydantic import BaseModel


class Service(BaseModel):
    customer_name: str
    phone: str
    vehicle_id: int
    service_type: str
    service_date: date
    delivery_date: date
    bill_amount: float


class ServiceResponse(Service):
    id: int

    class Config:
        from_attributes = True

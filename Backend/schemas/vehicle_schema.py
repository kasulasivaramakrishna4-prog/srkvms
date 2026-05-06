from pydantic import BaseModel
#Model -structure of the data
class Vehicle(BaseModel):
    name: str
    brand:str
    price:float
    fuel_type:str
    available:bool


class VehicleResponse(Vehicle):
    id: int

    class Config:
        from_attributes = True

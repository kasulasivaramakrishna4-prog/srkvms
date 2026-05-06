from pydantic import BaseModel

class Enquiry(BaseModel):
    customer_name:str
    phone:str
    vehicle_id:int
    message:str


class EnquiryResponse(Enquiry):
    id: int

    class Config:
        from_attributes = True

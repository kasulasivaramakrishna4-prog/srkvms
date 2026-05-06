from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from typing import List

from database import Base, engine

from schemas.vehicle_schema import Vehicle, VehicleResponse
from schemas.enquiry_schema import Enquiry, EnquiryResponse
from schemas.booking_schema import Booking, BookingResponse
from schemas.service_schema import Service, ServiceResponse

from services import vehicle_service
from services import enquiry_service
from services import booking_service
from services import dashboard_service
from services import service_service

from models.vehicle_model import VehicleModel
from models.enquiry_model import EnquiryModel
from models.booking_model import BookingModel
from models.service_model import ServiceModel

Base.metadata.create_all(bind=engine)

inspector = inspect(engine)
booking_columns = [column["name"] for column in inspector.get_columns("bookings")]
if "booking_date" not in booking_columns:
    with engine.begin() as connection:
        connection.execute(text("ALTER TABLE bookings ADD COLUMN booking_date DATE"))

with engine.begin() as connection:
    connection.execute(text("ALTER TABLE bookings MODIFY COLUMN phone VARCHAR(20)"))
    connection.execute(text("ALTER TABLE bookings MODIFY COLUMN vehicle_id INT"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Vehicle Showroom Backend Running"}


@app.get("/dashboard")
def get_dashboard():
    return dashboard_service.get_dashboard_stats()


@app.post("/vehicles", response_model=VehicleResponse)
def create_vehicle(vehicle: Vehicle):
    return vehicle_service.create_vehicle(
        vehicle.name,
        vehicle.brand,
        vehicle.price,
        vehicle.fuel_type,
        vehicle.available
    )


@app.get("/vehicles", response_model=List[VehicleResponse])
def get_vehicles():
    return vehicle_service.get_vehicles()


@app.put("/vehicles/{vehicle_id}")
def update_vehicle(vehicle_id: int, vehicle: Vehicle):
    return vehicle_service.update_vehicle(vehicle_id, vehicle.dict())


@app.delete("/vehicles/{vehicle_id}")
def delete_vehicle(vehicle_id: int):
    return vehicle_service.delete_vehicle(vehicle_id)


@app.post("/enquiries", response_model=EnquiryResponse)
def create_enquiry(enquiry: Enquiry):
    return enquiry_service.create_enquiry(
        enquiry.customer_name,
        enquiry.phone,
        enquiry.vehicle_id,
        enquiry.message
    )


@app.get("/enquiries", response_model=List[EnquiryResponse])
def get_enquiries():
    return enquiry_service.get_enquiries()


@app.post("/bookings", response_model=BookingResponse)
def create_booking(booking: Booking):
    return booking_service.create_booking(
        booking.customer_name,
        booking.phone,
        booking.vehicle_id,
        booking.booking_date
    )


@app.get("/bookings", response_model=List[BookingResponse])
def get_bookings():
    return booking_service.get_bookings()


@app.post("/services", response_model=ServiceResponse)
def create_service(service: Service):
    return service_service.create_service(
        service.customer_name,
        service.phone,
        service.vehicle_id,
        service.service_type,
        service.service_date,
        service.delivery_date,
        service.bill_amount
    )


@app.get("/services", response_model=List[ServiceResponse])
def get_services():
    return service_service.get_services()

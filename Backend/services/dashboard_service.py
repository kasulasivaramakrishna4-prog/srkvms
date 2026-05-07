from database import SessionLocal
from models.vehicle_model import VehicleModel
from models.enquiry_model import EnquiryModel
from models.booking_model import BookingModel
from models.service_model import ServiceModel


def get_dashboard_stats():
    db = SessionLocal()

    total_vehicles = db.query(VehicleModel).count()

    available_vehicles = db.query(VehicleModel).filter(
        VehicleModel.available == True
    ).count()

    total_enquiries = db.query(EnquiryModel).count()
    total_bookings = db.query(BookingModel).count()
    total_services = db.query(ServiceModel).count()

    service_records = db.query(ServiceModel).all()
    total_bill_amount = 0

    for service in service_records:
        total_bill_amount += service.bill_amount or 0

    db.close()

    return {
        "total_vehicles": total_vehicles,
        "available_vehicles": available_vehicles,
        "total_enquiries": total_enquiries,
        "total_bookings": total_bookings,
        "total_services": total_services,
        "total_bill_amount": total_bill_amount
    }

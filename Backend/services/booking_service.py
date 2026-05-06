from database import SessionLocal
from models.booking_model import BookingModel


def create_booking(customer_name, phone, vehicle_id, booking_date):
    db = SessionLocal()

    new_booking = BookingModel(
        customer_name=customer_name,
        phone=phone,
        vehicle_id=vehicle_id,
        booking_date=booking_date
    )

    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    db.close()

    return new_booking


def get_bookings():
    db = SessionLocal()
    bookings = db.query(BookingModel).all()
    db.close()
    return bookings
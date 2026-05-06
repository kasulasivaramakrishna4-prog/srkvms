from database import SessionLocal
from models.enquiry_model import EnquiryModel


def create_enquiry(customer_name, phone, vehicle_id, message):
    db = SessionLocal()

    new_enquiry = EnquiryModel(
        customer_name=customer_name,
        phone=phone,
        vehicle_id=vehicle_id,
        message=message
    )

    db.add(new_enquiry)
    db.commit()
    db.refresh(new_enquiry)
    db.close()

    return new_enquiry


def get_enquiries():
    db = SessionLocal()
    enquiries = db.query(EnquiryModel).all()
    db.close()
    return enquiries
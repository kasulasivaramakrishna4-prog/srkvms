from database import SessionLocal
from models.service_model import ServiceModel


def create_service(customer_name, phone, vehicle_id, service_type, service_date, delivery_date, bill_amount):
    db = SessionLocal()

    new_service = ServiceModel(
        customer_name=customer_name,
        phone=phone,
        vehicle_id=vehicle_id,
        service_type=service_type,
        service_date=service_date,
        delivery_date=delivery_date,
        bill_amount=bill_amount
    )

    db.add(new_service)
    db.commit()
    db.refresh(new_service)
    db.close()

    return new_service


def get_services():
    db = SessionLocal()
    services = db.query(ServiceModel).all()
    db.close()
    return services
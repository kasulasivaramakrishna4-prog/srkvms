from Backend.database import SessionLocal
from models.vehicle_model import VehicleModel


def create_vehicle(name, brand, price, fuel_type, available):
    db = SessionLocal()

    new_vehicle = VehicleModel(
        name=name,
        brand=brand,
        price=price,
        fuel_type=fuel_type,
        available=available
    )

    db.add(new_vehicle)
    db.commit()
    db.refresh(new_vehicle)
    db.close()

    return new_vehicle


def get_vehicles():
    db = SessionLocal()
    vehicles = db.query(VehicleModel).all()
    db.close()
    return vehicles


def update_vehicle(vehicle_id, updated_data):
    db = SessionLocal()

    vehicle = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()

    if vehicle is None:
        db.close()
        return {"error": "Vehicle not found"}

    vehicle.name = updated_data["name"]
    vehicle.brand = updated_data["brand"]
    vehicle.price = updated_data["price"]
    vehicle.fuel_type = updated_data["fuel_type"]
    vehicle.available = updated_data["available"]

    db.commit()
    db.refresh(vehicle)
    db.close()

    return vehicle


def delete_vehicle(vehicle_id):
    db = SessionLocal()

    vehicle = db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()

    if vehicle is None:
        db.close()
        return {"error": "Vehicle not found"}

    db.delete(vehicle)
    db.commit()
    db.close()

    return {"message": "Vehicle deleted"}
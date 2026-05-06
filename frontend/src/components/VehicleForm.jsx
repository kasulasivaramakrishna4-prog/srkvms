import { useState } from "react";
import { addVehicle } from "../services/api";

function VehicleForm({ refresh }) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    fuel_type: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addVehicle({
      ...formData,
      price: Number(formData.price),
    }).then(() => {
      refresh();
      setFormData({
        name: "",
        brand: "",
        price: "",
        fuel_type: "",
        available: true,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Vehicle</h2>

      <input
        name="name"
        placeholder="Vehicle Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="fuel_type"
        placeholder="Fuel Type"
        value={formData.fuel_type}
        onChange={handleChange}
      />

      <label>
        Available
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Vehicle</button>
    </form>
  );
}

export default VehicleForm;
import { useState } from "react";
import { addService } from "../services/api";

function ServiceForm({ refresh }) {
  const [service, setService] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    service_type: "",
    service_date: "",
    delivery_date: "",
    bill_amount: "",
  });

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addService({
      ...service,
      vehicle_id: Number(service.vehicle_id),
      bill_amount: Number(service.bill_amount),
    }).then(() => {
      alert("Service record added successfully");
      refresh();

      setService({
        customer_name: "",
        phone: "",
        vehicle_id: "",
        service_type: "",
        service_date: "",
        delivery_date: "",
        bill_amount: "",
      });
    });
  };

  return (
    <div>
      <h2>Vehicle Service</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={service.customer_name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={service.phone}
          onChange={handleChange}
        />

        <input
          name="vehicle_id"
          placeholder="Vehicle ID"
          value={service.vehicle_id}
          onChange={handleChange}
        />

        <input
          name="service_type"
          placeholder="Service Type"
          value={service.service_type}
          onChange={handleChange}
        />

        <div>
          <label>Service Date</label>
          <input
            type="date"
            name="service_date"
            value={service.service_date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Delivery Date</label>
          <input
            type="date"
            name="delivery_date"
            value={service.delivery_date}
            onChange={handleChange}
          />
        </div>

        <input
          name="bill_amount"
          placeholder="Bill Amount"
          value={service.bill_amount}
          onChange={handleChange}
        />

        <button type="submit">Add Service</button>
      </form>
    </div>
  );
}

export default ServiceForm;

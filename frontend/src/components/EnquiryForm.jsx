import { useState } from "react";
import { addEnquiry } from "../services/api";

function EnquiryForm() {
  const [enquiry, setEnquiry] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    message: "",
  });

  const handleChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addEnquiry({
      ...enquiry,
      vehicle_id: Number(enquiry.vehicle_id),
    }).then(() => {
      alert("Enquiry submitted successfully");

      setEnquiry({
        customer_name: "",
        phone: "",
        vehicle_id: "",
        message: "",
      });
    });
  };

  return (
    <div>
      <h2>Customer Enquiry</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={enquiry.customer_name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={enquiry.phone}
          onChange={handleChange}
        />

        <input
          name="vehicle_id"
          placeholder="Vehicle ID"
          value={enquiry.vehicle_id}
          onChange={handleChange}
        />

        <input
          name="message"
          placeholder="Message"
          value={enquiry.message}
          onChange={handleChange}
        />

        <button type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}

export default EnquiryForm;
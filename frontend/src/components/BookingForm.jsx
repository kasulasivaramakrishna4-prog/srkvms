import { useState } from "react";
import { addBooking } from "../services/api";

function BookingForm() {
  const [booking, setBooking] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    booking_date: "",
  });

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBooking({
      ...booking,
      vehicle_id: Number(booking.vehicle_id),
    }).then(() => {
      alert("Booking successful");

      setBooking({
        customer_name: "",
        phone: "",
        vehicle_id: "",
        booking_date: "",
      });
    });
  };

  return (
    <div>
      <h2>Test Drive Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="customer_name"
          placeholder="Customer Name"
          value={booking.customer_name}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={booking.phone}
          onChange={handleChange}
        />

        <input
          name="vehicle_id"
          placeholder="Vehicle ID"
          value={booking.vehicle_id}
          onChange={handleChange}
        />

        <input
          type="date"
          name="booking_date"
          value={booking.booking_date}
          onChange={handleChange}
        />

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default BookingForm;
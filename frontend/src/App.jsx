import { useEffect, useState } from "react";
import {
  addVehicle,
  addEnquiry,
  addBooking,
  addService,
  getBookings,
  getEnquiries,
  getServices,
  getVehicles,
} from "./services/api";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [vehicles, setVehicles] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [vehicleForm, setVehicleForm] = useState({
    name: "",
    brand: "",
    price: "",
    fuel_type: "",
    available: true,
  });

  const [enquiryForm, setEnquiryForm] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    message: "",
  });

  const [bookingForm, setBookingForm] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    booking_date: "",
  });

  const [serviceForm, setServiceForm] = useState({
    customer_name: "",
    phone: "",
    vehicle_id: "",
    service_type: "",
    service_date: "",
    delivery_date: "",
    bill_amount: "",
  });

  const fetchVehicles = async () => {
    const data = await getVehicles();
    setVehicles(data);
  };

  const fetchEnquiries = async () => {
    const data = await getEnquiries();
    setEnquiries(data);
  };

  const fetchBookings = async () => {
    const data = await getBookings();
    setBookings(data);
  };

  const fetchServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  useEffect(() => {
    Promise.all([
      getVehicles(),
      getEnquiries(),
      getBookings(),
      getServices(),
    ]).then(([vehiclesData, enquiriesData, bookingsData, servicesData]) => {
      setVehicles(vehiclesData);
      setEnquiries(enquiriesData);
      setBookings(bookingsData);
      setServices(servicesData);
    });
  }, []);

  const handleVehicleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setVehicleForm({
      ...vehicleForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;

    setEnquiryForm({
      ...enquiryForm,
      [name]: value,
    });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;

    setBookingForm({
      ...bookingForm,
      [name]: value,
    });
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;

    setServiceForm({
      ...serviceForm,
      [name]: value,
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    await addVehicle({
      name: vehicleForm.name,
      brand: vehicleForm.brand,
      price: Number(vehicleForm.price),
      fuel_type: vehicleForm.fuel_type,
      available: vehicleForm.available,
    });

    await fetchVehicles();

    setVehicleForm({
      name: "",
      brand: "",
      price: "",
      fuel_type: "",
      available: true,
    });
  };

  const handleAddEnquiry = async (e) => {
    e.preventDefault();

    await addEnquiry({
      ...enquiryForm,
      vehicle_id: Number(enquiryForm.vehicle_id),
    });

    await fetchEnquiries();

    setEnquiryForm({
      customer_name: "",
      phone: "",
      vehicle_id: "",
      message: "",
    });
  };

  const handleAddBooking = async (e) => {
    e.preventDefault();

    await addBooking({
      ...bookingForm,
      vehicle_id: Number(bookingForm.vehicle_id),
    });

    await fetchBookings();

    setBookingForm({
      customer_name: "",
      phone: "",
      vehicle_id: "",
      booking_date: "",
    });
  };

  const handleAddService = async (e) => {
    e.preventDefault();

    await addService({
      ...serviceForm,
      vehicle_id: Number(serviceForm.vehicle_id),
      bill_amount: Number(serviceForm.bill_amount),
    });

    await fetchServices();

    setServiceForm({
      customer_name: "",
      phone: "",
      vehicle_id: "",
      service_type: "",
      service_date: "",
      delivery_date: "",
      bill_amount: "",
    });
  };

  return (
    <div className="app">
      <h1>Vehicle Showroom Management</h1>

      <div className="nav-buttons">
        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>

        <button
          onClick={() => {
            setActivePage("vehicles");
            fetchVehicles();
          }}
        >
          Vehicles
        </button>

        <button
          onClick={() => {
            setActivePage("enquiries");
            fetchEnquiries();
          }}
        >
          Enquiries
        </button>

        <button
          onClick={() => {
            setActivePage("bookings");
            fetchBookings();
          }}
        >
          Bookings
        </button>

        <button
          onClick={() => {
            setActivePage("services");
            fetchServices();
          }}
        >
          Services
        </button>
      </div>

      {activePage === "dashboard" && (
        <div className="details-box">
          <h2>Dashboard</h2>
          <div className="dashboard-grid">
            <div
              className="dashboard-card blue clickable"
              onClick={() => {
                setActivePage("vehicles");
                fetchVehicles();
              }}
            >
              <h3>Total Vehicles</h3>
              <p>{vehicles.length}</p>
            </div>
            <div
              className="dashboard-card orange clickable"
              onClick={() => {
                setActivePage("enquiries");
                fetchEnquiries();
              }}
            >
              <h3>Total Enquiries</h3>
              <p>{enquiries.length}</p>
            </div>
            <div
              className="dashboard-card purple clickable"
              onClick={() => {
                setActivePage("bookings");
                fetchBookings();
              }}
            >
              <h3>Total Bookings</h3>
              <p>{bookings.length}</p>
            </div>
            <div
              className="dashboard-card teal clickable"
              onClick={() => {
                setActivePage("services");
                fetchServices();
              }}
            >
              <h3>Total Services</h3>
              <p>{services.length}</p>
            </div>
          </div>
        </div>
      )}

      {activePage === "vehicles" && (
        <div>
          <h2>Vehicles</h2>

          <form onSubmit={handleAddVehicle}>
            <input
              type="text"
              name="name"
              placeholder="Vehicle Name"
              value={vehicleForm.name}
              onChange={handleVehicleChange}
              required
            />

            <input
              type="text"
              name="brand"
              placeholder="Brand"
              value={vehicleForm.brand}
              onChange={handleVehicleChange}
              required
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={vehicleForm.price}
              onChange={handleVehicleChange}
              required
            />

            <input
              type="text"
              name="fuel_type"
              placeholder="Fuel Type"
              value={vehicleForm.fuel_type}
              onChange={handleVehicleChange}
              required
            />

            <label>
              Available
              <input
                type="checkbox"
                name="available"
                checked={vehicleForm.available}
                onChange={handleVehicleChange}
              />
            </label>

            <button type="submit">Add Vehicle</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Fuel Type</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <tr key={vehicle.id}>
                  <td>{index + 1}</td>
                  <td>{vehicle.name}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.price}</td>
                  <td>{vehicle.fuel_type}</td>
                  <td>{vehicle.available ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activePage === "enquiries" && (
        <div>
          <button className="close-btn" onClick={() => setActivePage("dashboard")}>
            Close
          </button>
          <h2>Enquiries</h2>

          <form onSubmit={handleAddEnquiry}>
            <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={enquiryForm.customer_name}
              onChange={handleEnquiryChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={enquiryForm.phone}
              onChange={handleEnquiryChange}
              required
            />
            <input
              type="number"
              name="vehicle_id"
              placeholder="Vehicle ID"
              value={enquiryForm.vehicle_id}
              onChange={handleEnquiryChange}
              required
            />
            <input
              type="text"
              name="message"
              placeholder="Message"
              value={enquiryForm.message}
              onChange={handleEnquiryChange}
              required
            />
            <button type="submit">Add Enquiry</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Vehicle ID</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry, index) => (
                <tr key={enquiry.id}>
                  <td>{index + 1}</td>
                  <td>{enquiry.customer_name}</td>
                  <td>{enquiry.phone}</td>
                  <td>{enquiry.vehicle_id}</td>
                  <td>{enquiry.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activePage === "bookings" && (
        <div>
          <button className="close-btn" onClick={() => setActivePage("dashboard")}>
            Close
          </button>
          <h2>Bookings</h2>

          <form onSubmit={handleAddBooking}>
            <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={bookingForm.customer_name}
              onChange={handleBookingChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={bookingForm.phone}
              onChange={handleBookingChange}
              required
            />
            <input
              type="number"
              name="vehicle_id"
              placeholder="Vehicle ID"
              value={bookingForm.vehicle_id}
              onChange={handleBookingChange}
              required
            />
            <input
              type="date"
              name="booking_date"
              value={bookingForm.booking_date}
              onChange={handleBookingChange}
              required
            />
            <button type="submit">Add Booking</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Vehicle ID</th>
                <th>Booking Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td>{index + 1}</td>
                  <td>{booking.customer_name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.vehicle_id}</td>
                  <td>{booking.booking_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activePage === "services" && (
        <div>
          <button className="close-btn" onClick={() => setActivePage("dashboard")}>
            Close
          </button>
          <h2>Services</h2>

          <form onSubmit={handleAddService}>
            <input
              type="text"
              name="customer_name"
              placeholder="Customer Name"
              value={serviceForm.customer_name}
              onChange={handleServiceChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={serviceForm.phone}
              onChange={handleServiceChange}
              required
            />
            <input
              type="number"
              name="vehicle_id"
              placeholder="Vehicle ID"
              value={serviceForm.vehicle_id}
              onChange={handleServiceChange}
              required
            />
            <input
              type="text"
              name="service_type"
              placeholder="Service Type"
              value={serviceForm.service_type}
              onChange={handleServiceChange}
              required
            />
            <input
              type="date"
              name="service_date"
              value={serviceForm.service_date}
              onChange={handleServiceChange}
              required
            />
            <input
              type="date"
              name="delivery_date"
              value={serviceForm.delivery_date}
              onChange={handleServiceChange}
              required
            />
            <input
              type="number"
              name="bill_amount"
              placeholder="Bill Amount"
              value={serviceForm.bill_amount}
              onChange={handleServiceChange}
              required
            />
            <button type="submit">Add Service</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Vehicle ID</th>
                <th>Service Type</th>
                <th>Service Date</th>
                <th>Delivery Date</th>
                <th>Bill Amount</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id}>
                  <td>{index + 1}</td>
                  <td>{service.customer_name}</td>
                  <td>{service.phone}</td>
                  <td>{service.vehicle_id}</td>
                  <td>{service.service_type}</td>
                  <td>{service.service_date}</td>
                  <td>{service.delivery_date}</td>
                  <td>{service.bill_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;

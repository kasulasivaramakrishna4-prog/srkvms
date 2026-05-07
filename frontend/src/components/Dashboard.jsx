import { useEffect, useState } from "react";
import {
  getDashboard,
  getEnquiries,
  getBookings,
  getServices,
} from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_vehicles: 0,
    available_vehicles: 0,
    total_enquiries: 0,
    total_bookings: 0,
    total_services: 0,
    total_bill_amount: 0,
  });

  const [, setEnquiries] = useState([]);
  const [, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [showSection, setShowSection] = useState("");

  useEffect(() => {
    getDashboard().then((data) => setStats(data));
  }, []);

  const handleShowEnquiries = () => {
    getEnquiries().then((data) => {
      setEnquiries(data);
      setShowSection("enquiries");
    });
  };

  const handleShowBookings = () => {
    getBookings().then((data) => {
      setBookings(data);
      setShowSection("bookings");
    });
  };

  const handleShowServices = () => {
    getServices().then((data) => {
      setServices(data);
      setShowSection("services");
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card blue">
          <h3>Total Vehicles</h3>
          <p>{stats.total_vehicles}</p>
        </div>

        <div className="dashboard-card green">
          <h3>Available Vehicles</h3>
          <p>{stats.available_vehicles}</p>
        </div>

        <div className="dashboard-card orange clickable" onClick={handleShowEnquiries}>
          <h3>Total Enquiries</h3>
          <p>{stats.total_enquiries}</p>
        </div>

        <div className="dashboard-card purple clickable" onClick={handleShowBookings}>
          <h3>Total Bookings</h3>
          <p>{stats.total_bookings}</p>
        </div>

        <div className="dashboard-card red clickable" onClick={handleShowServices}>
          <h3>Total Services</h3>
          <p>{stats.total_services}</p>
        </div>

        <div className="dashboard-card teal">
          <h3>Total Bill Amount</h3>
          <p>₹{stats.total_bill_amount}</p>
        </div>
      </div>

      {showSection === "services" && (
        <div className="details-box">
          <div className="details-header">
            <h2>Service Records</h2>
            <button className="close-btn" onClick={() => setShowSection("")}>
              Close
            </button>
          </div>

          {services.length === 0 ? (
            <p>No services found</p>
          ) : (
            services.map((s) => (
              <div className="details-card" key={s.id}>
                <p><b>Name:</b> {s.customer_name}</p>
                <p><b>Phone:</b> {s.phone}</p>
                <p><b>Vehicle ID:</b> {s.vehicle_id}</p>
                <p><b>Service Type:</b> {s.service_type}</p>
                <p><b>Service Date:</b> {s.service_date}</p>
                <p><b>Delivery Date:</b> {s.delivery_date}</p>
                <p><b>Bill:</b> ₹{s.bill_amount}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;

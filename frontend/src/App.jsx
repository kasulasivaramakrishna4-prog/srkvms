import { useEffect, useState } from "react";
import { getVehicles, getServices } from "./services/api";
import "./App.css";
import BookingForm from "./components/BookingForm";
import Dashboard from "./components/Dashboard";
import EnquiryForm from "./components/EnquiryForm";
import VehicleForm from "./components/VehicleForm";
import VehicleList from "./components/VehicleList";
import ServiceForm from "./components/ServiceForm";
import ServiceList from "./components/ServiceList";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const fetchVehicles = () => {
    getVehicles().then((data) => setVehicles(data));
  };

  const fetchServices = () => {
    getServices().then((data) => setServices(data));
  };

  useEffect(() => {
    fetchVehicles();
    fetchServices();
  }, []);

  return (
    <div>
      <h1>Vehicle Showroom</h1>

      <Dashboard />

      <EnquiryForm />

      <BookingForm />
      
      <ServiceForm refresh={fetchServices} />
      

      <VehicleForm refresh={fetchVehicles} />
      <VehicleList vehicles={vehicles} refresh={fetchVehicles} />
    </div>
  );
}

export default App;

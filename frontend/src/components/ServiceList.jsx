function ServiceList({ services }) {
  return (
    <div>
      <h2>Service Records</h2>

      {services.length === 0 ? (
        <p>No service records found</p>
      ) : (
        services.map((s) => (
          <div className="details-card" key={s.id}>
            <p><b>Name:</b> {s.customer_name}</p>
            <p><b>Phone:</b> {s.phone}</p>
            <p><b>Vehicle ID:</b> {s.vehicle_id}</p>
            <p><b>Service Type:</b> {s.service_type}</p>
            <p><b>Service Date:</b> {s.service_date}</p>
            <p><b>Delivery Date:</b> {s.delivery_date}</p>
            <p><b>Bill:</b> Rs. {s.bill_amount}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default ServiceList;

import { deleteVehicle, updateVehicle } from "../services/api";
import { useState } from "react";

function VehicleList({ vehicles, refresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = (id) => {
    deleteVehicle(id).then(() => refresh());
  };

  const startEdit = (v) => {
    setEditingId(v.id);
    setEditData(v);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleUpdate = (id) => {
    updateVehicle(id, editData).then(() => {
      setEditingId(null);
      refresh();
    });
  };

  return (
    <div>
      <h2>Vehicle List</h2>

      {vehicles.map((v) => (
        <div className="vehicle-card" key={v.id}>
          {editingId === v.id ? (
            <>
              <input name="name" value={editData.name} onChange={handleChange} />
              <input name="brand" value={editData.brand} onChange={handleChange} />
              <input name="price" value={editData.price} onChange={handleChange} />
              <input name="fuel_type" value={editData.fuel_type} onChange={handleChange} />

              <button onClick={() => handleUpdate(v.id)}>Save</button>
            </>
          ) : (
            <>
              <h3>{v.name}</h3>
              <p>Brand: {v.brand}</p>
              <p>Price: {v.price}</p>
              <p>Fuel: {v.fuel_type}</p>
              <p>Available: {v.available ? "Yes" : "No"}</p>

              <button className="edit-btn" onClick={() => startEdit(v)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(v.id)}>Delete</button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default VehicleList;

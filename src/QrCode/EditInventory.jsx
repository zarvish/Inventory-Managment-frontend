import React, { useState } from "react";
import api from "../instance/api"; // Import the api.js file
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const EditInventory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location?.state?.data;

  console.log("state: ", data);
  const [selectedName, setSelectedName] = useState(data.name);
  const [date, setDate] = useState(data.date.received_date.split("T")[0]);
  const [quantity, setQuantity] = useState(data.quantity.received_quantity);
  const [error, setError] = useState("");

  const handleEditInventory = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.put(`/api/update-inventory/${data._id}`, {
        name: selectedName,
        received_date: date,
        received_quantity: quantity,
      });
      navigate("/");
      // Optionally, you can redirect the user or perform other actions upon successful QR generation
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to Update");
      }
    }
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  return (
    <div className="generate-qr-container">
      <h2>Edit</h2>
      <p>Fill in the details for update the item</p>
      <form onSubmit={handleEditInventory}>
        <div className="input-container">
          <select
            required
            id="name"
            value={selectedName}
            onChange={handleNameChange}
          >
            <option value="">Select name</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
            <option value="C3">C3</option>
            <option value="C4">C4</option>
            <option value="C5">C5</option>
          </select>
        </div>
        <div className="input-container">
          <input
            required
            type="date"
            id="date"
            placeholder="Select date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            required
            type="number"
            id="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button className="custom-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditInventory;

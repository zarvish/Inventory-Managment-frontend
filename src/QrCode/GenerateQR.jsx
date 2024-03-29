import React, { useState } from "react";
import api from "../instance/api"; // Import the api.js file
import "./style.scss";
import { useNavigate } from "react-router-dom";
const GenerateQR = () => {
  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleGenerateQR = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/api/create-inventory", {
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
        setError("Failed to generate QR. Please try again.");
      }
    }
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  return (
    <div className="generate-qr-container">
      <h2>Generate QR Code</h2>
      <p>Fill in the details to generate a QR code</p>
      <form onSubmit={handleGenerateQR}>
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
          Generate QR
        </button>
      </form>
    </div>
  );
};

export default GenerateQR;

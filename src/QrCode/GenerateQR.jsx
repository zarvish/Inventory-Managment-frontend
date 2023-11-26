import React from "react";
import "./style.scss";
const GenerateQR = () => {
  return (
    <div className="generate-qr-container">
      <h2>Generate QR Code</h2>
      <p>Fill in the details to generate a QR code</p>
      <form>
        <div className="input-container">
          <input required type="text" id="name" placeholder="Enter name" />
        </div>
        <div className="input-container">
          <input required type="date" id="date" placeholder="Select date" />
        </div>
        <div className="input-container">
          <input
            required
            type="number"
            id="quantity"
            placeholder="Enter quantity"
          />
        </div>
        <button className="custom-btn" type="submit">
          Generate QR
        </button>
      </form>
    </div>
  );
};

export default GenerateQR;

import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import QrScanner from "qr-scanner";
import api from "../instance/api";

const ScanQR = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);
  const [message, setMessage] = useState("");

  const handleScan = (data) => {
    setError("");
    if (data) {
      setMessage("");
      console.log(data);
      const json = JSON.parse(data.text);
      // console.log("id is ", json._id);
      if (!json._id) {
        setError("Invalid Qr code");
      }
      handleEdit(json._id);
      setResult(json._id);
      setScanning(false);
    } else {
      setMessage("scanning...");
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleEdit = async (id) => {
    try {
      const response = await api.put(`api/update-inventory/${id}`, {
        type: "random",
      });
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      // Handle errors if needed
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    QrScanner.scanImage(file)
      .then((result) => {
        let data = JSON.stringify(result);
        data = JSON.parse(result);
        if (!data._id) {
          setError("Invalid Qr");
        }
        handleEdit(data._id);
        setResult(data._id);
      })
      .catch((error) => {
        setError("invalid qr code");
        console.error(error);
      });
  };

  const startFileUpload = () => {
    setResult("");
    document.getElementById("file-input").click();
  };

  return (
    <div className="scan-qr-container">
      <h2>Scan QR Code</h2>
      <p>Upload a QR code image or scan using your camera</p>

      {scanning ? (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      ) : (
        <>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button className="custom-btn" onClick={startFileUpload}>
            Upload Image
          </button>
          <button className="custom-btn" onClick={() => setScanning(true)}>
            Scan QR
          </button>
        </>
      )}

      <p>
        Scanned Result:{" "}
        {result ? (
          <a href={`/?id=${result}`}>{result}</a>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : message ? (
          <p className="success-message">{message}</p>
        ) : (
          "No QR code scanned yet"
        )}
      </p>
    </div>
  );
};

export default ScanQR;

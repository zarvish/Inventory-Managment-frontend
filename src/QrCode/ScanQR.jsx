import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import QrScanner from "qr-scanner";

const ScanQR = () => {
  const [result, setResult] = useState("");
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    console.log(data);
    if (data) {
      const json = JSON.parse(data.text);
      setResult(json._id);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    QrScanner.scanImage(file)
      .then((result) => {
        let data = JSON.stringify(result);
        data = JSON.parse(result);
        console.log(data);
        setResult(data._id);
      })
      .catch((error) => {
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
        ) : (
          "No QR code scanned yet"
        )}
      </p>
    </div>
  );
};

export default ScanQR;

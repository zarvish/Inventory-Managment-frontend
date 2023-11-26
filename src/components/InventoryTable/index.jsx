import React, { useState } from "react";
import QRCode from "qrcode.react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import "./style.scss";
import Button from "../Button";

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([
    {
      _id: "65619907989c6629fdf6cc7a",
      name: "C5",
      date: {
        received_date: "2023-11-15",
        dispatched_date: "2023-11-25",
      },
      quantity: {
        received_quantity: "800",
        dispatched_quantity: 1,
      },
      __v: 0,
    },
    {
      _id: "65619907989c6629fdf6cc7b",
      name: "D7",
      date: {
        received_date: "2023-11-20",
        dispatched_date: "2023-11-28",
      },
      quantity: {
        received_quantity: "500",
        dispatched_quantity: 2,
      },
      __v: 0,
    },
    {
      _id: "65619907989c6629fdf6cc7c",
      name: "E9",
      date: {
        received_date: "2023-11-10",
        dispatched_date: "2023-11-18",
      },
      quantity: {
        received_quantity: "300",
        dispatched_quantity: 3,
      },
      __v: 0,
    },
    {
      _id: "65619907989c6629fdf6cc7d",
      name: "F2",
      date: {
        received_date: "2023-11-25",
        dispatched_date: "2023-12-05",
      },
      quantity: {
        received_quantity: "1000",
        dispatched_quantity: 4,
      },
      __v: 0,
    },
    {
      _id: "65619907989c6629fdf6cc7e",
      name: "G4",
      date: {
        received_date: "2023-11-05",
        dispatched_date: "2023-11-15",
      },
      quantity: {
        received_quantity: "200",
        dispatched_quantity: 5,
      },
      __v: 0,
    },
  ]);

  const downloadQRCode = (item) => {
    const canvas = document.getElementById(`qrcode-${item._id}`);
    const qrImage = canvas.toDataURL("image/png");

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImage;
    downloadLink.download = `QR_Code_${item._id}.png`;
    downloadLink.click();
  };

  const renderTableRows = () => {
    return inventoryData.map((item) => (
      <tr key={item._id}>
        <td data-label="Name">{item.name}</td>
        <td data-label="Date Received">
          {item.date.received_date}/{item.quantity.received_quantity}
        </td>
        <td data-label="Date Dispatched">
          {item.date.dispatched_date}/{item.quantity.dispatched_quantity}
        </td>
        <td data-label="Pending Items">
          {item.quantity.received_quantity - item.quantity.dispatched_quantity}
        </td>
        <td data-label="Status">Pending</td>
        <td data-label="Qr Code">
          <div
            onClick={() => downloadQRCode(item)}
            style={{ marginTop: "15px", cursor: "pointer" }}
          >
            <QRCode id={`qrcode-${item._id}`} value={JSON.stringify(item)} />
          </div>
        </td>
        <td data-label="Admin Panel">
          <Button type="icon" icon={<CiEdit size={30} />} />
          <Button type="icon" icon={<MdDeleteOutline size={30} />} />
        </td>
      </tr>
    ));
  };
  return (
    <div className="table-container">
      <table className="inventory-table">
        <thead>
          <tr className="text-primary">
            <th>Name</th>
            <th>Date Received/Quantity</th>
            <th>Date Dispatched/Quantity</th>
            <th>Pending Items</th>
            <th>Status</th>
            <th>Qr Code(Click to download)</th>
            <th>Admin Panel</th>
          </tr>
        </thead>
        <tbody className="t-body">{renderTableRows()}</tbody>
      </table>
    </div>
  );
};

export default InventoryTable;

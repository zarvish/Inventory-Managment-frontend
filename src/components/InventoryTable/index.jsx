import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import "./style.scss";
import Button from "../Button";
import api from "../../instance/api";
import { useNavigate } from "react-router-dom";

const InventoryTable = () => {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const response = await api.get("/api/fetch-inventory");
      setInventoryData(response.data);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };
  useEffect(() => {
    fetchInventoryData();
  }, []);

  const downloadQRCode = (item) => {
    const canvas = document.getElementById(`qrcode-${item._id}`);
    const qrImage = canvas.toDataURL("image/png");

    // Create a temporary anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = qrImage;
    downloadLink.download = `QR_Code_${item._id}.png`;
    downloadLink.click();
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return `${day} ${months[monthIndex]} ${year}`;
  };

  const handleDelete = async (item) => {
    console.log(item._id);
    try {
      const response = await api.delete(`/api/delete-inventory/${item._id}`);
      fetchInventoryData(); // Set the retrieved data to state
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      // Handle errors if needed
    }
  };

  const renderTableRows = () => {
    return inventoryData.map((item) => (
      <tr key={item._id}>
        <td data-label="Name">{item.name}</td>
        <td data-label="Date Received">
          {formatDate(item.date.received_date)}/
          {item.quantity.received_quantity}
        </td>
        <td data-label="Date Dispatched">
          {item?.date?.dispatched_date
            ? `${formatDate(item.date.dispatched_date)}/${
                item.quantity.dispatched_quantity
              }`
            : "__________"}
        </td>
        <td data-label="Pending Items">
          {item.quantity.received_quantity - item.quantity.dispatched_quantity}
        </td>

        <td data-label="Status">
          {!(
            item.quantity.received_quantity - item.quantity.dispatched_quantity
          )
            ? "Delivered"
            : "Pending"}
        </td>
        <td data-label="Qr Code">
          <div
            onClick={() => downloadQRCode(item)}
            style={{ marginTop: "15px", cursor: "pointer" }}
          >
            <QRCode id={`qrcode-${item._id}`} value={JSON.stringify(item)} />
          </div>
        </td>
        <td data-label="Admin Panel">
          <Button
            type="icon"
            icon={
              <CiEdit
                onClick={() =>
                  navigate("/edit-inventory", { state: { data: item } })
                }
                size={30}
              />
            }
          />
          <Button
            type="icon"
            icon={
              <MdDeleteOutline onClick={() => handleDelete(item)} size={30} />
            }
          />
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

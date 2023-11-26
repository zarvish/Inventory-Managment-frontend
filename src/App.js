import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import InventoryTable from "./components/InventoryTable";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Authentication/SignIn";
import Register from "./Authentication/Register";
import GenerateQR from "./QrCode/GenerateQR";
import ScanQR from "./QrCode/ScanQR";
import EditInventory from "./QrCode/EditInventory";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<InventoryTable />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        {/* protected routes */}
        <Route
          path="/generate-qr-code"
          element={
            <PrivateRoute>
              <GenerateQR />
            </PrivateRoute>
          }
        />
        <Route
          path="/scan-qr-code"
          element={
            <PrivateRoute>
              <ScanQR />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-inventory"
          element={
            <PrivateRoute>
              <EditInventory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

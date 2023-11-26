import React, { useState, useEffect } from "react";
import "./style.scss";
import Button from "../Button";
import Text from "../Text";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="nav-container">
      <p className="title" onClick={() => navigate("/")}>
        Inventory Management System
      </p>
      <div className="nav-qr">
        <Button
          title={"Generate Qr Code"}
          type="ghost"
          onClick={() => navigate("/generate-qr-code")}
        />
        <Button
          title={"Scan Qr Code"}
          type="ghost"
          onClick={() => navigate("/scan-qr-code")}
        />
      </div>
      {isLoggedIn ? (
        <Button title="Logout" type="filled" onClick={handleLogout} />
      ) : (
        <div className="btn-group">
          <div>
            <Button
              title="Sign in"
              type="outlined"
              onClick={() => navigate("/sign-in")}
            />
          </div>
          <div>
            <Button
              title="Register"
              type="filled"
              onClick={() => navigate("/register")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

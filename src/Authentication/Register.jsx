import React, { useState } from "react";
import api from "../instance/api"; // Import the api.js file
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to manage error message

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      navigate("/sign-in"); // Redirect on successful registration
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Set the error message from the response
      } else {
        setError("Registration failed. Please try again."); // Set a generic error message
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <p>Create an account to get started</p>
      <form onSubmit={handleRegister}>
        <div className="input-container">
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Register
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className="login-link">
        Already have an account? <a href="/sign-in">Sign In</a>
      </p>
    </div>
  );
};

export default Register;

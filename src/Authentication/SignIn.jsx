import React, { useState } from "react";
import api from "../instance/api"; // Import the api.js file
import { useNavigate } from "react-router-dom";
import "./index.scss";
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      if (response.data.token) {
        // Save the token to local storage or session storage for future requests
        await localStorage.setItem("token", response.data.token);
        window.location.href = "/"; // Redirect on successful login
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (error?.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      <p>Welcome, login to continue</p>
      <form onSubmit={handleSignIn}>
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
          Sign in
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <p className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default SignIn;

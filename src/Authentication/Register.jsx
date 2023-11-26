import React, { useState } from "react";
import api from "../instance/api"; // Import the api.js file

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(response); // Log the response
      // Optionally, you can redirect the user or perform other actions upon successful registration
    } catch (error) {
      console.error(error.response.data); // Log the error response
      // Handle errors or display error messages to the user
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
      <p className="login-link">
        Already have an account? <a href="/sign-in">Sign In</a>
      </p>
    </div>
  );
};

export default Register;

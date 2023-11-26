import React from "react";
import "./index.scss"; // Your CSS file for styling
import Button from "../components/Button";

const SignIn = () => {
  return (
    <div className="signin-container">
      <h2>Sign in</h2>
      <p>Welcome, login to continue</p>
      <form>
        <div className="input-container">
          {/* <label htmlFor="email">Email:</label> */}
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="input-container">
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            required
            id="password"
            placeholder="Enter password"
          />
        </div>
        <div>
          <button
            style={{ width: "100%" }}
            className="submit-btn"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="register-link">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default SignIn;

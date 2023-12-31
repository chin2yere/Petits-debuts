import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserContext,
  ProductContext,
  TotalOtherContext,
} from "../../UserContext.js";
import "./LoginForm.css";
//this page handles user login. It collects information that is needed to make the login request
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);
  const { productContext } = useContext(ProductContext);
  const { TotalOther, setTotalOther } = useContext(TotalOtherContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login API request

      const response = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        const loggedInUser = data.user;

        // Update the user context
        updateUser(loggedInUser);
        setTotalOther(null);
        // Navigate to the home page after successful login
        navigate("/");
      } else {
        // Handle the login failure case
        alert("Login failed");
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          New to the app? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

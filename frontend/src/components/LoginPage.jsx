import React, { useState } from "react";
import "./LoginPage.css";
import axios from "axios";

const LoginPage = ({ onFormSwitch, setIsLoggedIn, HOST, PORT }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://${HOST}:${PORT}/user/login`, {
        email: email,
        password: pass,
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        localStorage.setItem("id", JSON.stringify(data.id));
        document.cookie = "Bearer=" + JSON.stringify(data.token);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <div className="body-bgColor">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@example.com"
            id="email"
            name="email"
          />
          <label htmlFor="password">Password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="*********"
            id="password"
            name="password"
          />
          <button className="btn btn-logIn" type="submit">
            Log In
          </button>
        </form>
        <button className="link-btn" onClick={() => onFormSwitch("register")}>
          Don't have an account? Register here.
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

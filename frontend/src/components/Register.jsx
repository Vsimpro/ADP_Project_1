import axios from "axios";
import React, { useState } from "react";

const Register = ({ onFormSwitch, setIsLoggedIn, HOST, PORT}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://${HOST}:${PORT}/user/create-user`, {
        email: email,
        password: pass,
        name: name,
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
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            value={name}
            name="name"
            id="name"
            placeholder="eg. John Doe"
            onChange={(e) => setName(e.target.value)}
          />
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
            Register
          </button>
        </form>
        <button className="link-btn" onClick={() => onFormSwitch("login")}>
          Already have an account? Login here.
        </button>
      </div>
    </div>
  );
};

export default Register;

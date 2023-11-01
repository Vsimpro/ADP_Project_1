import React, { useState } from "react";

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('localhost:8123/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        email,
        pass,
        name
      }
    })
  }

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input value={name} name="name" id="name" placeholder="full name" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@example.com" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="*********" id="password" name="password" />
        <button type="submit">Log In</button>
      </form>
      <button onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div >
  )
}

export default Register
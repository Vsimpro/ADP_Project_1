import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Card from './components/Card';
import LoginPage from './components/Login-Resolve-Later/LoginPage'
import Register from './components/Login-Resolve-Later/Register'
import { useState } from 'react';

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  // return (
  //   <div className="container p-3">
  //   <div>
  //     <Navbar />
  //     <Card />
  //   </div>

  //     <div className="row">
  //       <div className="col-md-6">
  //       <Card />
  //       </div>
  //       <div className="col-md-6">
  //       <Card />
  //     </div>
  //   </div>
  //   </div>
  // );

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "login" ? <LoginPage onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
};

export default App;

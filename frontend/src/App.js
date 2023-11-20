import './App.css';
import './components/cards/cardDemo.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import CardList from './components/cards/CardList';
import socket from './controller/socket.js';
import Create from './components/Create.jsx';
import Profile from './components/profile/Profile.jsx';

const HOST = "localhost"; // todo hae tämä .env tiedostosta
const PORT = "8123"; // todo hae tämä .env tiedostosta

function App() {
  const userId = localStorage.getItem('id') // tulisiko tämä muuttaa tarkastamaan onko jwt token olemassa / validi?
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setisLoggedIn] = useState(Boolean(userId));

//TODO: kaikki projektit johon käyttäjä kuuluu 
// => joinaa projectId:llä socket.io roomiin
// kuuntele niissä huoneissa "project:updated" eventtiä
// => käske hakemaan databasesta päivitetty tieto
// ??? millä tasolla uusi tieto haetaan Projekti => Kortti => Taski???
useEffect(() => {
  socket.on("connect", () => {
    console.log("Socket id: " + socket.id + " Connected: " + socket.connected);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  // Clean up the effect
  return () => {
    socket.off("connect");
    socket.off("disconnect");
  }
}, []);

  // määrittele näytettävä login elementti
  // jos käyttäjä on kirjautunut sisään, ohjaa etusivulle
  // muuten näytä kirjautumislomake 
  // ja vaihda elementtiä käyttäjän valinnan mukaan LoginPage.jsx / Register.jsx komponenteissa
  var loginElement;
  const handleLoginFormSwitch = (formName) => {
    setCurrentForm(formName);
  }
  if (isLoggedIn) {
    loginElement = <Navigate to="/" />;
  } else if (currentForm === 'login') {
    loginElement = <LoginPage setIsLoggedIn={setisLoggedIn} onFormSwitch={handleLoginFormSwitch} />;
  } else {
    loginElement = <Register setIsLoggedIn={setisLoggedIn} onFormSwitch={handleLoginFormSwitch} />;
  }

  useEffect(() => {
    if (userId) {
      setisLoggedIn(true)
    }
  }, [userId])

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? <Navbar /> : null}
        <Routes>
          <Route path="/login" element={loginElement} />
          <Route path="/" element={isLoggedIn ? <CardList userId={userId} HOST={HOST} PORT={PORT} /> : <Navigate to="/login" />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
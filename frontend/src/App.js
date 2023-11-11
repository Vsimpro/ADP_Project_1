import './App.css';
import './components/cards/cardDemo.css';
import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage'
import Register from './components/Register'
import CardDemo from './components/cards/CardDemo';
import io from 'socket.io-client';
import { useFetchCards } from './hooks/useFetchCards.js';

const HOST = "localhost"; // todo hae tämä .env tiedostosta
const PORT = "8123"; // todo hae tämä .env tiedostosta



function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [listData, setListData] = useState([]);
  const userId = localStorage.getItem('id') // tulisiko tämä muuttaa tarkastamaan onko jwt token olemassa / validi?

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  useEffect(() => {
    if (userId) {
      setisLoggedIn(true)
    }
  }, [userId])

  // hakee tietokannasta kortit ja asettaa ne listDataan
  // suorittaa vain kun isLoggedIn muuttuu trueksi
  useFetchCards(isLoggedIn, userId, setListData, HOST, PORT);

  return (
    <div className="App">
      {
        isLoggedIn ? <div className="container">
          <Navbar />

          <div userId="cards-container">
            {listData.map((item, index) => (
              <CardDemo key={index} item={item} />

            ))}
          </div>

        </div>
          : currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} setIsLoggedIn={setisLoggedIn} /> : <Register onFormSwitch={toggleForm} setIsLoggedIn={setisLoggedIn} />
      }
    </div>
  );
};

export default App;
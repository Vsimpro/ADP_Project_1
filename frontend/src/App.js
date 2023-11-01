import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Card from './components/Card';
import LoginPage from './components/Login-Resolve-Later/LoginPage'
import Register from './components/Login-Resolve-Later/Register'
import { useState, useEffect } from 'react';

const listData = [
  {
    category: "Shopping List",
    title: "Breakfast Items",
    listItems: ["🥚 Eggs", "🥓 Bacon", "🍞 Toast"],
  },
  {
    category: "Recipes",
    title: "Guacamole",
    description: "Fresh and creamy avocado dip with tomatoes and spices.",
    listItems: [
      "3 ripe avocados",
      "1 medium tomato, diced",
      "1/2 cup red onion, finely chopped",
      "2 cloves garlic, minced",
      "1 lime, juiced",
    ],
  },
  {
    category: "Recipes",
    title: "Caesar Salad",
    description: "A classic Caesar salad with crisp romaine lettuce, croutons, and creamy dressing.",
    listItems: [
      "1 head romaine lettuce",
      "1 cup croutons",
      "1/4 cup grated Parmesan cheese",
      "1/4 cup Caesar dressing",
      "1 clove garlic, minced",
      "1 lemon, juiced",
      "Salt and black pepper to taste",
    ],
  },
];

function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setisLoggedIn] = useState(false)

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  useEffect(() => {
    const id = localStorage.getItem('id')
    if (id) {
      setisLoggedIn(true)
    }
  }, [])

  return (
    <div className="App">
      {
        isLoggedIn ? <div className="container p-3">
          <Navbar />
          <div id="cards-container">
            {listData.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </div>
        </div>
          : currentForm === 'login' ? <LoginPage onFormSwitch={toggleForm} setIsLoggedIn={setisLoggedIn} /> : <Register onFormSwitch={toggleForm} setIsLoggedIn={setisLoggedIn} />
      }
    </div>
  );
};

export default App;

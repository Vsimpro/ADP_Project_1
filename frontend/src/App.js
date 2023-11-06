import './App.css';
import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Card from './components/Card';
import LoginPage from './components/LoginPage'
import Register from './components/Register'

const HOST = "localhost";
const PORT = "8123";



function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoggedIn, setisLoggedIn] = useState(false)
  const [listData, setListData] = useState([]);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  useEffect(() => {
    const id = localStorage.getItem('id')
    if (id) {
      setisLoggedIn(true)
      // tämä hakee datan tietokannasta
      // tämän saa poistaa/muokata/ tehdä mitä vaan
      // eetun aivopieruilua
      fetch(`http://${HOST}:${PORT}/card/get-all-cards/${JSON.parse(id)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Käsittelee vastauksen JSON-muodossa
        })
        .then((data) => {
          console.log(data);
          setListData(data);
        })
        .catch((error) => {
          console.log(error);
        });
        // tähän lopppuu aivopieruilut
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
// [
//   {
//     category: "Shopping List",
//     title: "Breakfast Items",
//     listItems: ["🥚 Eggs", "🥓 Bacon", "🍞 Toast"],
//   },
//   {
//     category: "Recipes",
//     title: "Guacamole",
//     description: "Fresh and creamy avocado dip with tomatoes and spices.",
//     listItems: [
//       "3 ripe avocados",
//       "1 medium tomato, diced",
//       "1/2 cup red onion, finely chopped",
//       "2 cloves garlic, minced",
//       "1 lime, juiced",
//     ],
//   },
//   {
//     category: "Recipes",
//     title: "Caesar Salad",
//     description: "A classic Caesar salad with crisp romaine lettuce, croutons, and creamy dressing.",
//     listItems: [
//       "1 head romaine lettuce",
//       "1 cup croutons",
//       "1/4 cup grated Parmesan cheese",
//       "1/4 cup Caesar dressing",
//       "1 clove garlic, minced",
//       "1 lemon, juiced",
//       "Salt and black pepper to taste",
//     ],
//   },
// ];
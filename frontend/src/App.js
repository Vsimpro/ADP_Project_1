import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import Card from "./components/Card";

//Lista, mistä Card-komponentti nappaa nyt kaiken datan ja luo sen perusteella kortit. Lista käsitellään rivillä 47 --> 
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

const App = () => {
  return (
    <div className="container">
      <div className="row main-content">
      <Navbar />
        <div id="cards-container">
          {listData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

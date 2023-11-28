import React, { useState } from "react";

const Card = ({ item }) => {
  // Alustetaan tilamuuttujat "stage" ja "crossedOutItems" käyttäen Reactin "useState"-funktiota.
  const [stage, setStage] = useState("A"); // "stage" määrittää kortin tilan, joka on alussa A.
  const [crossedOutItems, setCrossedOutlistItems] = useState(
    item.listItems.map(() => false) // "crossedOutItems" määrittää, mitkä listan kohteet on yliviivattuja.
  );

  // "toggleStage" vaihtaa kortin tilaa "A" ja "B" välillä.
  const toggleStage = () => {
    if (stage === "A") {
      setStage("B");
    }
  };

  // "handleListItemClick" käsittelee listaelementtien yliviivauksen. Tässä on pyydetty ChatGPT:n apuja, kun käänsin vanilla JS:stä Reactiin. 
  const handleListItemClick = (index) => {
    const updatedCrossedOutlistItems = [...crossedOutItems];
    updatedCrossedOutlistItems[index] = !updatedCrossedOutlistItems[index];
    setCrossedOutlistItems(updatedCrossedOutlistItems);
  };

  // "handleCloseClick" käsittelee "Close"-buttonin klikkauksen (eli palauttaa tilaan A) 
  const handleCloseClick = () => {
    setStage("A");
  };

  // Alla oleva JSX ja ternary operators määrittelee kortin ulkoasun ja rakenteen riippuen tilasta (A vai B).

  return (
    <div className={`card ${stage === "A" ? "card-select" : ""}`} onClick={toggleStage}>

      {/* Alkutila A = header, title ja description teksti */}
      <div className="card-header">{item.category}</div> 

      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-description">{item.description}</p>
      </div>

      {/* Avattu kortti, eli tila B (lisätään siis lista, save ja close buttonit) */}
      {stage === "B" && (
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {item.listItems.map((list, index) => (
              <li
                key={index}
                className={`list-group-item ${crossedOutItems[index] ? "crossed-out" : ""}`}
                onClick={() => handleListItemClick(index)}
              >
                {list}
              </li>
            ))}
          </ul>
          <div className="card-buttons">
            <button className="btn btn-dark">Edit</button>
            <button className="btn btn-outline-dark" onClick={handleCloseClick}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
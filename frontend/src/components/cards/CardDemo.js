import React, { useState, useRef } from 'react';
import axios from 'axios';
import socket from '../../controller/socket';


const CardDemo = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const cardRef = useRef();

  const toggleCard = () => {
    if (isClicked) {
      setIsClicked(false);
      setIsEditMode(false);
      return;
    }
    setIsClicked(true);
  };

  const openEditMode = () => {
    setIsEditMode(true);
  }

  const closeEditMode = () => {
    setIsEditMode(false);
    setIsClicked(false);
  }

  const saveChanges = async () => {
    const cardElement = cardRef.current;
    // objekti joka sisältää päivitettävät tiedot
    const updatedData = {
      title: cardElement.querySelector('.card-title').innerText,
      description: cardElement.querySelector('.card-description').innerText,
      listItems: Array.from(cardElement.querySelectorAll('.list-group-item')).map(item => item.innerText),
    };

    console.log(updatedData); // logita päivitettävät tiedot

    try {
      await axios.patch(`http://localhost:8123/card/update-card/${item._id}`, updatedData);
      setIsEditMode(false);
      // emittaa tieto että projekti on päivitetty
      //TODO: tämä saattaa muuttua kun projektisivu tulee käyttöön
      socket.emit("project:update");
    } catch (error) {
      console.error('Virhe tallennettaessa muutoksia:', error);
    }
  };

  return (
    <div className={`card ${isClicked ? 'card-active' : ''}`} ref={cardRef}>
      <div className="card-header color" onClick={toggleCard}>{item.category} (klikkaa tästä auki)</div>
      <div className="card-body">
        <h5 className={`card-title ${isEditMode ? 'editablecontent active-field' : ''}`} contentEditable={isEditMode}>{item.title}</h5>
        <p className={`card-description ${isEditMode ? 'editablecontent active-field' : ''}`} contentEditable={isEditMode}>{item.description}</p>
        {isClicked && (
          <div>
            <ul className="list-group list-group-flush">
              {item.listItems.map((item, index) => (
                <li key={index} className={`list-group-item ${isEditMode ? 'editablecontent active-field list-group-item' : ''}`} contentEditable={isEditMode}>{item}</li>
              ))}
            </ul>
            <div className='buttons-container'>
              {isEditMode ? (
                <button className='btn btn-success demobtn' onClick={saveChanges}>Save</button>
              ) : (
                <button className='btn btn-success demobtn' onClick={openEditMode}>Edit</button>
              )}
              <button className='btn btn-outline-dark demobtn' onClick={closeEditMode}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDemo;

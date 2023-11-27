import React, { useState, useRef } from 'react';
import axios from 'axios';
import socket from '../../controller/socket';
import EditTools from '../createTools/EditTools';


const CardDemo = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [headerColor, setHeaderColor] = useState('#DefaultColor');

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
      listItems: Array.from(cardElement.querySelectorAll('.list-group-item')).map(item => ({
        task: item.innerText,
        isDone: false,
      })),
    };

    console.log(updatedData); // logita päivitettävät tiedot

    try {
      await axios.patch(`http://localhost:8123/card/update-card/${item._id}`,
       updatedData,
       {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
      setIsEditMode(false);
      // emittaa tieto että projekti on päivitetty
      //TODO: tämä saattaa muuttua kun projektisivu tulee käyttöön
      socket.emit("project:update");
    } catch (error) {
      console.error('Virhe tallennettaessa muutoksia:', error);
    }
  };


return (
<div className="row card-row">
      <div className="col-md-9 custom-card-column">
        <div className={`card custom-card ${isClicked ? 'card-active' : ''}`} ref={cardRef}>
          <div className="card-header color" style={{ backgroundColor: headerColor }} onClick={toggleCard}>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              className="header-container"
            >
              <span className='header-text'>{item.category}</span>
              {isEditMode || !isClicked ? null : (
                <button
                  className='btn editCardButton'
                  onClick={(event) => {
                    event.stopPropagation(); 
                    openEditMode();
                  }}
                >
                </button>
              )}
            </div>
          </div>
          <div className="card-body">
            <h5 className={`card-title ${isEditMode ? 'editablecontent active-field' : ''}`} contentEditable={isEditMode}>{item.title}</h5>
            <p className={`card-description ${isEditMode ? 'editablecontent active-field' : ''}`} contentEditable={isEditMode}>{item.description}</p>

            {isClicked && (
              <div>
                <ul className="list-group list-group-flush">
                  {item.listItems.map((item) => (
                    <li key={item._id} className={`list-group-item ${isEditMode ? 'editablecontent active-field list-group-item' : ''}`} contentEditable={isEditMode}>{item.task}</li>
                  ))}
                </ul>

                <div className='buttons-container'>
                  {isEditMode ? (
                    <div>
                      <button className='btn demobtn save' onClick={saveChanges}>Save</button>
                      <button className='btn btn-outline-dark demobtn' onClick={closeEditMode}>Close</button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-md-3">
      {isEditMode && <EditTools onColorChange={setHeaderColor} />} 

      </div>
    </div>
  );
};
export default CardDemo;
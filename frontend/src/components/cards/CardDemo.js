import React, { useState, useEffect } from 'react';
import { socket } from '../../controller/socket';
import axios from 'axios';


const CardDemo = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
 // const [cardItem, setCardItem] = useState(item); // item on propsina saatu objekti, joka sisältää kortin tiedot

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

  const updateLocalData = async () => {
    try {
      const response = await axios.get(`http://localhost:8123/card/get-card/${item._id}`);
      const updatedData = response.data;

      // Päivitä tila lokaalisti päivitetyillä tiedoilla
      //setCardItem(updatedData);
    } catch (error) {
      console.error('Virhe päivitettäessä tietoja:', error);
    }
  };

  useEffect(() => {
    // käsittele päivitykset Socket.IO:n kautta
    socket.on('cardUpdated', (updatedCard) => {
      //setCardItem(updatedCard);
    });

    return () => {
      // vapauta resurssit
      socket.off('cardUpdated');
    };
  }, []);

  const saveChanges = async () => {

    // objekti joka sisältää päivitettävät tiedot
    const updatedData = {
      title: document.querySelector('.card-title').innerText,
      description: document.querySelector('.card-description').innerText,
      listItems: Array.from(document.querySelectorAll('.list-group-item')).map(item => item.innerText),
    };

    console.log(updatedData); // logita päivitettävät tiedot
    
    try {
      await axios.patch(`http://localhost:8123/card/update-card/${item._id}`, updatedData);

      // lähetä päivitys Socket.IO:n kautta
      socket.emit('updateCard', item._id);

      setIsEditMode(false);

      // hae päivitetyt tiedot tietokannasta
      updateLocalData();
    } catch (error) {
      console.error('Virhe tallennettaessa muutoksia:', error);
    }
  };

  return (
    <div className={`card ${isClicked ? 'card-active' : ''}`}>
    <div className="card-header color" onClick={toggleCard}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className="header-container"
      >
        <span className='header-text'>{item.category}</span>
        {isEditMode || !isClicked ? null : (
              <button
              className='editCardButton'
              onClick={(event) => {
                event.stopPropagation(); // Prevent event from reaching the parent (card-header)
                openEditMode();
              }}
            >
              📝
            </button>
        )}
      </div>
    </div>
  {/*   <div className="card-body" onClick={toggleCard}> */}
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
    /* </div> */
  );
};

export default CardDemo;

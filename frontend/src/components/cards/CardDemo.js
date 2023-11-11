import React, { useState } from 'react';

const CardDemo = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const saveChanges = () => {
    setIsEditMode(false);
  }

  return (
    <div className={`card ${isClicked ? 'card-active' : ''}`}>
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

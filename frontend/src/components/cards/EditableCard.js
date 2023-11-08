import React, { useState } from 'react';

const EditableCard = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const openCard = () => { 
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
      <div className="card-header" onClick={openCard}>Kategoria (klikkaa tästä kortti auki)</div>
      <div className="card-body">
        <h5 className='catrd-title'>Tässä otsikko</h5>

        {isClicked && (
          <div>
            <p className={`card-description ${isEditMode ? 'editablecontent active-field' : ''}`} contentEditable={isEditMode}>
              Tätä tekstikenttää voi muokata, kun klikkaa edit
            </p>
            <div className='buttons-container'>
              {isEditMode ? (
                <button className='btn btn-success' onClick={saveChanges}>Save</button>
              ) : (
                <button className='btn btn-success' onClick={openEditMode}>Edit</button>
              )}
              <button className='btn btn-dark' onClick={closeEditMode}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableCard;

import React from 'react';
import './CreateCard.css';

// TODO toiminnallisuus listan luomiselle
// TODO lomakkeen tietojen lähetys tietokantaan

const CreateCard = () => {
  return (
    <div className='createCard'>
      <div className='card'>
      <div className='card-header custom-header'>
      </div>
      <div className='card-body'>
        <form>
          <div className='form-group'>
            <label>Title</label>
            <input type='text' className='form-control' placeholder='Add title...' />

            <label>Description</label>
            <textarea className='form-control' rows='3' placeholder='Add description...'></textarea>

            <label>List items</label>
            <input type='text' className='form-control' placeholder='Add list items...' />

            <button className='btn btn-outline-dark'>Add New</button>
          </div>
        </form>
      </div>
      <div>
        <div className='buttons-container'>
          <button className='btn btn-createCard'>Create</button>
        </div>
      </div>
      </div>
    </div>
  );
  
};

export default CreateCard;

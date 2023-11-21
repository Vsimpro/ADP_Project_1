import React from 'react';

// TODO lomakkeen tietojen lähetys tietokantaan

const CreateCard = () => {
  return (
    <div className='floating-component'>
      <h1>Create a new card</h1>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" id="" placeholder="Add title..." />

          <label>Description</label>
          <textarea className="form-control" id="" rows="3" placeholder='Add description...'></textarea>

          <label>List items</label>
          <input type="text" className="form-control" id="" />

          <button className='btn btn-dark'>Add New</button>
        </div>
      </form>
      <div className='buttons-container'>
        <button className='btn btn-secondary'>Create</button>
      </div> 
    </div>
  );
};

export default CreateCard;

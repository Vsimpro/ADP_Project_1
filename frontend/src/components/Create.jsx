import React from 'react';
import ColorPicker from './cards/ColorPicker';


const Create = () => {
  return (
    
      <div className='formGroup'>
      <h1>Create a new card</h1>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" id="" placeholder="Add title..." />

            <label>Category / Color</label>

            <ColorPicker />
            
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

export default Create;

import React, { useState } from 'react';
import './profile.css';
import ColorSetter from './ColorSetter.js';

const Profile = () => {
  const [profileColor, setProfileColor] = useState('');

  const handleColorChange = (color) => {
    setProfileColor(color);
  };

  const handleButtonClick = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Add your logic for the "Change" button functionality here
    // This function will be called when the "Change" button is clicked
    console.log('Change button clicked');
  };

  return (
    <div className='container profilePage'>
      <div className="row">
        <div className="col-md-3 col-12 order-md-2"></div>

        <div>
          <h1>Profile</h1>
          
          <ColorSetter onColorChange={handleColorChange} />
          <form>
            <div className="form-group">
              <div
                className="container custom-container text-center"
                style={{ backgroundColor: profileColor }}
              >
                <div className="row justify-content-center">
                  <div className="col-md-3 d-flex align-items-center"></div>
                  <div className="col-md-9 d-flex align-items-center"></div>
                </div>
              </div>

              <label>Name</label>
              <input type="text" className="form-control" placeholder="Name" />

              <hr className="my-4" />

              <h3>Account management</h3>
              <label>Email</label>
              <input type="text" className="form-control" placeholder="Email" />

              <label>Password</label>
              <input type="text" className="form-control" placeholder='************' />
              <button className='btn btn-outline-dark' onClick={handleButtonClick}>
                Change
              </button>
            </div>
          

          <hr className="my-4" />
          <div className='buttons-container'>
            <button className='btn btn-profile save'>Save</button>
            <hr className="my-4" />
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from 'react';
import './profile.css';
import ColorSetter from './ColorSetter.js';

const Profile = () => {
 
  const handlePasswordChange = (event) => {
    event.preventDefault(); 
    console.log('Change Password button clicked');
  };

  const handleSaveProfile = (event) => {
    console.log('Save button clicked');
    // TODO profiilitietojen tallennus tietokantaan
  };


  return (
    <div className='container profilePage'>
      <div>
        <h1>Profile</h1>
        <ColorSetter />
  
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name" />
  
            <hr className="my-4" />
  
            <h3>Account Management</h3>
            <label>Email</label>
            <input type="text" className="form-control" placeholder="Email" />
  
            <label>Password</label>
            <input type="text" className="form-control" placeholder='************' />
            <button className='btn btn-outline-dark' onClick={handlePasswordChange}>
              Change
            </button>
          </div>
  
          <hr className="my-4" />
          <div className='buttons-container'>
            <button className='btn btn-profile save' onClick={handleSaveProfile}>
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}  

export default Profile;

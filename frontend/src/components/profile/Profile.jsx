import React, { useEffect, useRef, useState } from 'react';
import './profile.css';
import ColorSetter from './ColorSetter.js';
import axios from 'axios';
import useProfileData from '../../hooks/useProfileData.js';

const Profile = ({ userId, HOST, PORT }) => {

  const profileData = useProfileData(userId, HOST, PORT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
    if (name) {
      let initials = name.split(' ').slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');
      setUserInitials(initials);
    }
  }, [name]);

  useEffect(() => {
    if (profileData) {
      setName(profileData.name);
      setEmail(profileData.email);
    }
  }, [profileData]);

  const handlePasswordChange = (event) => {
    event.preventDefault();
    console.log('Change Password button clicked');
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();
    console.log('Save button clicked');
    const updatedProfileData = {
      name: name,
      email: email,
    };

    // TODO: Salasana tulee syöttää jos profiilin tietoja halutaan muuttaa

    // TODO: salasanan tallennukseen toiminnallisuutta
    // => pitää syöttää vanhasalasana ja uusi jos salasanaa vaihdetaan
    // if (profileRef.querySelector('profile-password').innerText !== ''){
    //   updatedProfileData.password = profileRef.querySelector('profile-password').innerText;
    // };

    // TODO profiilitietojen tallennus tietokantaan
    axios.patch(`http://${HOST}:${PORT}/user/update-user/${JSON.parse(userId)}`, updatedProfileData, {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
  };



  return (
    <div className='col-12 d-flex justify-content-center container'>
      <div className='profilePage'>
        <h3>Profile</h3>
        <ColorSetter userInitials={userInitials} />

        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control profile-name" placeholder="Name" defaultValue={profileData ? name : null} onChange={e => setName(e.target.value)} />

            <hr className="my-4" />

            <h3>Account Management</h3>
            <label>Email</label>
            <input type="text" className="form-control profile-email" placeholder="Email" defaultValue={profileData ? email : null} onChange={e => setEmail(e.target.value)} />

            <label>Password</label>
            <input type="text" className="form-control" placeholder='************' />
            <button className='btn btn-outline-dark secondary-button' onClick={handlePasswordChange}>
              Change
            </button>
          </div>

          <hr className="my-4" />
          <div className='buttons-container'>
            <button className='btn btn-outline-dark primary-button' onClick={handleSaveProfile}>
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;

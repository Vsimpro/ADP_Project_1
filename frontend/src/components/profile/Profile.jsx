import React from 'react';
import './profile.css';


const Profile = () => {
  return (
    
    <div className='container profilePage'>
    <div className="row">
      <div className="col-md-3 col-12 order-md-2"></div>
  
      <div>
        <h1>Profile</h1>
        
        <form>
          <div className="form-group">
            <label>Photo</label>

            <div className="container custom-container text-center">
              <div className="row justify-content-center">
                <div className="col-md-3 d-flex align-items-center">
                  <div className='profilePicPlaceholder'></div>
                </div>
                <div className="col-md-9 d-flex align-items-center">
                  <button className='btn btn-outline-dark'>Change</button>
                </div>
              </div>
            </div>
  
            <label>Name</label>
            <input type="text" className="form-control" placeholder="Name" />
  
            <hr className="my-4" />
  
            <h3>Account management</h3>
            <label>Email</label>
            <input type="text" className="form-control" placeholder="Email" />
  
            <label>Password</label>
            <input type="text" className="form-control" placeholder='************'/>
            <button className='btn btn-outline-dark'>Change</button>
          </div>
        </form>

        <hr className="my-4" />
        <div className='buttons-container'>
          <button className='btn btn-profile save'>Save</button>
        </div>
      </div>
    </div>
  </div>
  
 
    
  );
};

export default Profile;

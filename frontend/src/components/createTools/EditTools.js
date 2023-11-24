import React from 'react';
import './CreateCard.css'

// TODO kortin kategorian / headerin värin vaihtaminen
// jäsenten hallinta

const EditTools = () => {
  return (
    <div className='editToolsContainer'>
   
    <div className='row'>
      <div className='col'>
        <label>Card color:</label>
      </div>
    </div>
  
    <div className='row'>
      <div className='col justify-content-center'>
        <button className='btn colorButton' style={{ backgroundColor: '#FA9797' }}></button>
        <button className='btn colorButton' style={{ backgroundColor: '#EFE699' }}></button>
        <button className='btn colorButton' style={{ backgroundColor: '#C9EF99' }}></button>
        <button className='btn colorButton' style={{ backgroundColor: '#BE8CFF' }}></button>
      </div>
      </div>
  

    <div className='row'>
      <div className='col d-flex justify-content-left'>
        <button className='btn btn-outline-dark'>Members</button>
    
      </div>
    </div>
  </div>
  
  )}

export default EditTools;

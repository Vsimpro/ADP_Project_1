import React from 'react';

const EditTools = ({ onColorChange }) => {
  const handleColorChange = (color) => {
    onColorChange(color); 
    // TODO: Save the color to the database if needed
  };

  return (
    <div className='editToolsContainer'>
      <div className='row'>
        <div className='col'>
          <label>Card color:</label>
        </div>
      </div>
      <div className='row'>
        <div className='col justify-content-center'>
          <button className='btn colorButton' style={{ backgroundColor: '#FF8049' }} onClick={() => handleColorChange('#FF8049')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#FFE212' }} onClick={() => handleColorChange('#FFE212')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#00ED64' }} onClick={() => handleColorChange('#00ED64')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#C980DA' }} onClick={() => handleColorChange('#C980DA')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#A99FFF' }} onClick={() => handleColorChange('#A99FFF')}></button>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-left'>
          <button className='btn btn-outline-dark secondary-button membersButton'>Members</button>
        </div>
      </div>
    </div>
  );
};

export default EditTools;

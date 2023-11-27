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
          <button className='btn colorButton' style={{ backgroundColor: '#FA9797' }} onClick={() => handleColorChange('#FA9797')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#EFE699' }} onClick={() => handleColorChange('#EFE699')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#C9EF99' }} onClick={() => handleColorChange('#C9EF99')}></button>
          <button className='btn colorButton' style={{ backgroundColor: '#A99FFF' }} onClick={() => handleColorChange('#A99FFF')}></button>
        </div>
      </div>
      <div className='row'>
        <div className='col d-flex justify-content-left'>
          <button className='btn btn-outline-dark membersButton'>Members</button>
        </div>
      </div>
    </div>
  );
};

export default EditTools;

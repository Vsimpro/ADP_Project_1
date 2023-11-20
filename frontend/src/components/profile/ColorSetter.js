import React, { useState } from 'react';

const ColorSetter = () => {
  const [bgColor, setBgColor] = useState('');

  const handleColorChange = (color) => {
    setBgColor(color);
    //TODO värin tallennus tietokantaan
  };

  return (
    <div>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <div className='profilePicPlaceholder' style={{ backgroundColor: bgColor }}>S</div>
        </div>
      </div>
      <div className='row'>
  
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn colors' style={{ backgroundColor: '#E85B6F' }} onClick={() => handleColorChange('#E85B6F')}></button>
          <button className='btn colors' style={{ backgroundColor: '#3F75C7' }} onClick={() => handleColorChange('#3F75C7')}></button>
          <button className='btn colors' style={{ backgroundColor: '#5BB5E8' }} onClick={() => handleColorChange('#5BB5E8')}></button>
          <button className='btn colors' style={{ backgroundColor: '#5BE8C6' }} onClick={() => handleColorChange('#5BE8C6')}></button>
          <button className='btn colors' style={{ backgroundColor: '#FFAB2D' }} onClick={() => handleColorChange('#FFAB2D')}></button>
        </div>
      </div>
    </div>
  );  
}  

export default ColorSetter;

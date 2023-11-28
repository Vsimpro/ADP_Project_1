import React, { useState } from 'react';

const ColorSetter = ({userInitials}) => {
  const [bgColor, setBgColor] = useState('');

  const handleColorChange = (color) => {
    setBgColor(color);
    //TODO värin tallennus tietokantaan
  };

  return (
    <div>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <div className='profilePicPlaceholder' style={{ backgroundColor: bgColor }}>{userInitials}</div>
        </div>
      </div>
      <div className='row'>
  
        <div className='d-flex justify-content-center align-items-center'>
          <button className='btn colors' style={{ backgroundColor: '#00D2FF' }} onClick={() => handleColorChange('#00D2FF')}></button>
          <button className='btn colors' style={{ backgroundColor: '#00D9C6' }} onClick={() => handleColorChange('#00D9C6')}></button>
          <button className='btn colors' style={{ backgroundColor: '#C980DA' }} onClick={() => handleColorChange('#C980DA')}></button>
          <button className='btn colors' style={{ backgroundColor: '#FFC010' }} onClick={() => handleColorChange('#FFC010')}></button>
          <button className='btn colors' style={{ backgroundColor: '#79F200' }} onClick={() => handleColorChange('#79F200')}></button>
        </div>
      </div>
    </div>
  );  
}  

export default ColorSetter;

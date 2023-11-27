import React, { useState } from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';
import './CreateCard.css';

const FloatingElements = ({ onClose }) => {
  const [headerColor, setHeaderColor] = useState('#FA9797');
  

  return (
    <div className="modal-overlay" onClick={onClose}>
     
      <div className="floatingContainer" onClick={(e) => e.stopPropagation()}>
        <h3 className='whiteHeading'>Create a new Card</h3>
        <div className="row">
          <div className="col-md-3 col-12 order-md-2 custom-column">
            <EditTools onColorChange={setHeaderColor} />
          </div>
          <div className="col-md-9 col-12 order-md-1 custom-column">
            <CreateCard headerColor={headerColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingElements;

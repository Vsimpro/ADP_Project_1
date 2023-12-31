import React, { useState } from 'react';
import './CreateCard.css'; 
import FloatingElements from '../createTools/FloatingElements.js';

const AddNewCardButton = ({ HOST, PORT}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleButtonClick = () => {
      setIsModalOpen(!isModalOpen);
    };

  
  return (
    <div className="addNewCardButton-container">
      <button className="btn addNewCardButton" onClick={handleButtonClick}>
        {isModalOpen ? 'x' : '+'}
      </button>
      {isModalOpen && <FloatingElements onClose={() => setIsModalOpen(false)} HOST={HOST} PORT={PORT}/>}
    </div>
  );
};

export default AddNewCardButton;

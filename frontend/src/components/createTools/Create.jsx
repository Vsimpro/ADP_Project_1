import React,  { useState } from 'react';
import EditTools from './EditTools';
import CreateCard from './CreateCard';


const Create = () => {
    const [headerColor, setHeaderColor] = useState('#FA9797');

  return (
  
    <div className='col-12 justify-content-center'>
      <div className="container main-content" onClick={(e) => e.stopPropagation()}>
      <div className='newCardContainer'>
        
        <div className="row col-12 justify-content-center">
          <div className="col-md-3 col-12 order-md-2 custom-column">
            <EditTools onColorChange={setHeaderColor} />
          </div>
          
          <h3>Create a new Card</h3>
          <div className="col-md-9 col-12 order-md-1 custom-column">
            <CreateCard headerColor={headerColor} />
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Create;

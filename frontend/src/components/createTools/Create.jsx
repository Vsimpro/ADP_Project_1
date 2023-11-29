import React, { useState } from 'react';
import EditTools from './EditTools';
import CreateCard from './CreateCard';

const Create = ({ HOST, PORT }) => {
  const [headerColor, setHeaderColor] = useState('#FA9797');

  return (
    <div className="container main-content" onClick={(e) => e.stopPropagation()}>
          
      <div className='newCardContainer'>
      <h3>Create a new Card</h3>
        <div className="row col-12 justify-content-center">
          <div className="col-md-3 col-12 order-md-2 custom-column">
            <EditTools onColorChange={setHeaderColor} />
          </div>
          <div className="col-md-9 col-12 order-md-1 custom-column">
            <CreateCard headerColor={headerColor} HOST={HOST} PORT={PORT}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

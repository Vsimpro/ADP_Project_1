/* import React from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';
import './CreateCard.css';

const FloatingElements = () => {

  
  return (
    <div className='floatingElements'>
      <h1>Create a new card</h1>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-3 col-12 order-md-2 custom-column">
          <EditTools />
        </div>
        <div className="col-md-9 col-12 order-md-1 custom-column">
          <CreateCard onColorChange={setHeaderColor} />
        </div>
      </div>
    </div>
    
  );
};

export default FloatingElements;
 */

import React, { useState } from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';
import './CreateCard.css';

const FloatingElements = () => {
  const [headerColor, setHeaderColor] = useState('#FA9797'); // Initial color

  return (
    <div className='floatingElements'>
      <h1>Create a new card</h1>
      <hr className="my-4" />
      <div className="row">
        <div className="col-md-3 col-12 order-md-2 custom-column">
          <EditTools onColorChange={setHeaderColor} />
        </div>
        <div className="col-md-9 col-12 order-md-1 custom-column">
          <CreateCard headerColor={headerColor} />
        </div>
      </div>
    </div>
  );
};

export default FloatingElements;

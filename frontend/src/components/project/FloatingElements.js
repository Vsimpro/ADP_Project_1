/* import React, { useState } from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';
import './CreateCard.css';

const FloatingElements = () => {
  const [headerColor, setHeaderColor] = useState('#FA9797'); 

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
 */

// FloatingElements.js
import React, { useState } from 'react';
import CreateProject from './CreateProject';
import EditTools from '../createTools/EditTools';
//import './CreateCard.css';

const FloatingElements = ({ onClose, HOST, PORT}) => {
  const [headerColor, setHeaderColor] = useState('#FA9797');


  return (
    <div className="modal-overlay" onClick={onClose}>

      <div className="floatingElements" onClick={(e) => e.stopPropagation()}>
        <h3>Create new project:</h3>
        <div className="row">
          <div className="col-md-3 col-12 order-md-2 custom-column">
            <EditTools onColorChange={setHeaderColor} />
          </div>
          <div className="col-md-9 col-12 order-md-1 custom-column">
            <CreateProject headerColor={headerColor} HOST={HOST} PORT={PORT}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingElements;

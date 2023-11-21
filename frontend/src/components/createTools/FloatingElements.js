import React from 'react';
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
          <CreateCard />
        </div>
      </div>
    </div>
    
  );
};

export default FloatingElements;

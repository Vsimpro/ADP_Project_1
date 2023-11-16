import React from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';

const FloatingElements = () => {
  return (
    <div>
      <div className="row">
        <div className="col-9">
          <p>Column 1</p>
          <CreateCard />
        </div>
        <div className="col-3">
          
          <p>Column 2</p>
          <EditTools />
        </div>
      </div>
    </div>
  );
};

export default FloatingElements;

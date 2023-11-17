import React from 'react';
import CreateCard from './CreateCard';
import EditTools from './EditTools';

const FloatingElements = () => {
    return (
        <div>
          <div className="row">
          <div className="col-md-3 col-12 order-md-2">

          <EditTools />
        </div>
        <div className="col-md-9 col-12 order-md-1">

              <CreateCard />
            </div>
          </div>
        </div>
      );
    };

export default FloatingElements;

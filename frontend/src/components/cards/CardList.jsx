import React, { useState, useEffect } from 'react';
import CardDemo from './CardDemo';
import { useFetchCards } from '../../hooks/useFetchCards.js';
import socket from '../../controller/socket.js';
import AddNewCardButton from '../createTools/AddNewCardButton';

const CardList = ({ userId, HOST, PORT }) => {
  const [listData, setListData] = useState([]);

  const fetchCards = useFetchCards(true, userId, setListData, HOST, PORT);

  useEffect(() => {
    const handleProjectUpdated = () => {
      fetchCards();
    };
    // kuuntele sokettia ja päivitä kortit 
    socket.on("project:updated", handleProjectUpdated);
    // cleanup
    return () => {
      socket.off("project:updated", handleProjectUpdated);
    };
  }, [fetchCards]);

  return (
    <div className="container">
      <div className="cards-container">
        {listData.map((item, index) => (
          <CardDemo key={index} item={item} />
        ))}
         <AddNewCardButton />
      </div>
     
    </div>
  );
};

export default CardList;
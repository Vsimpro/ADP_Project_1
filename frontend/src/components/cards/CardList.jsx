import React, { useState, useEffect } from 'react';
import CardDemo from './CardDemo';
import { useFetchCards } from '../../hooks/useFetchCards.js';
import socket from '../../controller/socket.js';
import AddNewCardButton from '../createTools/AddNewCardButton';
import { useParams } from 'react-router-dom';

const CardList = ({ userId, HOST, PORT }) => {
  const [listData, setListData] = useState([]);
  const { projectId } = useParams();

  const fetchCards = useFetchCards(true, projectId, setListData, HOST, PORT);
  

  useEffect(() => {
    socket.emit('join', projectId);
    const handleProjectUpdated = () => {
      fetchCards();
    };
    // kuuntele sokettia ja päivitä kortit 
    socket.on("project:updated", handleProjectUpdated);
    // cleanup
    return () => {
      socket.off("project:updated", handleProjectUpdated);
    };
  }, [fetchCards, projectId]);

  return (
    <div className="container">
      <div className="cards-container">
        {listData.map((item, index) => (
          <CardDemo key={index} item={item} HOST={HOST} PORT={PORT}/>
        ))}
      </div>
        <AddNewCardButton HOST={HOST} PORT={PORT} />
    </div>
  );
};

export default CardList;
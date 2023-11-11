import React, { useState } from 'react';
import CardDemo from './CardDemo';
import { useFetchCards } from '../../hooks/useFetchCards.js';

const CardList = ({ userId, HOST, PORT }) => {
  const [listData, setListData] = useState([]);

  useFetchCards(true, userId, setListData, HOST, PORT);

  return (
    <div className="container">
      <div userId="cards-container">
        {listData.map((item, index) => (
          <CardDemo key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
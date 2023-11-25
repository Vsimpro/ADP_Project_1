import { useEffect, useCallback } from 'react';
import axios from 'axios';

export const useFetchCards = (isLoggedIn, userId, setListData, HOST, PORT) => {
  const fetchCards = useCallback(() => {
    if (isLoggedIn) {
      axios.get(`http://${HOST}:${PORT}/card/get-all-cards/${JSON.parse(userId)}`)
        .then((response) => {
          console.log(response.data);
          setListData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn, userId, setListData, HOST, PORT]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return fetchCards;
};
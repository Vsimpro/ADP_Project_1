import { useEffect, useCallback } from 'react';

export const useFetchCards = (isLoggedIn, userId, setListData, HOST, PORT) => {
  const fetchCards = useCallback(() => {
    if (isLoggedIn) {
      fetch(`http://${HOST}:${PORT}/card/get-all-cards/${JSON.parse(userId)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setListData(data);
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
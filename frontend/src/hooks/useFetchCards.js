import { useEffect } from "react";

export const useFetchCards = (isLoggedIn, userId, setListData, HOST, PORT) => {
useEffect(() => {
    if (isLoggedIn) {
      // tämä hakee datan tietokannasta
      // tämän saa poistaa/muokata/ tehdä mitä vaan
      // eetun aivopieruilua
      fetch(`http://${HOST}:${PORT}/card/get-all-cards/${JSON.parse(userId)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Käsittelee vastauksen JSON-muodossa
        })
        .then((data) => {
          console.log(data);
          setListData(data);
        })
        .catch((error) => {
          console.log(error);
        });
      // tähän lopppuu aivopieruilut
    }
  }, [isLoggedIn, userId, setListData, HOST, PORT]);
};
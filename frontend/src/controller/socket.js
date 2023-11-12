import { io } from "socket.io-client";

const socket = io("http://localhost:8123"); // TODO: Change to use .env??


//TODO: kaikki projektit johon käyttäjä kuuluu 
// => joinaa projectId:llä socket.io roomiin
// kuuntele niissä huoneissa "project:updated" eventtiä
// => käske hakemaan databasesta päivitetty tieto
// ??? millä tasolla uusi tieto haetaan Projekti => Kortti => Taski???
socket.on("connect", () => {
  console.log("Socket id: " + socket.id + " Connected: " + socket.connected);
});

socket.on("disconnet", () => {
  console.log("Socket disconnected");
});
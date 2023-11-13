import { io } from "socket.io-client";

const socket = io("http://localhost:8123"); // TODO: Change to use .env??

export default socket;
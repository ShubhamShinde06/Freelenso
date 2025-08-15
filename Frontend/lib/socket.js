// src/lib/socket.js

import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io("https://freelenso-backend.onrender.com", {
      withCredentials: true,
    });
  }
  return socket;
};

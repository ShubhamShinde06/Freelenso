// src/lib/socket.js

import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8000", {
      withCredentials: true,
    });
  }
  return socket;
};

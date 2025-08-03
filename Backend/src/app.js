import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_ADMIN_URL],
  })
);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

global._io = io;

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

import userRouter from "./routes/user.routes.js";
app.use("/api/auth", userRouter);

import clientRouter from "./routes/userClient.route.js";
app.use("/api/client", clientRouter);

export { app, server };

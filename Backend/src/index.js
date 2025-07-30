import { server } from "./app.js";
import connectDB from './db/index.db.js'
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is running at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Sorry not working", error);
  });
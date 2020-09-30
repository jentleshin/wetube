import dotenv from "dotenv";
import "./db";
import app from "./app";
dotenv.config();
import "./models/Video";

const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`Listening on https://localhost:${PORT}`);

app.listen(PORT, handleListening);

const express = require("express");
const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`listening on ${PORT}`);
};

app.listen(PORT, handleListening);

const express = require("express");
const socket = require("socket.io");

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(PORT, () => console.log("server strting in port 4000"));

const io = socket.listen(app);

io.on("connection", socket => {
  console.log("user connected");
  console.log(socket.id);
  socket.on("disconnect", () => console.log("user disconnected"));
});

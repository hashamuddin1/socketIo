const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const port = process.env.PORT;
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    io.emit('disconnect-user','Someone is disconnected')
    console.log("user disconnected");
  });
  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
    console.log("message: " + msg);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});

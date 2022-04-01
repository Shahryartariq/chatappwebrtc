require("dotenv").config();
const express = require("express");
const socket = require("socket.io");

var app = express();

const port = process.env.PORT || 4000;

var server = app.listen(port, function () {
  console.log(`server is running on port ${port}`);
});

app.use(express.static("public"));

var upgradedServer = socket(server);

upgradedServer.on("connection", function (socket) {
  socket.on("sendingMessage", function (data) {
    upgradedServer.emit("broadcastMessage", data);
  });

  console.log("Websocket Connected", socket.id);
});

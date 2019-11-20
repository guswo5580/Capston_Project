const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//npm i socket.io
server.listen(3000);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "index.html");
});

// 웹 프론트에서 emit 신호 보낸 것을 읽어서 app으로 전달
io.on("connection", socket => {
  socket.on("update", () => {
    console.log("update");
    io.emit("update");
  });
});

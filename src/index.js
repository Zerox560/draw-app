const path = require("path");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const sockets = require("./sockets");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.sendFile("index.html"));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sockets.listen(io);

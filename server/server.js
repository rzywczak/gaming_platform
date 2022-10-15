const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../client");

app.use(express.static(publicDirectoryPath));

// io.on("connection", (socket) => {
//     console.log("WebSocket connection");
// })

app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree"]})
})




server.listen(port,() => {
    console.log("Working on port " + port);
  });
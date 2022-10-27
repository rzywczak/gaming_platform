const path = require("path");
const http = require("http");
const cors = require("cors");
const express = require("express");
// const socketIO = require("socket.io");
const mongooseConnection = require("./Mongoose/mongoose")
const history = require('connect-history-api-fallback');
const userRouter = require('./Routes/User')
const roomRouter = require('./Routes/Room')
const socketServer = require('./Routes/Socket')


const app = express();
const server = http.createServer(app);
const io = socketServer(server);

require('dotenv').config();
mongooseConnection()

const port = process.env.PORT || 5000;
// const publicDirectoryPath = path.join(__dirname, "../client/build");
const publicDirectoryPath = path.join(__dirname, "/public");

const corsOptions ={
  origin: ['http://localhost:3000', 'http://localhost:5000', 'https://platforma-rozrywkowa.herokuapp.com', ''],
  methods: ["GET", "POST", "DELETE", "PUT", "UPDATE"],
  credentials: true,
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(userRouter)
app.use(roomRouter)
// app.use(socketRouter)
app.use(history())
app.use(express.static(publicDirectoryPath));


server.listen(port,() => {
    console.log("Working on port " + port);
  });
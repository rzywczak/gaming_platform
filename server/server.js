const path = require("path");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const authRoutes = require("./Routes/AuthRoutes");
const userRouter = require('./Routes/User')
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");
const { application } = require("express");

const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "../client");


const corsOptions ={
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT", "UPDATE"],
  credentials: true,
}
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(userRouter)
// app.use('/', authRoutes)
app.use(express.static(publicDirectoryPath));

const server = http.createServer(app);
const io = socketIO(server);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });









// io.on("connection", (socket) => {
//     console.log("WebSocket connection");


// });

// app.get('/api', (req, res) => {
//     res.json({ "users": ["userOne", "userTwo",  "userThree"]})
// })




server.listen(port,() => {
    console.log("Working on port " + port);
  });
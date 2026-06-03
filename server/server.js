const path = require("path");
const http = require("http");
const cors = require("cors");
const express = require("express");
const history = require("connect-history-api-fallback");
require("dotenv").config();
const mongooseConnection = require("./Mongoose/mongoose");
const userRouter = require("./Routes/User");
const roomRouter = require("./Routes/Room");
const socketServer = require("./Routes/Socket");

const app = express();
const server = http.createServer(app);

const defaultOrigins = ["http://localhost:3000", "http://localhost:5000"];
const allowedOrigins = (process.env.CORS_ORIGINS || defaultOrigins.join(","))
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

socketServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
mongooseConnection();

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "/public");

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(history());
app.use(express.static(publicDirectoryPath));

server.listen(port, () => {
  console.log("Working on port " + port);
});

module.exports = server

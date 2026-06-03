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
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [
  ...defaultOrigins,
  ...configuredOrigins,
  process.env.RENDER_EXTERNAL_URL,
].filter(Boolean);
const hasConfiguredOrigins = configuredOrigins.length > 0 || Boolean(process.env.RENDER_EXTERNAL_URL);

const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin) || !hasConfiguredOrigins) {
    return callback(null, true);
  }

  return callback(null, false);
};

socketServer(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
mongooseConnection();

const port = process.env.PORT || 5000;
const publicDirectoryPath = path.join(__dirname, "/public");

const corsOptions = {
  origin: corsOrigin,
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

const express = require("express");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const helmet = require("helmet");
const cors = require("cors");
const errHandler = require("./errHandler");

// import routers
const authRouter = require("../routers/auth/auth-router");
const usersRouter = require("../routers/users-router");

// middleware
const restricted = require("../middleware/restricted");

const server = express();

const sessionConfig = {
  name: "specialcookie",
  secret: "lol, you thought I'd tell you",
  cookie: {
    // shelf life of cookie 
    maxAge: 60 * 60 * 1000,
    // for https
    secure: false,
    // this cookie is hidden
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    knex: require("../data/db-config"),
    table: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 60 * 60 * 1000
  })
}

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

// add routes
server.use("/api/users", restricted, usersRouter);
server.use("/api/auth", authRouter);


server.get("/", (req, res) => {
  res.json({
    api: "up and running"
  });
});

server.use(errHandler);


module.exports = server;
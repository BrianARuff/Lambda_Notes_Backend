const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

// pull in express session
const session = require("express-session");
// pull in session config
const { sessionConfig } = require("./authentication/session");

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(morgan("dev"));
  server.use(cors());
  server.use(session(sessionConfig));
};

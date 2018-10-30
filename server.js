const express = require("express");

// init server
const server = express();

// pull in middleware file
const middleware = require("./middleware");

// init middlware on server
middleware(server);

// pull in routes
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
server.use("/api/notes", noteRoutes);
server.use("/api/users", userRoutes);

// export server
module.exports = server;

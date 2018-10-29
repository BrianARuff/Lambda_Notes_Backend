const express = require('express');

// init server
const server = express();

// pull in middleware file
const middleware = require('./middleware');

// init middlware on server
middleware(server);

// pull in routes
const noteRoutes = require('./routes/noteRoutes');
server.use('/api/notes', noteRoutes);

module.exports = server;
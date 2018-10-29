const express = require('express');

// init server
const server = express();

// pull in middleware file
const middleware = require('./middleware');

// init middlware on server
middleware(server);

// pull in database
const db = require('./database');

module.exports = server;
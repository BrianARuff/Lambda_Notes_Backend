require('dotenv').config(); // loads .env configuration

const server = require("./server"); // get server routes & middlware

// set port number for port to listen on
const port = process.env.PORT || 9000;

// init listener
server.listen(port, () => console.log(`\n*** API running port: ${port}, name: ${process.env.DB_NAME}, user: ${process.env.DB_USER}, password: ${process.env.DB_PASS}, db: ${process.env.DB}\n`));
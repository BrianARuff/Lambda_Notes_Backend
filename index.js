require("dotenv").config(); // loads .env configuration

const server = require("./server"); // get server routes & middlware

// set port number for port to listen on
const port = process.env.PORT || 9000;

const instance = server.listen(port, () =>
  console.log(`\n=== Server Runnning on port: ${instance.address().port} ===\n`)
);

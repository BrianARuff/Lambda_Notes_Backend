// get server routes & middlware
const server = require("./server");

// set port number for port to listen on
const port = 9000;

// init listener
server.listen(port, () => console.log(`\n*** API running port: ${port}\n`));

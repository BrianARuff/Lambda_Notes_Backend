// get server routes & middlware
const server = require("./server");

// set/get port number for port to listen on
const port = process.env.PORT || 9000;

// init listener
server.listen(port, () => console.log(`\n*** API running port: ${port}\n`));

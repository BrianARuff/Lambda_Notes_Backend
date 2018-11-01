require("dotenv").config(); // loads .env configuration

const server = require("./server"); // get server routes & middlware

server.listen(process.env.PORT, () => console.log(`\nAPI running on ${process.env.PORT}\n`))
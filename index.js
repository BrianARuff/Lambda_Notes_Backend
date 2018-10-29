const port = process.env.PORT || 9000;
const server = require("./server");
server.listen(port, () => `\n*** API Running On Port: ${port}\n`);

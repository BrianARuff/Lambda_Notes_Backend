require("dotenv").config(); // access to .env file K/V pairs...
const dbEngine = process.env.DB || "development";
const config = require("./knexfile.js")[dbEngine];
console.log(`ENV: ${dbEngine}`);
module.exports = require("knex")(config);

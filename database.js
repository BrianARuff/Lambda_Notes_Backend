const dbEngine = process.env.DB || "development";
const knex = require("knex");
const knexConfig = require("./knexfile")[dbEngine];

module.exports = knex(knexConfig);

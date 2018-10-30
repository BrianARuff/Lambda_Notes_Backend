exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
    t.increments();
    t.string("username", 128)
      .notNullable()
      .unique();
    t.string("password").notNullable();
    t.string("email")
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};

exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", t => {
    t.increments();
    t.text("tags");
    t.string("title", 128).notNullable();
    t.string("textBody", 1500)
      .notNullable()
      .unique();
    t.boolean("__v").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};

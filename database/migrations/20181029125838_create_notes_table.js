exports.up = function(knex, Promise) {
  return knex.schema.createTable("notes", t => {
    t.increments();
    t.text("tags");
    t.string("title", 128).notNullable();
    t.string("textBody", 1500)
      .notNullable()
      .unique();
    t.boolean("__v")
      .notNullable()
      .defaultTo(0);
    t.datetime("created_at").defaultTo(knex.fn.now());
    t.datetime("updated_at").defaultTo(knex.fn.now());
    t.integer("user_id").unsigned();
    t.foreign("user_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("notes");
};

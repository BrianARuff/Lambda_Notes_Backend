exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "brff19", password: "password", email: "brff19@gmail.com" },
        {
          username: "testUserOne",
          password: "password",
          email: "testUserOne@gmail.com"
        },
        {
          username: "testUserTwo",
          password: "password",
          email: "testUserTwo@gmail.com"
        }
      ]);
    });
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          tags: JSON.stringify(["good", "bad", "ugly"]),
          title: "The Good, the Bad and the Ugly",
          textBody: `The Good, the Bad and the Ugly (Italian: Il buono, il brutto, il cattivo, lit. "The good, the ugly, the bad") is a 1966 Italian epic Spaghetti Western film directed by Sergio Leone and starring Clint Eastwood, Lee Van Cleef, and Eli Wallach in their respective title roles.[8] Its screenplay was written by Age & Scarpelli, Luciano Vincenzoni and Leone (with additional screenplay material and dialogue provided by an uncredited Sergio Donati),[9] based on a story by Vincenzoni and Leone. Director of photography Tonino Delli Colli was responsible for the film's sweeping widescreen cinematography, and Ennio Morricone composed the film's score including its main theme. It is an Italian-led production with co-producers in Spain, West Germany and the United States.`,
          user_id: 1
        },
        {
          tags: JSON.stringify(["children's books", "fantasy novels", "top-selling books"]),
          title: "Harry Potter and the Philosopher's Stone",
          textBody:
            "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to the Hogwarts School of Witchcraft and Wizardry. Harry makes close friends and a few enemies during his first year at the school, and with the help of his friends, Harry faces an attempted comeback by the dark wizard Lord Voldemort, who killed Harry's parents, but failed to kill Harry when he was just 15 months old.",
            user_id: 1,
        },
        {
          tags: JSON.stringify(["fantasy", "up and coming", "patrick rothfuss"]),
          title: "The Name of the Wind",
          textBody:
            "The Name of the Wind, also called The Kingkiller Chronicle: Day One, is a fantasy novel written by American author Patrick Rothfuss. It is the first book in a series called The Kingkiller Chronicle and followed by The Wise Man's Fear. It was published on March 27, 2007 by DAW Books.",
          user_id: 2,
        }
      ]);
    });
};

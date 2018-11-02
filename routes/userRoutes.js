require("dotenv").config();
// init router
const router = require("express").Router();

// pull in database
const db = require("../database");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    ...user
  };
  const secret = process.env.JWT_KEY;
  const options = {
    expiresIn: "1h"
  };
  if (!user || !secret) {
    return res.status(500).json({ message: "Gen Err Token" });
  }
  return jwt.sign(payload, secret, options);
}

router.post("/register", (req, res) => {
  // pull out user register info from req body
  let { username, email, password } = req.body;

  // register error handling
  const errArr = [];
  if (!username) errArr.push("Missing Username");
  if (!email) errArr.push("Missing Emai");
  if (!password) errArr.push("Missing Password");

  // return 404 user error with error messages for easy to display error messages for front-end development
  if (errArr.length > 0) return res.status(404).json({ message: errArr });

  // encrypt password
  password = bcrypt.hashSync(password, 16);

  //set user object after encryption of psw
  const user = { username, email, password };

  // access users table in database and register user
  db("users")
    .insert(user)
    .then(count => {
      // gen token
      const token = generateToken(user);

      // set cookie to token
      req.session.cookie.token = token;

      // return success status with info the FED can use
      return res.status(200).json({
        message: "User registered",
        count: count[0],
        user: { username, email, id: user.id },
        token: token
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Internal Server Error", error: { ...err } })
    );
});

router.post("/login", (req, res) => {
  // get user data from req body
  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  //access users database
  db("users")
    .where({ email }) // compare where email matches
    .first()
    .then(user => {
      if (!user) {
        res.status(404).json({ message: "Login not successful" });
      }
      // if user exists and user password is the same as hash then login user
      if (user && bcrypt.compareSync(password, user.password)) {
        // generate token
        const token = generateToken(user);
        // set session to token in cookies
        req.session.cookie.token = token;
        // return user logged in successful along with token and user details for FEDs.
        return res.status(200).json({
          message: "User logged in",
          token: token,
          user: { username: user.username, email, id: user.id }
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: { ...err } });
    });
});

router.get("/mailingList", (req, res) => {
  db.select("username", "email", "id")
    .from("users")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(err));
});

router.get("/:id/notes", (req, res) => {
  const { id } = req.params;
  db.raw(
    `SELECT * FROM users JOIN notes ON users.id = notes.user_id WHERE notes.user_id = ${id}`
  )
    .then(notes => res.status(200).json(notes.rows))
    .catch(err =>
      res.status(500).json({ message: "Error Getting Notes for User", err })
    );
});

module.exports = router;

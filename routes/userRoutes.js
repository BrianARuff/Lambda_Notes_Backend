// init router
const router = require("express").Router();

// pull in database
const db = require("../database");

const bcrypt = require("bcryptjs");
const { generateToken } = require("../authentication/session");

router.post("/register", (req, res) => {
  // pull out user register info from req body
  let { username, email, password } = req.body;

  // register error handling
  const errArr = [];
  if (!username) errArr.push("Missing Username");
  if (!email) errArr.push("Missing Emai");
  if (!password) errArr.push("Missing Password");

  // return 404 user error with error messages for easy to display error messages for front-end development
  if (errArr.length > 0) res.status(404).json({ message: errArr });

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
        user: { username, email },
        token: token
      });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Internal Server Error", error: { ...err } })
    );
});

router.get("/mailingList", (req, res) => {
  db.raw("SELECT email, username FROM users")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(err));
});

module.exports = router;

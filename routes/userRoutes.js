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

router.post("/login", (req, res) => {
  // get user data from req body
  const { email, password } = req.body;

  //access users database
  db("users")
    .where({ email }) // compare where email matches
    .first()
    .then(user => {
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
          user: { username: user.username, email }
        });
      }
    });
});

router.get("/mailingList", (req, res) => {
  db.raw("SELECT email, username FROM users")
    .then(users => res.status(200).json(users))
    .catch(err => res.status(err));
});

module.exports = router;

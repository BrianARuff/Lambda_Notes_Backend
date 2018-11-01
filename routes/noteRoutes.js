require('dotenv').config();
// init router
const router = require("express").Router();

// pull in database
const db = require("../database");

const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.get("Authorization");
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(404).json({
          error: { ...err },
          message: "Invalid Token"
        });
      }
      req.decoded = decodedToken;
      next();
    });
  } else {
    return res.status(404).json({ error: "No token provided" });
  }
}

// setup route handlers
router.get("/", authenticate, (req, res) => {
  db.select("*")
    .from("notes")
    .then(notes => {
      if (!notes || notes.length < 1) {
        return res.status(204).json({ message: "No notes found" });
      } else {
        return res.status(200).json({ message: "Notes found", notes });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: "Internal Server Error", error: { ...err } })
    );
});

router.post("/", (req, res) => {
  const { tags, title, textBody, __v, user_id } = req.body;
  const note = { tags, title, textBody, __v, user_id };
  db.insert(note)
    .into("notes")
    .then(count => res.status(201).json({ message: "Posted Note", count, note }))
    .catch(err =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("notes")
    .where({ id })
    .first()
    .del()
    .then(bool => {
      if (bool) {
        res.status(200).json({ message: "Deleted Note", bool });
      } else {
        res.status(401).json({ message: "Note was not deleted", bool });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { tags, title, textBody, __v, user_id } = req.body;
  const note = { tags, title, textBody, __v, user_id };
  db("notes")
    .where({ id })
    .first()
    .update(note)
    .then(count => {
      if (!count || !id) {
        res.status(401).json({ message: "Note not updated", count });
      } else {
        res.status(200).json({ message: "Note updated", count });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

// export router
module.exports = router;

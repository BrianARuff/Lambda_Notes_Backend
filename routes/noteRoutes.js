// init router
const router = require("express").Router();

// pull in database
const db = require("../database");

// pull in authentication middlware
const {authenticate} = require("../authentication/session");

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
  const { tags, title, textBody, __v } = req.body;
  const note = { tags, title, textBody, __v };
  db.insert(note)
    .into("notes")
    .then(count => res.status(201).json({ message: "Posted Note", count }))
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
  const { tags, title, textBody } = req.body;
  const note = { tags, title, textBody };
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

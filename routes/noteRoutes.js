// init router
const router = require("express").Router();

// pull in database
const db = require("../database");

// setup route handlers
router.get("/", (req, res) => {
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
    .then(count => res.status(200).json({ message: "Posted Noted", count }))
    .catch(err =>
      res.status(500).json({ message: "Internal Server Error", err })
    );
});

// export router
module.exports = router;

const express = require("express");
const Note = require("../../models/Note");
const User = require("../../models/User");

const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/", auth, (req, res) => {
  const { title, text, dateModified, is_New } = req.body;
  const userId = req.user._id;

  const newNote = new Note({
    title,
    userId,
    text,
    dateModified,
    is_New,
  });
  //   Check if user is guest and set an expiration date if so:
  User.findById(userId)
    .then((user) => {
      if (!user.username) {
        newNote.expirationDate = new Date(Date.now() + 1000 * 3600);
      }
      newNote
        .save()
        .then((note) => {
          res.json(note);
        })
        .catch((err) => {
          res.status(400).json({ msg: "operation failed" });
        });
    })
    .catch((err) => {
      res.status(400).json({ msg: "User not found, guest users are removed" });
    });
});

router.get("/", auth, (req, res) => {
  const userId = req.user._id;
  if (!userId) res.status(401).json({ msg: "no token" });
  Note.find({ userId: userId })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.json({ msg: "could not fetch notes" });
    });
});

router.delete("/:id", auth, (req, res) => {
  Note.findById(req.params.id)
    .then((note) => {
      note.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

router.patch("/:id", auth, (req, res) => {
  Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      res.status(400).json({ msg: "opertaion failed" });
    });
});

module.exports = router;

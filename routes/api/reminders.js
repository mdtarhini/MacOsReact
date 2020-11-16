const express = require("express");
const Reminder = require("../../models/Reminder");
const RemindersList = require("../../models/RemindersList");
const User = require("../../models/User");

const router = express.Router();
const auth = require("../middlewares/auth");

// a simple / since we are already in the route sent by the server.js
router.post("/reminders", auth, (req, res) => {
  const { title, description, date, completed, parentList } = req.body;
  const userId = req.user._id;
  if (!title || !userId) {
    return res.status(400).json({ msg: "Some required fields are missing" });
  }
  const newReminder = new Reminder({
    title,
    userId,
    description,
    date,
    completed,
    parentList,
  });
  //   Check if user is guest and set an expiration date if so:
  User.findById(userId)
    .then((user) => {
      if (!user.username) {
        newReminder.expirationDate = new Date(Date.now() + 1000 * 3600);
      }
      newReminder
        .save()
        .then((reminder) => {
          res.json(reminder);
        })
        .catch((err) => {
          res.status(400).json({ msg: "operation failed" });
        });
    })
    .catch((err) => {
      res.status(400).json({ msg: "User not found, guest users are removed" });
    });
});

router.post("/lists", auth, (req, res) => {
  const { name, color } = req.body;
  const userId = req.user._id;
  if (!name || !color || !userId) {
    return res.status(400).json({ msg: "Some required fields are missing" });
  }
  const newList = new RemindersList({
    name,
    userId,
    color,
  });
  //   Check if user is guest and set an expiration date if so:
  User.findById(userId)
    .then((user) => {
      if (!user.username) {
        newList.expirationDate = new Date(Date.now() + 1000 * 3600);
      }

      newList
        .save()
        .then((list) => {
          res.json(list);
        })
        .catch((err) => {
          res.status(400).json({ msg: "operation failed" });
        });
    })
    .catch((err) => {
      res.status(400).json({ msg: "User not found, guest users are removed" });
    });
});

router.get("/reminders", auth, (req, res) => {
  const userId = req.user._id;
  if (!userId) res.status(401).json({ msg: "no token" });
  Reminder.find({ userId: userId })
    .then((reminders) => {
      res.json(reminders);
    })
    .catch((err) => {
      res.json({ msg: "could not find any reminder" });
    });
});
router.get("/lists", auth, (req, res) => {
  const userId = req.user._id;
  if (!userId) res.status(401).json({ msg: "no token" });
  RemindersList.find({ userId: userId })
    .then((lists) => {
      res.json(lists);
    })
    .catch((err) => {
      res.json({ msg: "could not find any list" });
    });
});

router.delete("/lists/:id", auth, (req, res) => {
  RemindersList.findById(req.params.id)
    .then((list) => {
      list.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

router.patch("/lists/:id", auth, (req, res) => {
  RemindersList.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((list) => {
      res.json(list);
    })
    .catch((err) => {
      res.status(400).json({ msg: "opertaion failed" });
    });
});

router.delete("/reminders/:id", auth, (req, res) => {
  Reminder.findById(req.params.id)
    .then((reminder) => {
      reminder.remove().then(() => res.json({ success: true }));
    })
    .catch((err) => {
      res.status(404).json({ success: false });
    });
});

router.patch("/reminders/:id", auth, (req, res) => {
  Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((reminder) => {
      res.json(reminder);
    })
    .catch((err) => {
      res.status(400).json({ msg: "opertaion failed" });
    });
});

module.exports = router;

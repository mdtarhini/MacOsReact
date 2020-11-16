const express = require("express");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

router.post("/addguest", (req, res) => {
  const newUser = new User({
    name: "guest",
  });

  newUser.expirationDate = new Date(Date.now() + 3600 * 1000);

  newUser.save().then((user) => {
    jwt.sign(
      { _id: user._id },
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({
          user: { _id: user._id, name: user.name },
          token,
        });
      }
    );
  });
});

// a simple / since we are already in the route sent by the server.js
router.post("/signup", (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //   check for existing users:
  User.findOne({ username }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const newUser = new User({
      name,
      username,
      password,
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign({ _id: user._id }, process.env.jwtSecret, (err, token) => {
            if (err) throw err;
            res.json({
              user: {
                _id: user._id,
                name: user.name,
                username: user.username,
              },
              token,
            });
          });
        });
      });
    });
  });
});

// @route   POST api/signin
// @desc    Auth the user
// @access  public

// a simple / since we are already in the route sent by the server.js
router.post("/signin", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields for signin" });
  }
  //   check if user exists:
  User.findOne({ username }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exists" });
    }

    // validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });
      jwt.sign({ _id: user._id }, process.env.jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({
          user: { _id: user._id, name: user.name, username: user.username },
          token,
        });
      });
    });
  });
});

router.patch("/user/:what", auth, (req, res) => {
  if (req.params.what === "addContact") {
    let newContact = req.body;
    // check if the contact exist as another user:
    let findBy = newContact._id
      ? { _id: newContact._id }
      : { username: newContact.username };
    User.findOne(findBy)
      .then((contact) => {
        User.findById(req.user._id)
          .then((user) => {
            user.contacts = {
              ...user.contacts,
              [contact._id]: newContact.name,
            };
            user.save().then((updatedUser) => res.json(updatedUser));
          })
          .catch((err) => {
            res.status(400).json({ msg: "opertaion failed" });
          });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ msg: "user not found! New contact cannot be added" });
      });
  } else if (req.params.what === "deleteContact") {
    let contactToBeDeleted = req.body;
    User.findById(req.user._id)
      .then((user) => {
        user.contacts = _.omit(user.contacts, contactToBeDeleted._id);
        user.save().then((updatedUser) => res.json(user));
      })
      .catch((err) => {
        res.status(400).json({ msg: "opertaion failed" });
      });
  } else if (req.params.what === "editName") {
    User.findById(req.user._id)
      .then((user) => {
        user.name = req.body.name;
        user
          .save()
          .then((updatedUser) => res.json(updatedUser))
          .catch((err) => {
            res.status(400).json({ msg: "opertaion failed" });
          });
      })
      .catch((err) => {
        res.status(400).json({ msg: "opertaion failed" });
      });
  }
});

// @route GET api/auth/user
// #desc GET user data
// private
// We need this to constantly verify the used in react
router.get("/user", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password") //do not return the password
    .then((user) => {
      if (!user) res.status(404).json({ msg: "user was not found" });
      res.json({ user });
    })
    .catch((err) => {
      res.status(404).json({ msg: "user was not found" });
    });
});
module.exports = router;

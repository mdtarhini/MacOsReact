const express = require("express");
const Message = require("../../models/Message");

const router = express.Router();
const auth = require("../middlewares/auth");

router.get("/", auth, (req, res) => {
  const userId = req.user._id;
  if (!userId) res.status(401).json({ msg: "no token" });
  Message.find({
    $and: [
      { $or: [{ from: userId }, { to: userId }] },
      { deletedFor: { $ne: userId } },
    ],
  })
    .then((msgs) => {
      res.json(msgs);
    })
    .catch((err) => {
      res.json({ msg: "could not fetch messages" });
    });
});

router.patch("/:what/:which", auth, (req, res) => {
  const userId = req.user._id;
  if (req.params.what === "saw") {
    const senderId = req.params.which;
    Message.updateMany(
      { to: userId, from: senderId, isSeen: false },
      { isSeen: true }
    )
      .then((seen) => {
        if (seen.nModified > 0) {
          Message.find({ to: userId, from: senderId })
            .then((msgs) => {
              res.json(msgs);
            })
            .catch((err) => {
              res.json({ msg: "an error occured while updating messages" });
            });
        } else {
          res.json([]);
        }
      })
      .catch((err) => {
        res.json({ msg: "could not update messages" });
      });
  } else if (req.params.what === "deleteChat") {
    const contactId = req.params.which;
    Message.updateMany(
      {
        $and: [
          { deletedFor: { $ne: userId } },
          {
            $or: [
              { $and: [{ from: userId }, { to: contactId }] },
              { $and: [{ to: userId }, { from: contactId }] },
            ],
          },
        ],
      },
      { $push: { deletedFor: userId } }
    )
      .then(() => {
        // Delete messages permanenltly if they are deleted for both users
        Message.deleteMany({
          $and: [
            { deletedFor: { $size: 2 } },
            {
              $or: [
                { $and: [{ from: userId }, { to: contactId }] },
                { $and: [{ to: userId }, { from: contactId }] },
              ],
            },
          ],
        }).then((result) => {
          console.log(result);
        });
      })
      .then((result) => {
        console.log(result);
        res.json({ msg: "success" });
      })
      .catch((err) => {
        res.status(400).json({ msg: "error while deleting chat" });
      });
  }
});

module.exports = router;

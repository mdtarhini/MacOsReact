const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const MessageSchema = new Schema(
  {
    text: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    sentAt: { type: Date, required: true },
    deletedFor: { type: Array, default: [] },
    isSeen: { type: Boolean, default: false },
    expirationDate: {
      type: Date,
      expires: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "messages",
  }
);

module.exports = Note = mongoose.model("message", MessageSchema);

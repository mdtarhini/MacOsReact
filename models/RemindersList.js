const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const RemindersListSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    userId: { type: String, required: true, unique: false },
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
    collection: "remindersLists",
  }
);

module.exports = RemindersList = mongoose.model(
  "remindersList",
  RemindersListSchema
);

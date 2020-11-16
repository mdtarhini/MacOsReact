const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const ReminderSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true, unique: false },
    description: { type: String, required: false },
    date: { type: Date, required: false },
    completed: { type: Boolean, default: false },
    parentList: { type: String, required: false },
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
    collection: "reminders",
  }
);

module.exports = User = mongoose.model("reminder", ReminderSchema);

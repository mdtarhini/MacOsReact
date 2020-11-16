const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema
const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: String, required: true, unique: false },
    dateModified: { type: Date, required: true },
    is_New: { type: Boolean, default: true },
    text: { type: Object, default: null },
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
    collection: "notes",
  }
);

module.exports = Note = mongoose.model("note", NoteSchema);

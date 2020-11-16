const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  name: { type: String },
  username: { type: String },
  password: { type: String },
  register_date: { type: Date, default: Date.now },
  contacts: { type: Object, default: {} },
  expirationDate: {
    type: Date,
    expires: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = User = mongoose.model("user", UserSchema);

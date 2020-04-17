var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  atm: String
});

module.exports = mongoose.model("User", UserSchema);

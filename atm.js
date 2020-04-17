var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  atm: String
});

module.exports = mongoose.model("User", UserSchema);

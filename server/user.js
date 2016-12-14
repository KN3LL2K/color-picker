var mongoose = require('mongoose');

userSchema = mongoose.Schema({
  //Hex color codes only!!
  username: String,
  password: String,
  email: String,
  likes: [],
  saved: [],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
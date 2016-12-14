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

// TODO
// change colorFamilySchema
  // incorporate primary, secondary, tertiary
  // add like count
  // add tags
  // add parent
  // add userid
// add userSchema
  // userid
  // username
  // email
  // liked colors
  // saved colors
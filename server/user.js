var mongoose = require('mongoose');

userSchema = mongoose.Schema({
  //Hex color codes only!!
  username: String,
  password: String,
  email: String,
  likes: [],
  saved: [],
});

var user = mongoose.model('User', userSchema);

user.methods.is = function(cb) {
  return this.model('Animal').find({ type: this.type }, cb);
};

module.exports = userSchema;

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
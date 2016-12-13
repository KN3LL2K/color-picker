var mongoose = require('mongoose');

colorFamilySchema = mongoose.Schema({
  //Hex color codes only!!
  primary: String,
  secondary1: String,
  secondary2: String,
  tertiary1: String,
  tertiary1: String,
  //Establish a baseline for copys/popularity
  copyCount: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  tags: [],
  userId: String,
  parent: {type: Number, default: null}
});

var ColorFamily = mongoose.model('ColorFamily', colorFamilySchema);

module.exports = ColorFamily;

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
var mongoose = require('mongoose');

colorFamilySchema = mongoose.Schema({
  //Hex color codes only!!
  name: { type: String, unique: true },
  colors: {
    primary: String,
    secondary1: String,
    secondary2: String,
    tertiary1: String,
    tertiary2: String
  },
  //Establish a baseline for copys/popularity
  copyCount: {type: Number, default: 0},
  likes: {type: Number, default: 0},
  tags: [{type: String}],
  userId: String,
  parent: {type: Number, default: null}
});

var ColorFamily = mongoose.model('ColorFamily', colorFamilySchema);

module.exports = ColorFamily;

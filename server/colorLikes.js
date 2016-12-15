var mongoose = require('mongoose');

colorLikesSchema = mongoose.Schema({
  colorId: {type: String, ref: 'ColorFamily'},
  userId: {type: String, ref: 'User'}
});

var ColorLikes = mongoose.model('ColorLikes', colorLikesSchema);

module.exports = ColorLikes;
var mongoose = require('mongoose');

colorLikesSchema = mongoose.Schema({
  colorId: String,
  userId: String
});

var ColorLikes = mongoose.model('ColorLikes', colorLikesSchema);

module.exports = ColorLikes;
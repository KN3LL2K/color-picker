var mongoose = require('mongoose');

colorSavesSchema = mongoose.Schema({
  colorId: String,
  userId: String
});

var ColorSaves = mongoose.model('ColorSaves', colorSavesSchema);

module.exports = ColorSaves;
var mongoose = require('mongoose');

colorFamilySchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    validate: {
      validator: function(v, cb) {
        ColorFamily.find({name: v}, function(err, docs) {  // eslint-disable-line no-use-before-define
          cb(docs.length === 0);
        });
      },
      message: 'Color name already exists'
    }
  },
  colors: {
    primary: String,
    secondary1: String,
    secondary2: String,
    tertiary1: String,
    tertiary2: String
  },
  //Establish a baseline for copys/popularity
  copyCount: {type: Number, default: 0},
  tags: [{type: String}],
  likes: {type: Number, default: 0},
  userId: {type: String, ref: 'User'},
  parent: {type: String, default: null},
});

var ColorFamily = mongoose.model('ColorFamily', colorFamilySchema);

module.exports = ColorFamily;

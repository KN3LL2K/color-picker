var mongoose = require('mongoose');

userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate: {
      validator: function(v, cb) {
        User.find({username: v}, function(err, docs) {
          cb(docs.length === 0);
        });
      },
      message: 'Color already exists'
    }
  },
  password: String,
  likes: [],
  saved: [],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
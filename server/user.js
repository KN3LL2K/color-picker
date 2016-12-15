var mongoose = require('mongoose');

userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    validate: {
      validator: function(v, cb) {
        User.find({username: v}, function(err, docs) { // eslint-disable-line no-use-before-define
          cb(docs.length === 0);
        });
      },
      message: 'Username already exists'
    }
  },
  password: String,
  // likes: [{type: String, ref: 'ColorFamily'}],
  // saved: [{type: String, ref: 'ColorFamily'}],
});

var User = mongoose.model('User', userSchema);

module.exports = User;
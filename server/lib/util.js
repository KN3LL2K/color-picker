var User = require('../user.js');
var bcrypt = require('bcrypt-nodejs');

exports.isAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

exports.isValidPassword = function(username, password, cb) {
  User.findOne({ username: username }, function (err, user) {
    bcrypt.compare(password, user.password, function() {
      cb(user);
    });
  });
};
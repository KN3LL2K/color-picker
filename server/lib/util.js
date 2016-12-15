var bcrypt = require('bcrypt-nodejs');

var ColorLikes = require('../colorLikes.js');
var User = require('../user.js');

exports.isAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};

exports.isValidPassword = function(username, password, cb) {
  User.findOne({ username: username }, function (err, user) {
    bcrypt.compare(password, user.password, function(err, res) {
      if ( err ) {
        cb(false);
      } else {
        cb(res);
      }
    });
  });
};

exports.getSingleColor = function(color, user) {
  color.isLiked = false;
  color.numLikes = 0;
  if ( user ) {
    ColorLikes.find({colorId: color._id, userId: user.id}).exec()
      .then(function(exists) {
        if ( exists ) {
          color.isLiked = true;
        }
      })
      .then( function() {
        ColorLikes.count({colorId: color._id}).exec()
          .then(function( err, likeCount) {
            color.likes = likeCount;
            return color;
          })
          .catch(function(err) {
            console.log('err in counting color likes', err);
            next(err);
          });
      })
      .catch(function(err) {
        console.log('err in checking to see if color is liked', err);
        next(err);
      });
  } else {
    ColorLikes.count({colorId: color._id}).exec()
      .then(function( err, likeCount) {
        color.numLikes = likeCount;
        console.log(color);
        next();
      })
      .catch(function(err) {
        console.log('err in counting color likes', err);
        next(err);
      });
  }
};
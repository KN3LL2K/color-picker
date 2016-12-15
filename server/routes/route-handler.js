var bcrypt = require('bcrypt-nodejs');
require('mongoose').Promise = Promise;

var util = require('../lib/util.js');
var color = require('../lib/colorHelpers.js');

var ColorFamily = require('../colorFamily.js');
var User = require('../user.js');
var ColorLikes = require('../colorLikes.js');
var ColorSaves = require('../colorSaves.js');

module.exports = {
  checkAuth: function(req, res) {
    res.redirect('/');
  },
  getColors: function(req, res, next) {
    ColorFamily.find({}).exec()
      .then(function(colorFamilies) {
        // check if user is logged in
          // iterate over colorFamilies and add isLiked property to ones that have been liked by user
        res.send(colorFamilies);
      })
      .catch(function(err) {
        console.log('err in getting colors', err);
        next(err);
      });
  },
  createColorSwatch: function(req, res) {
    var seed = req.body.seed;
    var swatches = {
      complementary: color.complementaryPalette(seed),
      splitComplementary: color.splitCPalette(seed),
      analagous: color.analagousPalette(seed),
      triad: color.triadPalette(seed),
      shades: color.shadesPalette(seed)
    };
    res.send(swatches);
  },
  saveColor: function(req, res, next) {
    var colorParent = null;
    if ( req.body.parent !== null ) {
      colorParent = req.body.parent;
    }
    new ColorFamily ({
      name: req.body.name,
      colors: {
        primary: req.body.colors.primary,
        secondary1: req.body.colors.secondary1,
        secondary2: req.body.colors.secondary2,
        tertiary1: req.body.colors.tertiary1,
        tertiary2: req.body.colors.tertiary2
      },
      userId: req.user._id,
      tags: req.body.tags,
      parent: colorParent,
    })
    .save()
    .then(res.sendStatus(201))
    .catch(function(err) {
      console.log('err in saveColor', err);
      next(err);
    });
  },
  updateColor: function(req, res, next) {
    var error = false;

    var isOk = /(^#[0-9A-F]{6}$)/i;
    //validate that form dawwwwg

    //loop through each key in req.body
      //if req.body[key] = (form validation)
    for (var key in req.body.color) {
      if (!req.body.color[key].match(isOk)) {
        error = true;
      }
      if (error) {
        res.send('error -- invalid hex code');
      }
    }

    if (!error) {
      ColorFamily.findOneAndUpdate({name: req.body.name}, req.body, {new: true}).exec()
        .then(function(doc) {
          console.log(doc);
          res.sendStatus(201);
        })
        .catch(function(err) {
          console.log('Something wrong when updating data!', err);
          next(err);
        });
    }
  },
  userLikeColor: function(req, res, next) {
    var colorId = req.params.colorId;
    var userId = req.user._id;

    ColorLikes.findOne({colorId: colorId, userId: userId}).exec()
      .then(function(isSaved) {
        if ( isSaved ) {
          ColorLikes.findOneAndRemove({colorId: colorId, userId: userId}).exec()
            .then(function(color) {
              console.log('relationship removed', color);
              ColorLikes.count({colorId: colorId}).exec()
                .then(function( err, count) {
                  res.end(count);
                })
                .catch(function(err) {
                  next(err);
                });
            })
            .catch(function(err) {
              console.log('err in saving colorlike', err);
              next(err);
            });
        } else {
          var newRelationship = new ColorLikes({colorId: colorId, userId: userId});
          newRelationship.save()
            .then(function (color) {
              console.log('new colorlike', color);
              ColorLikes.count({colorId: colorId}).exec()
                .then(function( err, count) {
                  res.end(count);
                })
                .catch(function(err) {
                  next(err);
                });
            })
            .catch(function(err) {
              console.log('err in saving colorlike', err);
              next(err);
            });
        }
      })
      .catch(function(err) {
        console.log('err in saving colorlikes', err);
        next(err);
      });
  },
  userSaveColor: function(req, res) {
    var colorId = req.params.colorId;
    var userId = req.user._id;

    ColorSaves.findOne({colorId: colorId, userId: userId}).exec()
      .then(function(isSaved) {
        if ( isSaved ) {
          ColorSaves.findOneAndRemove({colorId: colorId, userId: userId}).exec()
            .then(function(color) {
              console.log('relationship removed', color);
              res.end();
            })
            .catch(function(err) {
              console.log('err in saving colorsave', err);
              next(err);
            });
        } else {
          var newRelationship = new ColorSaves({colorId: colorId, userId: userId});
          newRelationship.save()
            .then(function (color) {
              console.log('new colorsave', color);
              res.end();
            })
            .catch(function(err) {
              console.log('err in saving colorsave', err);
              next(err);
            });
        }
      })
      .catch(function(err) {
        console.log('err in saving colorsave', err);
        next(err);
      });
  },
  getUsers: function(req, res, next) {
    User.find({}).exec()
    .then(function(users) {
      res.send(users);
    })
    .catch(function(err) {
      next(err);
    });
  },
  logIn: function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/');
  },
  logOut: function(req, res) {
    req.logout();
    res.redirect('/');
  },
  signUp: function(req, res, next) {
    var username = req.body.username;
    var plainText = req.body.password;
    bcrypt.hash(plainText, null, null, function(err, hash) {
      if (err) {
        next(err);
      }
      var newUser = new User({username: username, password: hash});
      newUser.save()
        .then(function () {
          res.redirect('/');
        })
        .catch(function(err) {
          console.log('err in save user', err);
          next(err);
        });
    });
  }
};

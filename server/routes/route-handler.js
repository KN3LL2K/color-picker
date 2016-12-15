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
    res.end(`Logged in as ${req.user.username}`);
  },
  getColors: function(req, res, next) {
    var sortCriteria = {};

    if ( req.query.sort === 'popular' ) {
      sortCriteria.likes = 'desc';
    }
    console.log(sortCriteria);
    // time complexity is horrid....
    ColorFamily.find({}).sort(sortCriteria).lean().exec()
      .then(function(colorFamilies) {
        if ( req.user ) {
          var userLikes = [];
          ColorLikes.find({userId: req.user._id}).populate('colorId').exec()
            .then(function(colorLikes) {
              colorLikes.forEach(function(like) {
                userLikes.push(JSON.stringify(like.colorId._id));
              });
              for ( var i = 0; i < colorFamilies.length; i++ ) {
                if ( userLikes.indexOf(JSON.stringify(colorFamilies[i]._id)) !== -1 ) {
                  colorFamilies[i].isLiked = true;
                } else {
                  colorFamilies[i].isLiked = false;
                }
              }
              res.send(colorFamilies);
            })
            .catch(function(err) {
              console.log('err in getting color likes', err);
              next(err);
            });
        } else {
          res.send(colorFamilies);
        }
      })
      .catch(function(err) {
        console.log('err in getting colors', err);
        next(err);
      });
  },
  // probably don't need this anymore, dump on cleanup
  // createColorSwatch: function(req, res) {
  //   var seed = req.body.seed;
  //   var swatches = {
  //     complementary: color.complementaryPalette(seed),
  //     splitComplementary: color.splitCPalette(seed),
  //     analagous: color.analagousPalette(seed),
  //     triad: color.triadPalette(seed),
  //     shades: color.shadesPalette(seed)
  //   };
  //   res.send(swatches);
  // },
  saveColor: function(req, res, next) {
    var colorParent = req.body.parent || null;
    var newColor = new ColorFamily ({
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
    });
    newColor.save()
      .then(function() {
        res.end('Color succesffully created');
      })
      .catch(function(err) {
        console.log('err in saveColor', err);
        res.status(409).send({
          message: err.errors.name.message
        });
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
        res.status(409).send({
          message: 'Colors need to be Hex values'
        });
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
          res.status(409).send({
            message: 'Unable to update color'
          });
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
                  console.log(colorId);
                  ColorFamily.findOneAndUpdate({ _id: colorId }, { $inc: { likes: -1 } })
                    .exec()
                    .catch(function(err) {
                      console.log('err in saving colorsave', err);
                      return next(err);
                    });
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
                  ColorFamily.findOneAndUpdate({ _id: colorId }, { $inc: { likes: 1 } })
                    .exec()
                    .catch(function(err) {
                      console.log('err in saving colorsave', err);
                      return next(err);
                    });
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
  userSaveColor: function(req, res, next) {
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
              return next(err);
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
      res.status(409).send({
        message: 'Unable to get users'
      });
    });
  },
  logIn: function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.end(`Logged in as ${req.user.username}`);
  },
  logOut: function(req, res) {
    req.logout();
    res.end('Logged out');
  },
  signUp: function(req, res, next) {
    var username = req.body.username;
    var plainText = req.body.password;
    bcrypt.hash(plainText, null, null, function(err, hash) {
      if (err) {
        res.status(409).send({
          message: 'failed to store password'
        });
      }
      var newUser = new User({username: username, password: hash});
      newUser.save()
        .then(function () {
          res.end('User succesffully signed up');
        })
        .catch(function(err) {
          console.log('err in user sign up user:', err);
          res.status(409).send({
            message: err.errors.username.message
          });
        });
    });
  },
  getUser: function(req, res, next) {
    var userId = req.params.userId;

    var output = {};

    User.findOne({_id: userId}).select('-password -__v').exec()
      .then(function(user) {
        output.info = user;
        ColorLikes.find({userId: userId}).populate({path: 'colorId', select: '-__v'}).exec()
          .then(function(likes) {
            output.userLikes = likes;
            ColorFamily.find({userId: userId}).select('-__v').exec()
              .then(function(colors) {
                output.swatches = colors;
                res.json(output);
              })
              .catch(function(err) {
                console.log('err in getting single color', err);
                next(err);
              });
          })
          .catch(function(err) {
            console.log('err in getting single color', err);
            next(err);
          });
      })
      .catch(function(err) {
        console.log('err in getting single color', err);
        next(err);
      });
  },
  getColor: function(req, res, next) {
    var colorId = req.params.colorId;

    ColorFamily.findOne({_id: colorId}).exec()
      .then(function(color) {
        res.json(color);
      })
      .catch(function(err) {
        console.log('err in getting single color', err);
        next(err);
      });
  }
};

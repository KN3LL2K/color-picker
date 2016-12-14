var util = require('../lib/util.js');
var color = require('../lib/colorHelpers.js');
var ColorFamily = require('../colorFamily.js');
var User = require('../user.js');

module.exports = {
  checkAuth: function(req, res) {
  },
  getColors: function(req, res) {
    ColorFamily.find(function(err, colorFamilies) {
      res.send(colorFamilies);
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
  saveColor: function(req, res) {
    ColorFamily.findOne({name: req.body.name}, function (err, user) {
      if ( !user ) {

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
        var colorParent = null;
        if ( req.body.parent !== null ) {
          colorParent = req.body.parent;
        }
        console.log(req.body);
        if (!error) {
          new ColorFamily ({
            name: req.body.name,
            colors: {
              primary: req.body.colors.primary,
              secondary1: req.body.colors.secondary1,
              secondary2: req.body.colors.secondary2,
              tertiary1: req.body.colors.tertiary1,
              tertiary2: req.body.colors.tertiary2
            },
            userId: req.body.userId,
            tags: req.body.tags,
            parent: colorParent,
          }).save()
          .then(res.sendStatus(201));
        }
      } else {
        res.end('color name exists');
      }
    });
  },
  updateColor: function() {
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
      ColorFamily.findOneAndUpdate({name: req.body.name}, req.body, {new: true}, function(err, doc) {
        if (err) {
          console.log('Something wrong when updating data!');
        }
        console.log(doc);
        res.sendStatus(201);
      });
    }

  },
  getUsers: function(req, res) {
    User.find({}, function(err, users) {
      res.send(users);
    });
  },
  logIn: function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/restricted');
  },
  signUp: function(req, res) {
    var username = req.body.username;
    var plainText = req.body.password;

    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        bcrypt.hash(plainText, null, null, function(err, hash) {
          if (err) {
            throw err;
          }
          var newUser = new User({username: username, password: hash});
          newUser.save(function (err) {
            if (err) {
              return handleError(err);
            }
            res.redirect('/');
          });
        });
      }
    });
  }
};

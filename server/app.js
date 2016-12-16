var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MLAB_URI || 'mongodb://localhost/colorPicker';
mongoose.connect(mongoURI);

var ColorFamily = require('./colorFamily.js');
var User = require('./user.js');

var util = require('./lib/util.js');

var route = require('./routes/route-handler.js');

app.use(express.static('client'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// PASSPORT MIDDLEWARE
app.use(session({secret: 'beanie boyz', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

//
// PASSPORT
//

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      util.isValidPassword(username, password, function(isMatch) {
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password'});
        }
      });
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// for testing right now
app.get('/checkAuth',
  util.isAuth,
  route.checkAuth
);

//
// API ROUTES
//

app.get('/api/colors', route.getColors);

app.post('/api/colors', util.isAuth, route.saveColor);

app.put('/api/colors', util.isAuth, route.updateColor);

app.get('/api/colors/:colorId', route.getColor);

app.post('/api/colors/:colorId/like', util.isAuth, route.userLikeColor);

app.post('/api/colors/:colorId/save', util.isAuth, route.userSaveColor);

// app.post('/api/colors/create', route.createColorSwatch);

app.get('/api/users/:userId', route.getUser);

//
// USER ROUTES
//

app.post('/login',
  function(req, res, next ) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.status(403).end(err);
      }
      if (!user) {
        return res.status(403).end(info.message);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    })(req, res, next);
  },
  route.logIn
);

app.get('/logout', route.logOut);

app.post('/signup', route.signUp);


//
// CLIENT ROUTES
//

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

//
// START SERVER
//

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Colorz.io listening on port ${3000}!`);
});

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
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
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

//
// CLIENT ROUTES
//

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/index.html'));
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

app.post('/api/colors', route.saveColor);

app.put('/api/colors', route.updateColor);

app.get('/api/users', route.getUsers);

//
// USER ROUTES
//

app.post('/login', passport.authenticate('local'), route.logIn);

app.post('/signup', route.signUp);

//
// START SERVER
//

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Colorz.io listening on port ${3000}!`);
});

// Seed data for new database if you just cloned the repo.

// var colorFamilies = [['#F3E9DC', '#C08552', '#5E3023', '#895737', '#DAB49D'], ['#000000', '#586F7C', '#B8DBD9', '#F4F4F9', '#04724D'], ['#2DE1FC', '#2AFC98', '#09E85E', '#16C172', '#214F4B'], ['#8EA604', '#F5BB00', '#EC9F05', '#D76A03', '#BF3100'], ['#9CFFFA', '#ACF39D', '#B0C592', '#A97C73', '#AF3E4D'],
//  ['#BEEF9E', '#A6C36F', '#828C51', '#335145', '#1E352F'], ['#C2C1C2', '#42213D', '#683257', '#BD4089', '#F51AA4'], ['#44AF69', '#F8333C', '#FCAB10', '#2B9EB3', '#DBD5B5'], ['#050517', '#CF5C36', '#EFC88B', '#F4E3B2', '#D3D5D7'], ['#D0E3CC', '#F7FFDD', '#FCFDAF', '#EFD780', '#DBA159'],
//  ['#DB2763', '#B0DB43', '#12EAEA', '#BCE7FD', '#C492B1'], ['#35524A', '#627C85', '#779CAB', '#A2E8DD', '#32DE8A'], ['#8A4F7D', '#887880', '#88A096', '#BBAB8B', '#EF8275'], ['#BD9391', '#ADBABD', '#91B7C7', '#6EB4D1', '#6CBEED'], ['#9CAFB7', '#ADB993', '#D0D38F', '#F6CA83', '#949D6A'],
//  ['#966B9D', '#C98686', '#F2B880', '#FFF4EC', '#E7CFBC'], ['#011627', '#FF3366', '#2EC4B6', '#F6F7F8', '#20A4F3'], ['#D8DCFF', '#AEADF0', '#C38D94', '#A76571', '#565676'], ['#1B1B3A', '#693668', '#A74482', '#F84AA7', '#FF3562'], ['#202A25', '#5F4BB6', '#86A5D9', '#26F0F1', '#C4EBC8']];

// for (var i = 0; i < colorFamilies.length; i++) {
//   var currentFamily = colorFamilies[i];
//   new ColorFamily({
//     primary: currentFamily[0],
//     secondary1: currentFamily[1],
//     secondary2: currentFamily[2],
//     tertiary1: currentFamily[3],
//     tertiary2: currentFamily[4]
//   }).save();
// }
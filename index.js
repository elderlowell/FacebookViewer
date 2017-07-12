const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;//needs capitalized because it's a constructor function!!!

const app = module.exports = express();

app.use(session({secret: 'random-string'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '107397833247331',
  clientSecret: '5b7f5c0eaec448e657f02ce90fc88f3d',
  callbackURL: 'http://localhost:3000/auth/facebook/callback/'
}, function(accessToken, refreshToken, profile, done) {//this is where you would reference the local users table and either create a new user or access the information of an existing user
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/me',
  failureRedirect: '/auth/facebook'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function(req, res, next) {
  res.send(req.user);
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});

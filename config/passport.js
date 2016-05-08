passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
  , FacebookStrategy = require('passport-facebook').Strategy


var verifyHandler = function(token, tokenSecret, profile, done) {
  process.nextTick(function() {
    sails.log.debug('profile received : ', profile);
    User.findOne({uid: profile.id}, function(err, user) {
      if (user) {
        sails.log.debug('User Found : ', user);
        return done(null, user);
      } else {
        var data = {
          provider: profile.provider,
          uid: profile.id,
          name: profile.displayName
        };
        
        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
          data.email = profile.emails[0].value;
        }
        if (profile.name && profile.name.givenName) {
          data.firstname = profile.name.givenName;
        }
        if (profile.name && profile.name.familyName) {
          data.lastname = profile.name.familyName;
        }
        User.create(data, function(err, user) {
          sails.log.debug('User Created : ', user);
          return done(err, user);
        });
      }
    });
  });
}

passport.use(new GoogleStrategy({
  clientID: '223852730629-d2ecc1gambmjf4ngpnb8c5194ekm9bl0.apps.googleusercontent.com',
  clientSecret: 'uCeGOfIfFWHNF1odt9lrJTbY',
  callbackURL: 'http://ns3268035.ip-37-59-55.eu:1337/auth/google/callback'
}, verifyHandler));

passport.use(new FacebookStrategy({
  clientID: "838586926273712",
  clientSecret: "f17d18619a1b999775ea6134e80db7ba",
  callbackURL: 'http://ns3268035.ip-37-59-55.eu:1337/auth/facebook/callback'
}, verifyHandler));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  User.findOne({id : id}).exec(function (err, user) {
    done(err, user);
  });
});

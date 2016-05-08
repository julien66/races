/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

  /**
   * `AuthController.index()`
   */
  index: function (req, res) {
    if (req.query.ref) {
      req.session.redirectTo = req.query.ref;
    }
    res.view();
  },


  /**
   * `AuthController.logout()`
   */
  logout: function (req, res) {
    req.session.authenticated = false;
    req.logout();
    res.redirect('/');
  },


  /**
   * `AuthController.facebook()`
   */
  facebook: function (req, res) {
    passport.authenticate('facebook', { failureRedirect: '/login', scope: ['email'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          sails.log.error(err);
          res.view('500');
          return;
        }
        req.session.authenticated = true;
        if (req.session.redirectTo) {
          res.redirect(req.session.redirectTo);
        }
        else {
          res.redirect('/');
        }
        return;
      });
    })(req, res);
  },


  /**
   * `AuthController.google()`
   */
  google: function (req, res) {
    passport.authenticate('google', { failureRedirect: '/login', scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'] }, function(err, user) {
      req.logIn(user, function(err) {
        if (err) {
          sails.log.error(err);
          res.view('500');
          return;
        }
        req.session.authenticated = true;
        if (req.session.redirectTo) {
          res.redirect(req.session.redirectTo);
        }
        else {
          res.redirect('/');
        }
        return;
      });
    })(req, res);
  }
};


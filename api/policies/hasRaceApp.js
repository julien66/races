/**
 * hasRaceApp
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only admin user
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  req.options.locals = req.options.locals || {};
  req.options.locals.hasRaceApp = true;
  next();
};

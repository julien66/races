/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only admin user
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (req.user && (req.user.uid == '116510079023022737937' || req.user.uid == '103705703374769')) {
    return next();
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('Only admin is permitted to perform this action.');
};

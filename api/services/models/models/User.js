/**
 * User.js
 *
 * @description :: Basic User for the app... Stored from social login : Faceboo, Google
 * @see         :: AuthController.js
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * @TODO        :: Will need to have the same user even if it come from different account (facebook and google).
 * @see         :: Passport.authorize! https://scotch.io/tutorials/easy-node-authentication-linking-all-accounts-together
 */

module.exports = {
  
  attributes: {

    email: 'STRING',
    firstname: 'STRING',
    lastname: 'STRING',
    name: 'STRING',
    provider : 'STRING',
    uid: 'STRING',

    races : {
      collection : 'race',
      via : 'raceDirector',
    },
  }
};


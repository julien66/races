/**
 * Track.js
 *
 * @description :: GPS Track Model. Basically just storing GEOJSON to perform spatial queries.
 * @see         :: https://gist.github.com/PascalAnimateur/b73617f0a27475fd4ccb  
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    racer : { 
      model : 'user',
    },
    track : {
      type : 'JSON',
    }

  }
};


/**
 * Race.js
 *
 * @description :: Just Races!!
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    raceDirector : {
      model : 'user',
    },

    infos : {
      type : 'JSON',
    },

    turnpoints : {
      type : 'JSON',
    },
  }
};


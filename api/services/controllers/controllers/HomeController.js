/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   * `HomeController.index()`
   */
  index: function (req, res) {
    Race.find({}, {select : ['id', 'infos', 'turnpoints']}).exec(function(err, races) {
      for (var i = 0; i < races.length; i++) {
        races[i].turnpoints = {
          x : races[i].turnpoints[0].x,
          y : races[i].turnpoints[0].y
        }
      }

      res.view({
        user : req.user,
        races : races,
      });
    });
  },

};


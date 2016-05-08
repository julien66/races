/**
 * RaceController
 *
 * @description :: Server-side logic for managing races
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * RaceController.new();
   */
  new : function (req, res) {
    res.view();
  },

  view : function(req, res) {
    Race.findOne({id : req.param('id')}).exec(function(err, results) {
      if (err) {res.notFound();}
      res.view({race : results});
    });
  },

  destroy : function (req, res) {
    Race.destroy({}).exec(function(err, Race){
      if (err) {
        sails.log.error(err);
      }
      sails.log.warn("All Races deleted!");
    });
    res.redirect('/race');
  },

  list : function (req, res) {
    Race.find({}, {select: ['id', 'turnpoints']}).exec(function(err, results) {
      if(err) {res.notFound();}
      res.json(results);
    });
  }
};


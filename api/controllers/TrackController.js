/**
 * TrackController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var igcParser = require('igc-parser');
var ObjectId = require('mongodb').ObjectID;

var spatialQuery = function(collection, tid, tp, before, callback) { 
  var sort = 1;
  if (tp.type == "start" || tp.type == "turnpoint") {
    sort = -1;
  }

  if (!before) {
    before = new Date();
  }
  
  collection.aggregate([
    {
      "$match" : {
        "_id" : new ObjectId(tid),
      }
    },
    {
      "$project" : {
        "_id" : 1,
        "track.coordinates" : 1,
        "type" : {$ifNull : [null, tp.type]},
        "index" : {$ifNull : [null, tp.index]},
      }
    },
    {"$unwind" : "$track.coordinates"},
    { 
      "$match" : {
        "track.coordinates.time" : {
          "$lt" : before,
        },
        "track.coordinates.loc" : {
          "$geoWithin" : {
            "$centerSphere" : [[parseFloat(tp.y), parseFloat(tp.x)], (tp.radius * 0.000621371192) / 3963.2],
          }
        }
      }
    },
    {
      "$sort" : {
        "track.coordinates.time" : sort,
      }
    },
    {"$limit" : 1},
    ], function(err, result) {
      callback(err, result);
   });
}

module.exports = {

  check : function(req, res) {
    Track.native(function(err, collection) {
      var tid = req.param('tid'); 
      var rid = req.param('rid');
      if(!tid || !rid) {
        res.badRequest();
      } 

      Race.findOne({id : rid}).exec(function(err, race) {
        var checked = [];
        var valid = true;
        var i = race.turnpoints.length - 1;
        var tp = race.turnpoints[i];
        var before = null;
        spatialQuery(collection, tid, tp, before, function checker(err, result) {
          if (err) {
            sails.log.error(err);
          }
          
          checked.push(result);
          if (result.length == 0) {
            res.json({
              valid : false,
              tp : tp,
            });
          }
          i--;
          tp = race.turnpoints[i];
          before = result[0].track.coordinates.time;

          if (checked.length == race.turnpoints.length) {
            res.json({
              valid : valid,
              results : checked,
            });
          }
          else  {
            spatialQuery(collection, tid, tp, before, checker);
          }
        });
      });
    }); 
  },

  create : function(req, res) {
    var fd = req.param("fd");
    if (!fd) {
      res.badRequest();
    }

    fs.readFile(fd, 'utf8', function (err, data) {
      var trackData = igcParser.parseIGC(data);
      if (trackData) {
        Track.create({user : req.user.id, track : trackData}).exec(function(err, track) {
          if (err) return res.negotiate(err, track);
          return res.json({track : track});
        });
      }
    }); 
  },

  upload : function(req, res) {
    req.file('track').on('progress', function(event) {
    }).upload({
      // Put some options here.
      maxBytes: 1000000,
    }, function (err, files) {
      if (err) {
        return res.serverError(err);
      }
      
      return res.json({files : files}); 
    });
  },
}

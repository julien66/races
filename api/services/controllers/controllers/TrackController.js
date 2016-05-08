/**
 * TrackController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//var fs = require('fs');
//var igcParser = require('igc-parser');

module.exports = {
  upload : function(req, res) {
    req.file('track').on('progress', function(event){
    }).upload({
      // Put some options here.
      maxBytes: 1000000,
    }, function (err, files) {
      if (err) {
        return res.serverError(err);
      }
     
      sails.log.warn(files);
      fs.readFile(files[0].fd, 'utf8', function (err, data) {
        // Print the contents of the file as a string here
        // and do whatever other string processing you want
        //sails.log.warn(igcParser.parse(data));
      }); 

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    }); 
  }
};


define(['jquery'], function($) {

  var createTrack = function(fd, callback) {
    
    $.ajax({
      url: '/track/create',
      type: 'POST',
      success : function(track, status, xhr) {
        callback(track);
      },
      error : function(xhr, status, err) {
        console.log(err);
      },
      data : {fd : fd},
    });
  };
  
  var checkTrack = function(tid, rid, callback) {
    console.log(tid, rid);
    $.ajax({
      url: '/track/check/' + tid+ '/' + rid,
      type: 'GET',
      success : function(isValid, status, xhr) {
        callback(isValid);
      },
      error : function(xhr, status, err) {
        console.log(err);
      }
    });
  };

  return {
    createTrack : createTrack,
    checkTrack : checkTrack,
  }
});

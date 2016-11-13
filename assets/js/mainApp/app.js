define(['jquery'], function($) {
  if ($("#sendTrack").length > 0) {
    require(["mainApp/sendTrack"], function() {
    });
  }  
}); 

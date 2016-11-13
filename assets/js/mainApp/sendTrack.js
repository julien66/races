define(['jquery', 'mainApp/checkTrack'], function($, checkTrack) {

  $('#sendTrack').change(function(){
    
    var fd = new FormData();
    var other_data = $('#trackForm').serializeArray();
    $.each(other_data,function(key,input) {
      fd.append(input.name, input.value);
    });
    fd.append('track', this.files[0]);
    
    $.ajax({
      url: '/track/upload',  //Server script to process data
      type: 'POST',
      xhr: function() {  // Custom XMLHttpRequest
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload) { // Check if upload property exists
          $("#progress").removeClass('hidden');
          $("#percent").removeClass("hidden");
          $("#progressMessage").html("Uploading");
          myXhr.upload.addEventListener('progress', progressHandlingFunction, false); // For handling the progress of the upload
        }
        return myXhr;
      },
      success: function(data, status, xhr) {
        console.log(data);
        if (data.files && data.files.length > 0) {
          $("#progressMessage").html("Creating track record");
          $("#percent").addClass("hidden");
          checkTrack.createTrack(data.files[0].fd, function(track) {
            console.log(track);
            if(track && track.id) {
              $("#progessMessage").html("Checking track for this race");
              checkTrack.checkTrack(track.id, $("#raceId").val(), function(isValid) {
                console.log(isValid);
              });
            }
          });
        }  
      },
      error: function(xhr, status, err) {
        console.log(err);
      },
      data: fd,
      contentType: false,
      processData: false
    });
  });

  function progressHandlingFunction(e) {
    if (e.lengthComputable) {
      $("#percent").html(Math.round((e.loaded / e.total) * 100) + " %"); 
    }
  }
});

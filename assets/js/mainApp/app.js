define(['jquery'], function($) {
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
          myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
        }
        return myXhr;
      },
      success: function(data, status, xhr) {
        console.log(data);
        $("#progress").addClass('hidden');
      },
      error: function(xhr, status, err) {
      },
      data: fd,
      contentType: false,
      processData: false
    });
  });
  
  function progressHandlingFunction(e) {
    if (e.lengthComputable) {
      $("#progress").removeClass('hidden');
      $("#percent").html(Math.round((e.loaded / e.total) * 100)); 
    }
  }
}); 

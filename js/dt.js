// script assumes jquery is available
var dt = {};//namespace

dt.quiz = function() {
  var test = {};

  return test;
}();

dt.instagram = function(){
  var inst = {};
  var clientId = "6f867f509df8488e9b115705bc003c68";
  var dtId = "439020677";
  var endpoint = "https://api.instagram.com/v1/users/"+dtId+"/media/recent/?client_id"+clientId+"=&count=12";

  function instagramSuccess(result) {
    console.log('Instagram Success', result);
    var photos = $('#photos');
    for (var photo in result.data) {
      var pic = result.data[photo];
      photos.append('<img src="'+pic.images.low_resolution.url+'" />');
    }
  }

  function instagramError(error) {
    console.log('Instagram Error', error);
  }

  inst.getPhotos = function(elementToPopulate){
    $.ajax({
      dataType: 'jsonp',
      url: endpoint,
      success: instagramSuccess,
      error: instagramError
    });
  };

  return inst;
}();

// Initialize foundation
$(document).foundation();

// Initialize custom components
$(document).ready(function(){
  // Instagram feed
  var photoElement = $("#photos");
  if (photoElement) {
    dt.instagram(photoElement);
  }
});
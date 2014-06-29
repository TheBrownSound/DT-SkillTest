// script assumes jquery is available

var InstagramPhotos = function(count){
  var inst = {};
  var clientId = "6f867f509df8488e9b115705bc003c68";
  var dtId = "439020677";
  var endpoint = "https://api.instagram.com/v1/users/"+dtId+"/media/recent/?client_id="+clientId+"&count="+count;

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

  inst.getPhotos = function(){
    console.log('rawr');
    $.ajax({
      dataType: 'jsonp',
      url: endpoint,
      success: instagramSuccess,
      error: instagramError
    });
  };

  return inst;
};

var DesignerQuiz = function() {
  var test = {};

  return test;
};


var dt = function(){
  var app = {};

  // Quote section logic

  var quotes = $('#quotes');
  var numOfQuotes = quotes.children().length;
  if (numOfQuotes > 1) {
    var bullets = $('<ul class="bullets"></ul>');
    for (var i = 0; i < numOfQuotes; i++) {
      var num = i+1;
      bullets.append('<li class="bullet">'+num+'</li>');
    }
    quotes.after(bullets);
  }

  app.instagram = new InstagramPhotos(12);
  app.quiz = new DesignerQuiz();

  return app;
}();

// Initialize foundation
$(document).foundation();

// Initialize custom components
$(document).ready(function(){
  // Instagram feed
  dt.instagram.getPhotos();
});
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
  var activeQuote = 0;
  var quotesWrapper = $('#quotes');
  var quotes = quotesWrapper.children();
  if (quotes.length > 1) {
    var bullets = $('<ul class="bullets"></ul>');
    for (var i = 0; i < quotes.length; i++) {
      var num = i+1;
      var bullet = $('<li class="bullet" value="'+i+'">'+num+'</li>');
      bullets.append(bullet);
    }
    bullets.children().on('click', bulletClicked);
    quotesWrapper.after(bullets);
  }

  function bulletClicked(evt) {
    var index = evt.target.value;
    if (index !== activeQuote) {
      $(quotes[activeQuote]).removeClass('active');
      $(quotes[index]).addClass('active');
      activeQuote = index;
    }
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
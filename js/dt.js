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

var Marquee = function(){
  var marquee = {};
  var _wrapper;
  var _items = [];
  var _pixelsPerSecond = 4;

  function scrollGroup() {
    var firstGroup = _wrapper.children(':first');
    var scrollWidth = firstGroup.outerWidth()-parseInt(firstGroup.css('margin-left'), 10);
    var duration = (scrollWidth/_pixelsPerSecond) * 100;
    firstGroup.animate({'margin-left': -1 * scrollWidth},
      duration, //duration
      'linear', // ease
      function() {
        firstGroup.appendTo(_wrapper);
        firstGroup.css('margin-left', 0);
        scrollGroup();
      }
    );
  }

  marquee.pause = function(){

  };

  marquee.resume = function(){

  };

  marquee.init = function(wrapperId) {
    _wrapper = $(wrapperId);
    if (_wrapper) {
      var groups = _wrapper.children('.group');
      for (var i = 0; i < groups.length; i++) {
        _items.push(groups[i]);
      }
      scrollGroup();
    }
  };

  return marquee;
};

var dt = function(){
  var app = {};
  var _jumpLinkClicked = false;

  // Quote section logic
  var activeQuote = false;
  var quotesWrapper = $('#quotes');
  var quotes = quotesWrapper.children();
  var bullets = $('<ul class="bullets"></ul>');
  if (quotes.length > 1) {
    for (var i = 0; i < quotes.length; i++) {
      var bullet = $('<li class="bullet" value="'+i+'"></li>');
      bullets.append(bullet);
    }
    bullets.children().on('click', function(evt){
      setActiveQuote(evt.target.value);
    });
    quotesWrapper.after(bullets);
    setActiveQuote(0);
  }

  function setActiveQuote(index) {
    if (index !== activeQuote) {
      $(bullets.children()[activeQuote]).removeClass('active');
      $(bullets.children()[index]).addClass('active');
      $(quotes[activeQuote]).removeClass('active');
      $(quotes[index]).addClass('active');
      activeQuote = index;
    }
  }

  var jumplink = $("#jumplink");
  if (jumplink) {
    $("#jumplink a").on('click', function(){
      _jumpLinkClicked = true;
      jumplink.removeClass('show');
      $('html, body').animate({scrollTop: $("#apply").position().top}, 500);
    });

    $(window).scroll(function(){
      if (!_jumpLinkClicked && !jumplink.hasClass('show')) {
        var scrollTop = $(window).scrollTop();
        if (scrollTop >= 2300) {
          jumplink.addClass('show');
        }
      }
    });
  }

  app.marquee = new Marquee();
  app.instagram = new InstagramPhotos(12);
  app.quiz = new DesignerQuiz();

  return app;
}();

// Initialize foundation
$(document).foundation();

// Initialize custom components
$(document).ready(function(){
  // Marquee
  dt.marquee.init('#marquee');

  // Instagram feed
  dt.instagram.getPhotos();

  // Quiz
  dt.quiz.create('#test');

});
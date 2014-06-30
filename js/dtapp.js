// script assumes jquery is available
var DesignerQuiz = function() {
  var test = {};
  var _questions = [{
    title: "Which Font is This?",
    customClass: "font",
    imgPath: "img/test_font.png",
    options: ["Helvetica","Arial","Gotham","Futura"],
    answer: 0
  },{
    title: "What is the screen resolution of the iPhone 5s?",
    customClass: "resolution",
    imgPath: "img/iphone.png",
    options: ["960 X 400","1024 x 768","1136 x 640","1280 x 768"],
    answer: 2
  },{
    title: "Which blending mode is this?",
    customClass: "blending",
    imgPath: "img/blending.png",
    options: ["Dissolve","Multiply","Color","Difference"],
    answer: 2
  },{
    title: "How many columns is the default bootstrap grid?",
    customClass: "bootstrap",
    imgPath: "img/grid.png",
    options: ["8","12","16","24"],
    answer: 2
  },{
    title: "Which of the following is not a type foundry?",
    customClass: "type",
    imgPath: "img/logos.png",
    options: ["Veer","VSCO","HF&J","House Industries"],
    answer: 3
  },{
    title: "Someone that can design and develop is often referred to as:",
    customClass: "animal",
    imgPath: "img/animals.png",
    options: ["Unicorn","Jackelope","Pegasus","Centaur"],
    answer: 0
  },{
    title: "Which of these is not a to-do app?",
    customClass: "todo",
    imgPath: "img/todo_icons.png",
    options: ["Clear","Wunderlist","Flipboard","Cheddar"],
    answer: 2
  }];
      
  var _currentQuestion = 0;
  var _total = 0;
  var _questionList;
  var _optionWrapper;
  var _results;

  function showQuestion(index) {
    console.log('showQuestion', index);
    $(questionList.children()[index]).addClass('show');
  }

  function showResults() {
    var slide = $('<li class="results"></li>');
    var title = $('<h3></h3>');
    var message = $('<p></p>');
    var count = $('<span class="result"><strong>'+_total+'</strong>/'+_questions.length+'</span>');
    
    if (_total >= 8) {
      title.text('Nice work!');
      message.text('You are a design ninja, we hope you will apply!');
    } else if (_total >= 4) {
      title.text('Not bad!');
      message.text('Your skills are shaping up nicely. You have a promising future in design. Apply now!');
    } else {
      title.text('Ouch.');
      message.text('Did you forget your coffee this morning?');
    }

    slide.append([title, message, count]);
    $(questionList).append(slide);
    _results = slide;

    setTimeout(function(){
      slide.addClass('show'); // Silly hack to make sure the slide animates, fix later.
    }, 1);
  }

  function resetQuiz() {
    _total = _currentQuestion = 0;
    $(questionList.children()).removeClass('hide');
    console.log('result',questionList.find('results')[0]);
    $(_results).addClass('hide');
    showQuestion(_currentQuestion);
    populateOptions(_questions[_currentQuestion].options);
    setTimeout(function(){
      $(_results).remove();
      _results = null;
    }, 1400);
  }

  function populateOptions(options, reset) {
    console.log('populateOptions', options);
    _optionWrapper.empty();
    for (var option in options) {
      var item = $('<li>'+options[option]+'</li>');
      if (reset) {
        item.attr('value', 'reset');
      }
      _optionWrapper.append(item);
    }
  }

  function submitAnswer(answer){
    console.log('submitAnswer', answer);
    var currentOptions = _questions[_currentQuestion].options;
    var currentAnswer = _questions[_currentQuestion].answer;
    console.log(currentOptions.indexOf(answer));
    console.log(currentAnswer);
    var answerBar;
    if (currentOptions.indexOf(answer) === currentAnswer) {
      answerBar = $('.bar .result.correct');
      _total++;
    } else {
      answerBar = $('.bar .result.incorrect');
    }
    $('.bar .options').removeClass('show');
    answerBar.addClass('show');
    $(questionList.children()[_currentQuestion]).removeClass('show');
    $(questionList.children()[_currentQuestion]).addClass('hide');
    if (_currentQuestion-1 >= 0) {
      $(questionList.children()[_currentQuestion-1]).removeClass('hide');
    }

    _currentQuestion++;
    var options;
    if (_currentQuestion < _questions.length) {
      showQuestion(_currentQuestion);
      options = _questions[_currentQuestion].options
    } else {
      showResults();
    }

    setTimeout(function(){
      answerBar.removeClass('show');
      $('.bar .options').addClass('show');
      if (options) {
        populateOptions(options);
      } else {
        populateOptions(["Re-take the Quiz"], true);
      }
    }, 1400);
  }

  test.create = function (testWrapper) {
    questionList = $($(testWrapper+" .questions")[0]);
    _optionWrapper = $($(testWrapper+" .options")[0]);
    if (questionList) {
      for (var i = 0; i < _questions.length; i++) {
        var question = _questions[i];
        var slide = $('<li class="question '+question.customClass+'"></li>');
        if (question.customClass) slide.addClass(question.customClass);
        
        if (i === 0) {
          slide.addClass('show');
        }

        var count = $('<span class="count">'+(i+1)+'/'+_questions.length+'</span>');
        console.log('count', count);
        var title = $('<h3>'+question.title+'</h3>');
        var img = $('<img src="'+question.imgPath+'" />');
        slide.append([count, title, img]);
        $(questionList).append(slide);
      }

      $('.options').delegate('li','click', function(evt){
        console.log('evt', evt);
        if ($(evt.target).attr('value') == "reset") {
          resetQuiz();
        } else {
          submitAnswer($(evt.target).text());
        }
      });

      showQuestion(0);
      populateOptions(_questions[0].options);
    }
  };

  return test;
};


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
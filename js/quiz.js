var DesignerQuiz = function() {
  var test = {};
  var _questions = [{
    title: "Which Font is This?",
    customClass: "",
    imgPath: "img/test_font.png",
    options: ["Helvetica","Arial","Gotham","Futura"],
    answer: 0
  },{
    title: "What is the screen resolution of the iPhone 5s?",
    customClass: "",
    imgPath: "img/test_font.png",
    options: ["960 X 400","1024 x 768","1136 x 640","1280 x 768"],
    answer: 2
  },{
    title: "Which blending mode is this?",
    customClass: "",
    imgPath: "img/test_font.png",
    options: ["Dissolve","Multiply","Color","Difference"],
    answer: 3
  }];
      
  var _currentQuestion = 0;
  var _total = 0;
  var _questionList;
  var _optionWrapper;

  function showQuestion(index) {
    console.log('showQuestion', index);
    $(questionList.children()[index]).addClass('show');
  }

  function showResults() {
    var slide = $('<li class="results"></li>');
    var title = $('<h3></h3>');
    var message = $('<p></p>');
    var count = $('<span class="result"><em>'+_total+'</em>/'+_questions.length+'</span>');
    
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

    setTimeout(function(){
      slide.addClass('show'); // Silly hack to make sure the slide animates, fix later.
    }, 1);
  }

  function populateOptions(options) {
    console.log('populateOptions', options);
    _optionWrapper.empty();
    for (var option in options) {
      var item = $('<li>'+options[option]+'</li>');
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

    _currentQuestion++;
    if (_currentQuestion < _questions.length) {
      showQuestion(_currentQuestion);
    } else {
      showResults();
      _optionWrapper.empty();
    }

    setTimeout(function(){
      answerBar.removeClass('show');
      $('.bar .options').addClass('show');
      populateOptions(_questions[_currentQuestion].options);
    }, 1000);
  }

  test.create = function (testWrapper) {
    questionList = $($(testWrapper+" .questions")[0]);
    _optionWrapper = $($(testWrapper+" .options")[0]);
    if (questionList) {
      for (var i = 0; i < _questions.length; i++) {
        var question = _questions[i];
        var slide = $('<li class="question '+question.customClass+'"></li>');
        if (question.customClass) slide.addClass(customClass);
        
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
        submitAnswer($(evt.target).text());
      });

      showQuestion(0);
      populateOptions(_questions[0].options);
    }
  };

  return test;
};

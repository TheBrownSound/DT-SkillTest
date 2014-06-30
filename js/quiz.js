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
    populateOptions(_questions[_currentQuestion].options);
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
    if (currentOptions.indexOf(answer) === currentAnswer) {
      console.log('Correct!');
    } else {
      console.log('Incorrect');
    }
    $(questionList.children()[_currentQuestion]).removeClass('show');
    $(questionList.children()[_currentQuestion]).addClass('hide');
    _currentQuestion++;
    showQuestion(_currentQuestion);
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
    }
  };

  return test;
};

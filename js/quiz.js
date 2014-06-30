var DesignerQuiz = function() {
  var test = {};
  var _questions = [{
    title: "Which Font is This?",
    customClass: "",
    imgPath: "img/test_font.png",
    options: ["Helvetica","Arial","Gotham","Futura"],
    answerIndex: 0
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
  var wrapper;

  function nextQuestion() {
    
  }

  test.submitAnswer = function(){

  };

  test.create = function (listId) {
    var questionList = $(listId);
    if (questionList) {
      for (var i = 0; i < _questions.length; i++) {
        var question = _questions[i];
        var slide = $('<li class="question '+question.customClass+'"></li>');
        if (question.customClass) slide.addClass(customClass);
        if (i === 0) slide.addClass('show');

        var count = $('<span class="count">'+(i+1)+'/'+_questions.length+'</span>');
        console.log('count', count);
        var title = $('<h3>'+question.title+'</h3>');
        var img = $('<img src="'+question.imgPath+'" />');
        slide.append([count, title, img]);
        questionList.append(slide);
      }
    }
  };

  return test;
};

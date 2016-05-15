/*var console = {};
console.log = function(){};

window.console = console;
*/
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {

  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev, answer) {
  if (answer.children.length < 1) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");


    ev.target.appendChild(document.getElementById(data));

  } else {
    alert('Sie können nur ein Element pro Feld einfügen.');
  }
}





var app = angular.module('test_application', []);

app.controller('test_controller', function($scope, $http) {


  $scope.test_end = false;
  $scope.feedback_send = false;
  $scope.test_runs = false;


  $scope.user_answers = {}; 



  $scope.question_catalog = {};
  $scope.all_questions = {};
  $scope.user_choice = {};
  $scope.questions_end = {};
  $scope.question_number = 0;

  $scope.correct_questions = {};

  $scope.correct_questions.computer_easy = 0;
  $scope.correct_questions.computer_middle = 0;

  $scope.correct_questions.internet_easy = 0;
  $scope.correct_questions.internet_middle = 0;

  $scope.correct_questions.office_easy = 0;
  $scope.correct_questions.office_middle = 0;
  $scope.correct_questions.office_heavy = 0;
  
  
  $scope.correct_questions.computer_easy_prozedural = 0;
  $scope.correct_questions.computer_middle_prozedural = 0;

  $scope.correct_questions.internet_easy_prozedural = 0;
  $scope.correct_questions.internet_middle_prozedural = 0;

  $scope.correct_questions.office_easy_prozedural = 0;
  $scope.correct_questions.office_middle_prozedural = 0;
  $scope.correct_questions.office_heavy_prozedural = 0;
  
  
    $scope.correct_questions.computer_easy_deklarativ = 0;
  $scope.correct_questions.computer_middle_deklarativ = 0;

  $scope.correct_questions.internet_easy_deklarativ = 0;
  $scope.correct_questions.internet_middle_deklarativ = 0;

  $scope.correct_questions.office_easy_deklarativ = 0;
  $scope.correct_questions.office_middle_deklarativ = 0;
  $scope.correct_questions.office_heavy_deklarativ = 0;


  var asked_questions = [];
  var rejected_questions = [];

  $scope.asked_categories = {};

  $scope.categories_todo = {};

  //führt zu Problemen wenn ein Einschränkung gemacht wird
  $scope.categories_todo.deklarativ = 21;
  $scope.categories_todo.prozedural = 21;

  $scope.categories_todo.computer_easy = 3;
  $scope.categories_todo.computer_middle = 4;
  $scope.categories_todo.computer_heavy = 0;

  $scope.categories_todo.office_easy = 3;
  $scope.categories_todo.office_middle = 3;
  $scope.categories_todo.office_heavy = 1;

  $scope.categories_todo.internet_easy = 3;
  $scope.categories_todo.internet_middle = 4;
  $scope.categories_todo.internet_heavy = 0;


  $scope.asked_categories.deklarativ = 0;
  $scope.asked_categories.prozedural = 0;

  $scope.asked_categories.computer_easy = 0;
  $scope.asked_categories.computer_middle = 0;
  $scope.asked_categories.computer_heavy = 0;

  $scope.asked_categories.office_easy = 0;
  $scope.asked_categories.office_middle = 0;
  $scope.asked_categories.office_heavy = 0;

  $scope.asked_categories.internet_easy = 0;
  $scope.asked_categories.internet_middle = 0;
  $scope.asked_categories.internet_heavy = 0;



$scope.test_not_possible = false;
$scope.test_start = true;

  //anzahl aller Fragen
  $scope.catalog_length = 64;

  $scope.question_number_all = 21;


  $scope.category_points = {};

  $http.get('knowledge_test/questions_JSON.json')
    .then(function(result) {
      $scope.question_catalog.questions = result.data;
    });


  $scope.selected = {};
  $scope.input_values = {};


  //schreibe alle ergebnisse in eine json datei zum auswerten
  $scope.save_test_date = function() {
    //speichern des datums in die datenbank
    $.post("knowledge_test/save_test_date_database.php", {
      personID: personID,
      test_date: date
    });
  };




  //schreibe alle ergebnisse in eine json datei zum auswerten
  $scope.save_user_answer = function() {
    $.post("knowledge_test/save_user_answers.php", {
      json: JSON.stringify($scope.user_answers.result),
      personID: personID
    });
    //extrazeilen für speichern in die datenbank
    $.post("knowledge_test/save_user_answers_database.php", {
      personID: personID,
      total_score: $scope.points,
      computer_score: $scope.category_points.computer,
      internet_score: $scope.category_points.internet,
      office_score: $scope.category_points.office
    });
  };






  $scope.addPoints = function(points, category, type) {

    $scope.points = $scope.points + points;
    switch (category) {
      case "Computer Grundlagen":
        $scope.category_points.computer = $scope.category_points.computer + points;
        switch (points) {
          case 1:
            $scope.correct_questions.computer_easy++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.computer_easy_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.computer_easy_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          case 2:
            $scope.correct_questions.computer_middle++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.computer_middle_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.computer_middle_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          default:
            break;
        }
        break;
      case "Internet Grundlagen":
        $scope.category_points.internet = $scope.category_points.internet + points;
        switch (points) {
          case 1:
            $scope.correct_questions.internet_easy++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.internet_easy_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.internet_easy_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          case 2:
            $scope.correct_questions.internet_middle++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.internet_middle_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.internet_middle_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          default:
            break;
        }
        break;
      case "Office Grundlagen":
        $scope.category_points.office = $scope.category_points.office + points;
        switch (points) {
          case 1:
            $scope.correct_questions.office_easy++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.office_easy_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.office_easy_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          case 2:
            $scope.correct_questions.office_middle++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.office_middle_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.office_middle_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          case 3:
            $scope.correct_questions.office_heavy++;
            switch (type) {
	          case 1:
	          case 2:
	            $scope.correct_questions.office_heavy_deklarativ++;
	            break;
	          case 3:
	          case 4:
	            $scope.correct_questions.office_heavy_prozedural++;
	            break;
	          default:
	            break;
	        }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }

  };




  $scope.checkAnswer = function() {
    switch ($scope.question.type) {
      case 1:
        $scope.checkType1();
        break;
      case 2:
        $scope.checkType2();
        break;
      case 3:
        $scope.checkType3();
        break;
      case 4:
        $scope.checkType4();
        break;
      default:
        break;
    }
  };





  //checkboxen
  $scope.checkType1 = function() {
    var correct_answers_checked = 0;
    var punish = false;
    var answerID = 0;
    for (var i = 1; i < $scope.question.options.length + 1; i++) {
      if ($scope.selected[i]) {
        $scope.user_choice[answerID] = i;
        answerID++;

        punish = true;
        for (var j = 0; j < $scope.question.answers.length; j++) {
          if (i == $scope.question.answers[j].id) {
            correct_answers_checked++;
            punish = false;
          }
        }
        //bestrafe fehler
        if (punish == true) {
          correct_answers_checked--;
        }
      }
    }


    if (correct_answers_checked == $scope.question.answers.length) {
      $scope.addPoints($scope.question.points, $scope.question.category, 1);
    }

  };







  //radio buttons
  $scope.checkType2 = function() {
    var checked_radio = parseInt($('input[name=answer]:checked').val());
    if (checked_radio == $scope.question.answers[0].id) {
      $scope.addPoints($scope.question.points, $scope.question.category, 2);
    }
    $scope.user_choice[0] = checked_radio;
  };





  //drag and drop
  $scope.checkType3 = function() {
    var correct_answers_dropped = 0;

    for (var i = 1; i < $scope.question.answers.length + 1; i++) {

      var drop_divID = '#target' + i;

      $scope.user_choice[i - 1] = $(drop_divID).children("span").attr("id");

      if ($scope.question.answers[i - 1].id == $(drop_divID).children("span").attr("id")) {
        correct_answers_dropped++;
      }

    }
    if (correct_answers_dropped == $scope.question.answers.length) {
      $scope.addPoints($scope.question.points, $scope.question.category, 3);
    }

  }





  //input fields
  $scope.checkType4 = function() {
    for (var i = 1; i < $scope.question.answers.length + 1; i++) {
      $scope.user_choice[i - 1] = $scope.input_values[i];

      if ($scope.input_values[i] == $scope.question.answers[i - 1].text) {
        $scope.addPoints($scope.question.points, $scope.question.category, 4);
      }
    }
  };






  $scope.start = function() {
  $scope.save_test_date();
    $scope.questionID = 0;
    $scope.points = 0;
    $scope.category_points.office = 0;
    $scope.category_points.computer = 0;
    $scope.category_points.internet = 0;
    $scope.test_start = false;

    $scope.test_runs = true;

    $scope.countTime();
    $scope.nextQuestion(true);
  };





  $scope.countTime = function() {
    $scope.timer = 0;
    var timer = setInterval(function() {
      $scope.timer++;
      $scope.$apply();
    }, 1000);
  };







  $scope.validate_question_type = function(id) {
    switch ($scope.question_catalog.questions[id].type) {
      case 1:
      case 2:
        //deklarativ
        if ($scope.asked_categories.deklarativ < $scope.categories_todo.deklarativ) {
          $scope.asked_categories.deklarativ++;
          return true;
        } else {
          return false;
        }
        break;
      case 3:
      case 4:
        //prozedural
        if ($scope.asked_categories.prozedural < $scope.categories_todo.prozedural) {
          $scope.asked_categories.prozedural++;
          return true;
        } else {
          return false;
        }
        break;
      default:
        break;
    }
  };





  $scope.validate_question = function(id) {
    if (asked_questions.indexOf(id) == -1 && rejected_questions.indexOf(id) == -1) {

      switch ($scope.question_catalog.questions[id].category) {
        case "Computer Grundlagen":
          switch ($scope.question_catalog.questions[id].level) {
            case "L":
			  if ($scope.asked_categories.computer_easy < $scope.categories_todo.computer_easy && $scope.validate_question_type(id)) {
                $scope.asked_categories.computer_easy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "M":
			 if ($scope.asked_categories.computer_middle < $scope.categories_todo.computer_middle && $scope.validate_question_type(id)) {
                $scope.asked_categories.computer_middle++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "S":
			 if ($scope.asked_categories.computer_heavy < $scope.categories_todo.computer_heavy && $scope.validate_question_type(id)) {
                $scope.asked_categories.computer_heavy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            default:
              break;
          }
          break;
        case "Office Grundlagen":
          switch ($scope.question_catalog.questions[id].level) {
            case "L":
			 if ($scope.asked_categories.office_easy < $scope.categories_todo.office_easy && $scope.validate_question_type(id)) {
                $scope.asked_categories.office_easy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "M":
			if ($scope.asked_categories.office_middle < $scope.categories_todo.office_middle && $scope.validate_question_type(id)) {
                $scope.asked_categories.office_middle++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "S":
			 if ($scope.asked_categories.office_heavy < $scope.categories_todo.office_heavy && $scope.validate_question_type(id)) {
                $scope.asked_categories.office_heavy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            default:
              break;
          }
          break;
        case "Internet Grundlagen":
          switch ($scope.question_catalog.questions[id].level) {
            case "L":
			 if ($scope.asked_categories.internet_easy < $scope.categories_todo.internet_easy && $scope.validate_question_type(id)) {
                $scope.asked_categories.internet_easy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "M":
 if ($scope.asked_categories.internet_middle < $scope.categories_todo.internet_middle && $scope.validate_question_type(id)) {
                $scope.asked_categories.internet_middle++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            case "S":
              if ($scope.asked_categories.internet_heavy < $scope.categories_todo.internet_heavy && $scope.validate_question_type(id)) {
                $scope.asked_categories.internet_heavy++;
                asked_questions.push(id);
                return true;
              } else {
                rejected_questions.push(id);
                return false;
              }
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    } else { 
      return false;
    }
  };









  $scope.nextQuestion = function(first) {

    $scope.progress = ($scope.question_number / $scope.question_number_all) * 100;

    if (!first) {

      $scope.checkAnswer();

      $scope.all_questions[$scope.question_number] = new function() {

        this.questionID = $scope.questionID;
        this.user_choice = $scope.user_choice;

        this.level = $scope.question_catalog.questions[$scope.questionID].level;
      };
      $scope.user_choice = {};

      if ($scope.question_number_all == $scope.question_number) {
        $scope.test_runs = false;
        $scope.feedback_send = true;
      }

    }
    $scope.question_number++;

    $scope.selected = {};
    $scope.input_values = {};





    var next_number = 0;

    if ($scope.question_number <= $scope.question_number_all) {
      do {
        next_number = Math.floor((Math.random() * ($scope.catalog_length - 1)) + 0);
      } while (!$scope.validate_question(next_number))


      $scope.questionID = next_number;



      $scope.question = $scope.question_catalog.questions[$scope.questionID];
      $scope.category = $scope.question.category;
      $scope.level = $scope.question.level;

      switch ($scope.question.type) {
        case 1:
          $scope.type1 = true;
          $scope.type2 = false;
          $scope.type3 = false;
          $scope.type4 = false;
          break;
        case 2:
          $scope.type1 = false;
          $scope.type2 = true;
          $scope.type3 = false;
          $scope.type4 = false;
          break;
        case 3:
          $scope.type1 = false;
          $scope.type2 = false;
          $scope.type3 = true;
          $scope.type4 = false;
          break;
        case 4:
          $scope.type1 = false;
          $scope.type2 = false;
          $scope.type3 = false;
          $scope.type4 = true;
          break;
        default:
          break;
      }

      if ($scope.question.img) {
        $scope.image = true;
      } else {
        $scope.image = false;
      }

    }
  };




  $scope.save_user_feedback = function() {
    $.post("knowledge_test/save_user_feedback.php", {
      personID: personID,
      test_length_feedback: parseInt($('input[name=test_feedback_length]:checked').val()),
      test_level_feedback: parseInt($('input[name=test_feedback_level]:checked').val()),
    });
    $scope.feedback_send = false;
    $scope.end();
  };



  $scope.save_user_assessment = function() {
    $.post("knowledge_test/save_user_assessment.php", {
      personID: personID,
      test_computer_assessment: parseInt($('input[name=computer_assessment]:checked').val()),
      test_online_assessment: parseInt($('input[name=online_assessment]:checked').val()),
      test_office_assessment: parseInt($('input[name=office_assessment]:checked').val()),
      test_computer_assessment_prozedural: parseInt($('input[name=computer_assessment_prozedural]:checked').val()),
      test_online_assessment_prozedural: parseInt($('input[name=online_assessment_prozedural]:checked').val()),
      test_office_assessment_prozedural: parseInt($('input[name=office_assessment_prozedural]:checked').val()),
      test_assessment_assessment: parseInt($('input[name=assessment_assessment]:checked').val()),
    });
  };





  $scope.end = function() {
    $scope.test_end = true;


    var user = new function() {

      this.user_id = personID;
      this.date = date;
      this.all_questions = $scope.all_questions;
      this.points = $scope.points;
      this.category_points = $scope.category_points;
      this.correct_answers = $scope.correct_questions;
      this.deklarativ = $scope.asked_categories.deklarativ;
      this.prozedural = $scope.asked_categories.prozedural;
      this.time = $scope.timer;

    };
    $scope.user_answers.result = user;
    $scope.save_user_answer();



  };



  //zur validierung feedback
  $scope.check_feedback = function(obj) {
    if (obj == undefined) {
      return true;
    } else if (Object.keys(obj).length == 2) {
      return false;
    } else {
      return true;
    }
  };



  //zur validierung input
  $scope.check_input = function(obj) {
    if (angular.equals({}, obj)) {
      return true;
    } else if (Object.keys(obj).length > 0) {
      return false;
    } else {
      return true;
    }
  };



  //zur validierung checkbox
  $scope.check_checkbox = function(obj) {
    if (angular.equals({}, obj)) {
      return true;
    } else if (Object.keys(obj).length > 0) {
      return false;
    } else {
      return true;
    }
  };



  //zur validierung radiobuttons
  $scope.check_radio = function(radio) {
    if (radio == undefined) {
      return true;
    } else if (radio >= 0) {
      return false;
    } else {
      return true;
    }
  };


  //zur validierung drop
  $scope.check_drop = function() {
    if ($scope.test_runs && $scope.question.type == 3) {
      var disabled_button = true;
      for (var i = 1; i < $scope.question.options.length + 1; i++) {
        if ($('#target' + i).children("span").attr("id") != undefined) {
          disabled_button = false;
        }
      }
      return disabled_button;
    }
  };

});
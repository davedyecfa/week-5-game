$(document).ready(function () {

    var trivia = {

        questions: [{
            question: "Who is not a character in the story",
            correctAnswer: "Shengi",
            answers: ["Ishikawa", "Batou", "Shengi", "Aramaki"],
            correctgif: "assets/images/characters.gif"
        },
        {
            question: "When was the original movie released",
            correctAnswer: "1995",
            answers: ["1995", "1984", "2001", "1991"],
            correctgif: "assets/images/year.gif"
        },
        {
            question: "What name does the main character go by",
            correctAnswer: "Major",
            answers: ["Boss", "Major", "Captain", "Chip"],
            correctgif: "assets/images/major.gif"
        },
        {
            question: "What country is the story based in",
            correctAnswer: "Japan",
            answers: ["Japan", "South Korea", "Taiwan", "China"],
            correctgif: "assets/images/year.gif"
        },
        ],

        correctAnswers: 0,
        incorrectAnswers: 0,
        unanswered: 0,
        currentQuestion: null,
        answerStatus: null,
        counter: null,
        qustionIndex: 0,

        startGame: function () {
            this.resetVariables();
            this.shuffle(this.questions);
            this.setQuestion();
        },

        shuffle: function(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        },

        setQuestion: function () {
            this.answerStatus = null;
            this.currentQuestion = this.questions[this.questionIndex];
            this.setPlayArea();
            this.startTimer();
        },

        setPlayArea: function () {
            var questionArray = this.currentQuestion.options;
            this.shuffle(questionArray);
            for (var optionIndex = 0; optionIndex < questionArray.length; optionIndex++) {
                var optionNumbers = "option-" + (optionIndex + 1);
                var newButton = $("<button></button>");
                newButton.attr("type", "button");
                newButton.addClass("btn btn-default btn-lg btn-block option");
                newButton.attr("id", optionNumbers);
                $("#buttons").append(newButton);
                $("#" + optionNumbers).text(questionArray[optionIndex]);
            }
            $("#question").text(this.currentQuestion.question);
        },

        getAnswer: function () {
            if (answer == "Out of Time") {
                console.log(this.answerStatus);
                this.unanswered++;
            }
            else if (answer == this.currentQuestion.correctAnswer) {
                this.answerStatus = "Correct";
                console.log(answerStatus);
                this.correctAnswers++;
            }
            else {
                this.answerStatus = "Wrong";
                console.log(answerStatus);
                this.incorrectAnswers++;
            }
            this.stopTimer();
            this.setAnswerPage();
        },

        setImange: function () {
            $("#image-area").addClass("active-image");
            $("#image-area").attr("src", this.currentQuesiton.answerImage);

        },

        setAnswerPage: function () {
            var self = this;
            $("question").text(this.answerStatus);
            $("#buttons").empty();
            this.setImage();

            if (this.answerStatus == "Wrong") {
                $("#answer").text("The correct answer is " + this.currentQuestion.correctAnswer);
            }

            setTimeout(function () {
                $("#answer").empty();
                $("#image-area").removeClass("active-image");
                $("#image-area").attr("src", "");
                if (self.questionIndex == self.questions.length - 1) {
                    self.setResults();
                } else {
                    self.questionIndex++;
                    self.setQuestion();
                }
            }, 5000);

        },

        startTimer: function () {
            var self = this;
            var count = 30;
            $("#timer").text("Time Remaining: " + count);
            this.counter = setInterval(function () {
                count = count - 1;
                $("#timer").text("Time Reaming: " + count);
                if (count <= 0) {
                    self.answerStatus = "Out of Time";
                    self.getAnswer(self.answerStatus);
                    return;
                }
            }, 1000);
        },

        stopTimer: function () {
            clearInterval(this.counter);
        },

        setResults: function () {
            var self = this;
            $("#question").empty();
            $("#timer").empty();
            $("#results").append("<h1>Correct: " + this.correctAnswers + "</h1>");
            $("#results").append("<h1>Incorrect: " + this.incorrectAnswers + "</h1>");
            $("#results").append("<h1>Unanswered: " + this.unanswered + "</h1>");

            setTimeout(function () {
                $("#results").empty();
                self.startGame();
            }, 5000);
        },

        resetVariables: function () {
            this.correctAnswers = 0;
            this.incorrectAnswers = 0;
            this.unanswered = 0;
            this.currentQuestion = 0;
            this.answerStatus = null;
            this.counter = null;
            this.questionIndex = 0;

        }
    }

    $("#start-button").on("click", function () {
        $("#buttons").empty();
        trivia.startGame();
    });

    $("#buttons").on("click", ".option", function () {
        var answer = $(this).text();
        trivia.getAnswer(answer);
    });

});


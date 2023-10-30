// Global variables 
var startButton = document.getElementById("start-button");
var highscoreButton = document.getElementById("highscore-button")
var startScreen = document.getElementById("start-screen")
var quizScreen = document.getElementById("quiz-screen")
var endScreen = document.getElementById("end-screen")
var highscoreScreen = document.getElementById("highscore-screen")

var currentQuestion = 0;
var timeLeft = 60;
var timer;

// Quiz questions
var questions = [
    {
        question: "Q1",
        choices: ["1", "2", "3", "4"],
        answer: 1 
    },
    {
        question: "Q2",
        choices: ["1", "2", "3", "4"],
        answer: 1 
    },
    {
        question: "Q3",
        choices: ["1", "2", "3", "4"],
        answer: 1 
    },
    {
        question: "Q4",
        choices: ["1", "2", "3", "4"],
        answer: 1 
    },
    {
        question: "Q5",
        choices: ["1", "2", "3", "4"],
        answer: 1 
    }
];


// Start quiz function 
startButton.addEventListener("click", startQuiz)

function startQuiz() {
    startScreen.style.display = "none"; // Hide start screen
    quizScreen.style.display = "block"; // Display quiz screen
    showQuestion();
    startTimer();
}

// Start timer function 
function startTimer() {
    timer = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time-left").textContent = timeLeft;
        } else {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Show questions function 
function showQuestion() {
    if (currentQuestion < questions.length) {
        var currentQuestionEl = questions[currentQuestion];

        // Update question text
        var questionEl = document.querySelector("#quiz-screen h3");
        questionEl.textContent = currentQuestionEl.question;

        // Update options text
        var optionButtons = document.querySelectorAll("#quiz-screen .option-button");

        // Event listener for each option button
        optionButtons.forEach(function (button, index) {
            button.addEventListener('click', function() {
                var selectedAnswer = index;
                userAnswers[currentQuestion] = selectedAnswer;

                currentQuestion++; // Next question
                
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    endQuiz();
                }
        })
    });
    } else {
        endQuiz();
    }
}

// Store user answers 
var userAnswers = [];


// Calculate score function 
function calculateScore() {
    var score = 0;
    for (var i = 0; i < questions.length; i++) {
        if (userAnswers[i] === questions[i].answer) {
            score += 10;
        }
    }
    return score;
}



// End quiz function 
function endQuiz() {
    clearInterval(timer); // Ends timer

    quizScreen.style.display = "none"; // Hides quiz screen 
    endScreen.style.display = "block"; // Display end screen

    var totalScore = calculateScore();

    // Update score text 
    document.getElementById("final-score").textContent = totalScore;
}


// Show high scores functions
function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    var highScoresList = document.getElementById("highscores-list");
}

// Go back to quiz function 


// Clear high scores function 
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

// Event listeners 
startButton.addEventListener("click", startQuiz)

// Start quiz function 
function startQuiz() {
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
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
    if (currentQuestion < questions.length){
        var currentQuestionEl = questions[currentQuestion];

        // Update question text
        var questionEl = document.querySelector("#quiz-screen h3");
        questionEl.textContent = currentQuestionEl.question;

        var optionButtons = document.querySelectorAll("#quiz-screen .option-button");
        optionButtons.forEach(function(button, index) {
            if (currentQuestionEl.choices[index]) {
                button.textContent = currentQuestionEl.choices[index];
            }
        });
    } else {
        endQuiz();
    }
}


// End quiz function 


// Show high scores functions


// Go back to quiz function 


// Clear high scores function 
// Global variables 
var startButton = document.getElementById("start-button");
var highscoreButton = document.getElementById("highscore-button")
var startScreen = document.getElementById("start-screen")
var quizScreen = document.getElementById("quiz-screen")
var endScreen = document.getElementById("end-screen")
var highscoreScreen = document.getElementById("highscores-screen")

var currentQuestion = 0;
var timeLeft = 60;
var timer;

// Quiz questions
var questions = [
    {
        question: "How is a JavaScript put into an HTML file",
        choices: [
        "<js>",
        "<javascript>",
        "<scripting>", 
        "<script>"
        ],
        answer: 3 
    },
    {
        question: "Which is not a comparison operator?",
        choices: [
            "===",
            "!",
            ">", 
            "<"
            ],
        answer: 1 
    },
    {
        question: "How does a FOR loop start?",
        choices: [
            "for i= 1 to 5",
            "for (i = 0; <= 2)",
            "for (i <= 4; i++)", 
            "for (i = 0; i <= 5; i++)"
            ],
        answer: 3 
    },
    {
        question: "How are comments added in JavaScript",
        choices: [
            "// Comment",
            "<!--Comment-->",
            "*Comment*", 
            "(Comment)"
            ],
        answer: 0 
    },
    {
        question: "Which operator is used to assign a value",
        choices: [
            "*",
            "X",
            "-", 
            "="
            ],
        answer: 3 
    }
];

// Display highscore screen function
function displayHighscoreScreen() {
    startScreen.style.display = "none"; 
    quizScreen.style.display = "none";
    endScreen.style.display = "none";
    highscoreScreen.style.display = "block";
}

// View highscores button
highscoreButton.addEventListener("click", displayHighscoreScreen)


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
        var questionEl = document.getElementById("question-text");
        questionEl.textContent = currentQuestionEl.question;

        // Update options text
        var optionButtons = document.querySelectorAll(".option-button");

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

    // Submit score 
    var submitButton = document.getElementById('submit-button');
    submitButton.addEventListener("click", function() {
        var initials = document.getElementById("initials").value;
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
       
        if (!Array.isArray(highScores)) {
            highScores = [];
        }

        highScores.push({ 
            initials: initials, 
            score: totalScore 
        });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        console.log(highScores);
        
        storeHighScores
        displayHighscoreScreen();
        
    })
}


// Show high scores functions
function storeHighScores() {
    var highScoresList = document.getElementById("highscores-list");
    highScoresList.innerHTML = '';

        highScores.forEach(function(scoreData) { 
            var li = document.createElement("li");
            li.textContent = `${scoreData.initials}: ${scoreData.score}`;
            highScoresList.appendChild(li);
        }
        );
}

// Go back to quiz function 
var goBackButton = document.getElementById("go-back");
goBackButton.addEventListener("click", function() {
    startScreen.style.display = "block";
    highscoreScreen.style.display = "none";
    currentQuestion = 0;
    timeLeft = 60;
    userAnswers = []; 
});

// Clear high scores function 
var clearHighscoresButton = document.getElementById('clear-highscores')
clearHighscoresButton.addEventListener("click", function() {
    localStorage.removeItem('highscores');
    highScoresList.innerHTML = '';
})
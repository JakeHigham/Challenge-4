const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Hyper Transfer Markup Language", "Hyperlink and Text Markup Language"],
        correctAnswer: 0
    },
    {
        question: "What is the correct way to comment in JavaScript?",
        options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["Number", "Boolean", "String", "Float"],
        correctAnswer: 3
    },
    {
        question: "What is the purpose of the 'addEventListener' method in JavaScript?",
        options: ["To add a new event handler", "To remove an event handler", "To create a new element", "To modify the document structure"],
        correctAnswer: 0
    },
    {
        question: "What is the result of the expression: 5 + '10' in JavaScript?",
        options: ["510", "15", "50", "Error"],
        correctAnswer: 0
    },
    {
        question: "How do you declare a variable in JavaScript?",
        options: ["let myVar;", "variable myVar;", "var myVar;", "const myVar;"],
        correctAnswer: 2
    },
    {
        question: "Which built-in method removes the last element from an array and returns that element?",
        options: ["pop()", "push()", "remove()", "deleteLast()"],
        correctAnswer: 0
    },
    {
        question: "What does CSS stand for?",
        options: ["Counter Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Cascading Style Sheets"],
        correctAnswer: 3
    },
    {
        question: "In CSS, how can you select an element with the ID 'myElement'?",
        options: ["#myElement", ".myElement", "element.myElement", "id.myElement"],
        correctAnswer: 0
    },
    {
        question: "Which of the following is a correct way to write a JavaScript array?",
        options: ["[1, 2, 3]", "{1, 2, 3}", "(1, 2, 3)", "<1, 2, 3>"],
        correctAnswer: 0
    }
];

// Is there a better way to store questions in an array?


const TIMER_DURATION = 60;
const gameOverScreen = document.getElementById("game-over");
const finalScoreValue = document.getElementById("final-score-value");
const highScoresList = document.getElementById("high-scores-list");

let currentQuestionIndex = 0;
let timer = 0;
let score = 0;
let timerInterval;

const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const timeSpan = document.getElementById("time");
const scoreSpan = document.getElementById("score-value");
const initialsInput = document.getElementById("initials-input");
const submitScoreBtn = document.getElementById("submit-score");
const highScoreContainer = document.getElementById("high-score");

startBtn.addEventListener("click", startQuiz);
submitScoreBtn.addEventListener("click", submitScore);

function startQuiz() {
    startBtn.style.display = "none";
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${currentQuestion.options.map((option, index) => `
            <button onclick="checkAnswer(${index})">${option}</button>
        `).join('')}
    `;
}

// will check answer and subtract ten seconds from timer for incorrect answers
function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.correctAnswer) {
        score += 10;
        updateScore();
    } else {
        timer -= 10;
        if (timer < 0) {
            timer = 0;
        }
        timeSpan.textContent = timer;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    timer = TIMER_DURATION;
    timeSpan.textContent = timer; 
    timerInterval = setInterval(() => {
        timer--;
        if (timer >= 0) {
            timeSpan.textContent = timer;
        } else {
            endQuizDueToTimeout();
        }
    }, 1000);
}

function updateScore() {
    scoreSpan.textContent = score;
}

// Ends quiz due to timer hitting 0, also hides game over display until timer reaches zero or quiz ends.

function endQuizDueToTimeout() {
    clearInterval(timerInterval);
    initialsInput.style.display = "block";
    submitScoreBtn.style.display = "block";
    gameOverScreen.style.display = "inline";
    displayHighScore();
}

function endQuiz() {
    gameOverScreen.style.display = "none";
    clearInterval(timerInterval);
    initialsInput.style.display = "block";
    submitScoreBtn.style.display = "block";
    displayHighScore();
    endQuiz();
}

// Handles submitting score and storing locally, also displays alert when initials are not submitted
function submitScore() {
    const initials = initialsInput.value;

    if (initials.trim() !== "") {
        localStorage.setItem('highScore', JSON.stringify({ initials, score }));
        displayHighScore();
    } else {
        alert("Please enter your initials before submitting the score.");
    }
}

function displayHighScore() {
    const highScoreData = JSON.parse(localStorage.getItem('highScore'));

    if (highScoreData) {
        highScoreContainer.textContent = `High Score: ${highScoreData.initials} - ${highScoreData.score}`;
    }
}
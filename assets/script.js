// Define all html objects as variables
var startBtn = document.getElementById('start-btn');
var nextBtn = document.getElementById('next-btn');
var saveScoreBtn = document.getElementById('save-btn');
var introEl = document.getElementById('intro');
var questionContainer = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var headerEl = document.getElementById('header');
var timerEl = document.querySelector('.timer-count');
var scoreEl = document.querySelector('.score');
var userName = document.querySelector('#user-name')
var highScoreList = document.querySelector('#high-score-list')
var allBtn = document.querySelector('.btn')

//Define variables to be used in js
let randomQuestion = [];
let currentQuestion = [];
let timer;
let timerCount;
let scoreCounter;
let userInitials;
let scores = [];
let highScore = [];

// Array of questions and associated answers
const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<JS>", correct:false },
            { text: "<Script>", correct:true },
            { text: "<JavaScript>", correct:false },
            { text: "<Javascript>", correct:false },
        ]
    },
    {
        question: "Which method would return length of a string?",
        answers: [
            { text: "length()", correct:true },
            { text: "size()", correct:false },
            { text: "indexlength()", correct:false },
            { text: "string()", correct:false },
        ]
    },
    {
        question: "How do you find the minimum of x and y?",
        answers: [
            { text: "min(x,y)", correct:false },
            { text: "minimum(x,y)", correct:false },
            { text: "minvalue(x,y)", correct:false },
            { text: "Math.min(x,y)", correct:true },
        ]
    },
    {
        question: "What does DOM stand for?",
        answers: [
            { text: "Designated Object Mode", correct:false },
            { text: "Design Original Model", correct:false },
            { text: "Document Object Model", correct:true },
            { text: "Don't Objectify Monkeys", correct:false },
        ]
    },
    {
        question: "Which method combines the text of two strings and returns a new string?",
        answers: [
            { text: "concat()", correct:true },
            { text: "append()", correct:false },
            { text: "combine()", correct:false },
            { text: "attach()", correct:false },
        ]
    }
]

//Button Click event listeners
startBtn.addEventListener('click', startGame)
nextBtn.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})
saveScoreBtn.addEventListener('click', saveScore)

//game starts -> randomize questions then show question
function startGame() {
    reset()
    timerCount = 60;
    timerEl.textContent = 60;
    scoreCounter = 0;
    scoreEl.textContent = scoreCounter;
    headerEl.classList.remove('hidden');
    startBtn.classList.add('hidden');
    introEl.classList.add('hidden');
    userName.classList.add('hidden');
    saveScoreBtn.classList.add('hidden');
    
    questionContainer.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    // console.log(randomQuestion)
    // console.log(question)
    currentQuestion = 0;
    nextQuestion()
    startTimer()
} 

function startTimer() {
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount < 1 ) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

//Game ends if out of time, asks for restart
function endGame() {
    reset()
    questionEl.innerText = "Sorry, you have run out of time. Please hit 'Restart' to try again."
    startBtn.classList.remove('hidden')
    startBtn.innerText = "Restart"
}

// for next button, create a function that clears the card and shows next random question
function nextQuestion () {
    reset()
    showQuestion(randomQuestion[currentQuestion])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.classList.add('btn');
        if (answer.correct === true){
            button.dataset.correct = answer.correct;
            
        };
        button.innerText = answer.text;
        answerBtnEl.appendChild(button);
        button.addEventListener('click', selectAnswer);
    })
}

function reset() {
    nextBtn.classList.add('hidden')
    while (answerBtnEl.firstChild){
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}

// When answer is sellected it checks correctness, sets the correct answer to green, wrong answers to red, then checks next question else it ends the game and moves on to high score
function selectAnswer(i) {
    var selectedBtn = i.target;
    var correct = selectedBtn.dataset.correct;
    if (selectedBtn.dataset.correct == true){ 
        scoreCounter = scoreCounter + 20;
        scoreEl.textContent = scoreCounter;
    }

    setBtnClass(document.body, correct)
    // correctAnswer()
    Array.from(answerBtnEl.children).forEach(button => {
        setBtnClass(button, button.dataset.correct)
    })

    if (correct){ 
        scoreCounter = scoreCounter + 20;
        scoreEl.textContent = scoreCounter;
    }

    if (!correct){
        timerCount
    }

    if (randomQuestion.length > currentQuestion + 1) {
        nextBtn.classList.remove('hidden')
    }
    else { 
        clearInterval(timer)
        startBtn.classList.remove('hidden');
        userName.classList.remove('hidden');
        saveScoreBtn.classList.remove('hidden');
        questionEl.innerText = "Please enter your name to save your high score!"
        while (answerBtnEl.firstChild){
            answerBtnEl.removeChild(answerBtnEl.firstChild)
        }
        startBtn.innerText = "Restart";
        localStorage.setItem('recentScore', scoreCounter);
    }
}
// Function saves the score to local storage, it then keeps adding the scores to local storage but only keeps the top 5 scores
function saveScore(e) {
    const recentScore = localStorage.getItem('recentScore')
    // console.log(recentScore)
    // console.log(userName.value)
    var score = {
        score: recentScore,
        name: userName.value,
    }
    highScore.push(score);
    highScore.sort((a,b) => b.score - a.score);
    highScore.splice(5);
    localStorage.setItem('highScore', JSON.stringify(highScore));
    saveScoreBtn.classList.add('hidden');
    renderHighScores ()
    
};

//Function to render the stored score and name array as a list item
function renderHighScores (){
    var highScore = JSON.parse(localStorage.getItem('highScore'))
    console.log(highScore)
    highScoreList.innerHTML = highScore.map(score => {
        return `<li class="high-score">${score.name} : ${score.score} pts</li>`
    }).join("");
}


// This function sets the wrong answer buttons to red and correct answer buttons to green
function setBtnClass (element, correct) {
    clearBtnClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}


// This function clears the red and green coloring of buttons
function clearBtnClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
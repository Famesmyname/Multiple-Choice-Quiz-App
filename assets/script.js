// Define all html objects as variables
var startBtn = document.getElementById('start-btn');
var nextBtn = document.getElementById('next-btn');
var introEl = document.getElementById('intro');
var questionContainer = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var headerEl = document.getElementById('header');
var timerEl = document.querySelector('.timer-count');
var scoreEl = document.querySelector('.score');

//Define variables to be used in js
let randomQuestion = [];
let currentQuestion = [];
let timer;
let timerCount;
let scoreCounter;

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


//game starts -> randomize questions then show question
function startGame() {
    timerCount = 30;
    timerEl.textContent = 30;
    scoreCounter = 0;
    scoreEl.textContent = scoreCounter;
    headerEl.classList.remove('hidden')
    startBtn.classList.add('hidden');
    introEl.classList.add('hidden')
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
    if (timerCount === 0) {
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


function selectAnswer (i) {
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

    if (randomQuestion.length > currentQuestion + 1) {
        nextBtn.classList.remove('hidden')
    }
    else { 
        startBtn.classList.remove('hidden')
        startBtn.innerText = "Restart"
    }
    
}

function setBtnClass (element, correct) {
    clearBtnClass(element)
    if (correct) {
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearBtnClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
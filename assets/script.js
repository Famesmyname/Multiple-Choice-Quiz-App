// Define all html objects as variables
var startBtn = document.getElementById('start-btn');
var nextBtn = document.getElementById('next-btn');
var introEl = document.getElementById('intro')
var questionContainer = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');

//Define variables to be used in js
let randomQuestion = [];
let currentQuestion = [];

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
        question: "How is it?",
        answers: [
            { text: "Yes", correct:true },
            { text: "No", correct:false },
            { text: "Maybe", correct:false },
            { text: "Yar", correct:false },
        ]
    },
    {
        question: "How is it?",
        answers: [
            { text: "Yes", correct:true },
            { text: "No", correct:false },
            { text: "Maybe", correct:false },
            { text: "Yar", correct:false },
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
    startBtn.classList.add('hidden');
    introEl.classList.add('hidden')
    questionContainer.classList.remove('hidden');
    randomQuestion = questions.sort(() => Math.random() - .5);
    // console.log(randomQuestion)
    // console.log(question)
    currentQuestion = 0;
    nextQuestion()
}

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
    var correctBtn = selectedBtn.dataset.correct;
    // correctAnswer()
    Array.from(answerBtnEl.children).forEach(button => {
        setBtnClass(button, button.dataset.correct)
    })
    if (randomQuestion.length > currentQuestion + 1) {
        nextBtn.classList.remove('hidden')
    }
    else {
        startBtn.innerText = ""
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
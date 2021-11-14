const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
var c = 40;

let currentQuestion = {};
let accceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What does HTML stand for?",
    choice1: "Home Tool Markup Language",
    choice2: "Hyper Text Markup Language",
    choice3: "Hyperlinks and Text Markup Language",
    choice4: "Hyper Text Manipulation Language",
    answer: 2,
  },
  {
    question:
      "_______ is the process of finding errors and fixing them within a program.",
    choice1: "Compiling",
    choice2: "Executing",
    choice3: "Debugging",
    choice4: "Scanning",
    answer: 3,
  },
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "Strings",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    answer: 3,
  },
  {
    question: "A loop that never ends is referred to as a(n)_________.",
    choice1: "While loop",
    choice2: "Infinite loop",
    choice3: "Recursive loop",
    choice4: ") for loop",
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

function timer001() {
  c = c - 1;
  if (c < 40) {
    time001.innerHTML = c;
  }
  if (c < 1) {
    window.clearInterval(update);
    return window.location.assign("end.html");
  }
}
update = setInterval("timer001()", 1000);
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);

  currentQuestion = availableQuestions[questionsIndex];

  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  accceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!accceptingAnswers) return;
    accceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();

const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
var c = 60;

let currentQuestion = {};
let accceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What is 2 + 2",
    choice1: "4",
    choice2: "8",
    choice3: "16",
    choice4: "21",
    answer: 1,
  },
  {
    question: "What is 16 + 7",
    choice1: "2",
    choice2: "8",
    choice3: "16",
    choice4: "23",
    answer: 4,
  },
  {
    question: "What is 21 + 52",
    choice1: "2",
    choice2: "8",
    choice3: "16",
    choice4: "21",
  },
  {
    question: "What is 32 + 22",
    choice1: "2",
    choice2: "8",
    choice3: "16",
    choice4: "21",
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

function timer001() {
  c = c - 1;
  if (c < 60) {
    time001.innerHTML = c;
  }
  if (c < 1) {
    window.clearInterval(update);
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

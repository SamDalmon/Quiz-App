import { allQuestions } from "../res/quiz-questions.js";

const states = {
  howTo: "how-to",
  quiz: "quiz",
  performanceReview: "performance-review"
};

const questionTypes = {
  multiChoice: "multi-choice",
  trueFalse: "true-false",
  fillInTheBlank: "fill-in-the-blank"
}

const numQuestions = 10;

let currentState = states.howTo;
let currentQuestion = 0;
let questions = [];

const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");
const howToSection = document.getElementById("how-to");
const quizSection = document.getElementById("quiz");
const answerInputs = document.getElementsByClassName("answer-input");
const questionTypeElement = document.getElementById("question-type");
const questionElement = document.getElementById("question");
const multiChoiceInput = document.getElementById(questionTypes.multiChoice+"-input");
const trueFalseInput = document.getElementById(questionTypes.trueFalse+"-input");
const fillInTheBlankInput = document.getElementById(questionTypes.fillInTheBlank+"-input");
const multiChoiceButtons = document.getElementsByClassName("option");

function handleNextButtonClicked(){
  if (currentState === states.howTo){
    loadQuestions();
    hideAll();
    loadQuestion();
    quizSection.hidden = false;
    nextButton.innerHTML = "Next";
    currentState = states.quiz

  } else if (currentState === states.quiz){
    hideAll()
    quizSection.hidden = false;
    currentQuestion += 1;

    if(currentQuestion > 0){
      backButton.disabled = false;
    }
    if(currentQuestion === questions.length - 1){
      nextButton.innerHTML = "Submit"
    }

    loadQuestion();
  }
}

function handleBackButtonClicked(){
  currentQuestion -= 1;
  if(currentQuestion === 0){
    backButton.disabled = true;
  }
  loadQuestion();
}

function hideAll(){
  howToSection.hidden = true;
  quizSection.hidden = true;
  Array.from(answerInputs).forEach((input) => {
    input.hidden = true;
  });
}

function loadQuestions(){
  const addedQuestions = [] //array of question indexes added
  for(let i = 0; i < numQuestions; i++){
    let randNum;
    do {
      randNum = Math.round(Math.random() * allQuestions.length);
    } while (addedQuestions.includes(randNum))
    questions.push(allQuestions[randNum]);
    addedQuestions.push(randNum)
  }
  console.log(questions)
}

function loadQuestion(){
  const question = questions[currentQuestion];
  questionTypeElement.innerHTML = question.type;
  questionElement.innerHTML = question.question;
  switch(question.type){
    case questionTypes.multiChoice:
      multiChoiceInput.hidden = false;
      for (let i = 0; i < 4; i++){
        multiChoiceButtons[i].innerHTML = question.options[i];
      }
      break;
    case questionTypes.trueFalse:
      trueFalseInput.hidden = false;
      break;
    case questionTypes.fillInTheBlank:
      fillInTheBlankInput.hidden = false;
      break;
    default:
      console.log("Invalid Question Type!!!")
  }

}

nextButton.addEventListener("click", handleNextButtonClicked);
backButton.addEventListener("click", handleBackButtonClicked);


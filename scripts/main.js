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
const questions = [];
const answers = Array(numQuestions).fill(null); //stores answers entered by users

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
const trueButton = document.getElementById("true-button");
const falseButton = document.getElementById("false-button");
const answerButtons = document.getElementsByClassName("answer-button");
const textEntry = document.getElementById("text-entry");

function handleNextButtonClicked(){
  if (currentState === states.howTo){
    loadQuestions();
    hideAll();
    loadQuestion();
    quizSection.hidden = false;
    nextButton.innerHTML = "Next";
    nextButton.disabled = true;
    currentState = states.quiz

  } else if (currentState === states.quiz){
    hideAll();
    quizSection.hidden = false;
    currentQuestion += 1;
    if(answers[currentQuestion] === null){
      nextButton.disabled = true;
    }
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
  hideAll();
  quizSection.hidden = false;
  currentQuestion -= 1;
  if(currentQuestion === 0){
    backButton.disabled = true;
  }
  if(answers[currentQuestion] !== null){
    nextButton.disabled = false;
  }
  loadQuestion();
}

function handleAnswerInput({target}){
  nextButton.disabled = false;
  enableAllButtons();
  if (target.type !== "text") {
    target.disabled = true;
  }
  answers[currentQuestion] = target.value;
}

function hideAll(){
  howToSection.hidden = true;
  quizSection.hidden = true;
  Array.from(answerInputs).forEach((input) => {
    input.hidden = true;
  });
}

function enableAllButtons(){
  Array.from(answerButtons).forEach((button)=>{
    button.disabled = false;
  })
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
  enableAllButtons();
  const question = questions[currentQuestion];
  questionTypeElement.innerHTML = question.type;
  questionElement.innerHTML = question.question;
  switch(question.type){
    //Multi choice question
    case questionTypes.multiChoice:
      multiChoiceInput.hidden = false;
      for (let i = 0; i < 4; i++){
        const text = question.options[i]; //button text
        multiChoiceButtons[i].innerHTML = text;
        multiChoiceButtons[i].value = text;
        if(text === answers[currentQuestion]){
          multiChoiceButtons[i].disabled = true;
        }
      }
      break;
    //True or false question
    case questionTypes.trueFalse:
      trueFalseInput.hidden = false;
      switch(answers[currentQuestion]){
        case "true":
          trueButton.disabled = true;
          break;
        case "false":
          falseButton.disabled = true;
          break;
      }
      break;
    //Fill in the blank question
    case questionTypes.fillInTheBlank:
      fillInTheBlankInput.hidden = false;
      if(answers[currentQuestion] !== null){
        textEntry.value = answers[currentQuestion];
      }
      break;
    //Invalid question 
    default:
      console.log("Invalid Question Type!!!")
  }

}

nextButton.addEventListener("click", handleNextButtonClicked);
backButton.addEventListener("click", handleBackButtonClicked);
Array.from(answerButtons).forEach((button)=>{
  button.addEventListener("click", handleAnswerInput);
});
textEntry.addEventListener("input", handleAnswerInput);



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

const numQuestions = 5;
let currentState = states.howTo;
let currentQuestion;
let questions;
let answers; //stores answers entered by users

//Navigation
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

//Sections
const howToSection = document.getElementById("how-to");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("performance-review");

//Quiz Elements
const questionTypeElement = document.getElementById("question-type");
const questionElement = document.getElementById("question");
const multiChoiceInput = document.getElementById(questionTypes.multiChoice+"-input");
const trueFalseInput = document.getElementById(questionTypes.trueFalse+"-input");
const fillInTheBlankInput = document.getElementById(questionTypes.fillInTheBlank+"-input");
const answerInputs = [multiChoiceInput, trueFalseInput, fillInTheBlankInput];
const multiChoiceButtons = document.getElementsByClassName("option");
const trueButton = document.getElementById("true-button");
const falseButton = document.getElementById("false-button");
const answerButtons = document.getElementsByClassName("answer-button");
const textEntry = document.getElementById("text-entry");

//Performance Review
const scoreDisplay = document.getElementById("score-display");
const messageDisplay = document.getElementById("message-display");
const resultsTable = document.getElementById("results-table");

function handleNextButtonClicked(){
  hideAll();
  enableAllButtons()
  switch (currentState){
    case states.howTo:
      questions = [];
      answers = Array(numQuestions).fill(null);
      currentQuestion = 0;
      resultsTable.innerHTML = "";
      loadQuestions();
      quizSection.hidden = false;
      loadQuestion();
      nextButton.innerHTML = "Next";
      nextButton.disabled = true;
      currentState = states.quiz;
      break;

    case states.quiz:
      if(currentQuestion < numQuestions - 1){
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
      } else {
        resultsSection.hidden = false;
        nextButton.disabled = false;
        nextButton.innerHTML = "Play Again"
        backButton.disabled = true;
        currentState = states.performanceReview;
        showResults()
      }
      break;

    case states.performanceReview:
      howToSection.hidden = false;
      nextButton.innerHTML = "Start Quiz";
      nextButton.disabled = false;
      backButton.disabled = true;
      currentState = states.howTo;
      break;
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
  answers[currentQuestion] = target.value.toLowerCase();
  
  nextButton.disabled = false;
  enableAllButtons();
  if (target.type !== "text") {
    target.disabled = true;
  }
}

function hideAll(){
  howToSection.hidden = true;
  quizSection.hidden = true;
  resultsSection.hidden = true;
  answerInputs.forEach((input) => {
    input.style.display = "none"
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
      randNum = Math.floor(Math.random() * allQuestions.length);
    } while (addedQuestions.includes(randNum))
    questions.push(allQuestions[randNum]);
    addedQuestions.push(randNum)
  }
  console.log(questions)
}

function loadQuestion(){
  enableAllButtons();
  textEntry.value = "";
  const question = questions[currentQuestion];
  questionTypeElement.innerHTML = question.type;
  questionElement.innerHTML = question.question;
  // Hide all answer input containers before showing the correct one
  switch(question.type){
    //Multi choice question
    case questionTypes.multiChoice:
      //console.log("multi-choice question");
      multiChoiceInput.style.display = "grid";
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
      //console.log("true-false question");
      trueFalseInput.style.display = "grid";
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
      //console.log("fill-In-The-Blank question");
      fillInTheBlankInput.style.display = "block";
      if(answers[currentQuestion] !== null){
        textEntry.value = answers[currentQuestion];
      }
      break;
    //Invalid question 
    default:
      console.log("Invalid Question Type!!!");
  }

}

function showResults(){
  let numCorrect = 0;
  questions.forEach(({question, correctAnswer}, i)=>{
    correctAnswer = String(correctAnswer).toLocaleLowerCase();
    const isCorrect = correctAnswer.includes(answers[i]); 
    const color = isCorrect ? "#9de060" : "#f76d71";
    numCorrect += Number(isCorrect);
    const componentHTML = `
      <tr style="background-color: ${color}">
        <td>${question}</td>
        <td>${answers[i]}</td>
        <td>${correctAnswer}</td>
      </tr>
    `
    resultsTable.insertAdjacentHTML('beforeend', componentHTML);
  });
  const correctRatio = numCorrect/numQuestions;
  scoreDisplay.innerHTML = numCorrect + "/" + numQuestions;
  
  
  //Thease messages were bought to you by chat GPT
  let message = "";
  if(correctRatio === 1){
    message = "Flawless. NASA just called — they want to study your brain.";
  } else if (correctRatio === 0){
    message = "0 correct is CRAZY. This wasn't a quiz — this was free-range button mashing. \
      Bro said 'lock in' and immediately logged out. Absolute NPC behaviour. \
      No thoughts. Head empty. Wi-Fi connected but brain buffering.";
  } 
  else if (correctRatio >= 0.5){
    message = "Respectable. You definitely spend time online… maybe a healthy amount.";
  } else if (correctRatio >= 0.33){
    message = "Okay… not great, not terrible. You've seen memes, just not paying attention.";
  } else {
    message = "Yikes. This score just got ratioed.";
  }
  messageDisplay.innerHTML = message;
}

//Event Listeners
nextButton.addEventListener("click", handleNextButtonClicked);
backButton.addEventListener("click", handleBackButtonClicked);
Array.from(answerButtons).forEach((button)=>{
  button.addEventListener("click", handleAnswerInput);
});
textEntry.addEventListener("input", handleAnswerInput);



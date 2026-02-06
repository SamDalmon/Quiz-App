//import { allQuestions } from "../res/quiz-questions.js";
import Quiz from "./Quiz.js";

//The states the App can be in
const states = {
  howTo: "how-to",
  quiz: "quiz",
  performanceReview: "performance-review"
};

//Question types
/*
const questionTypes = {
  multiChoice: "multi-choice",
  trueFalse: "true-false",
  fillInTheBlank: "fill-in-the-blank"
}
*/

//Navigation
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

//Sections
const howToSection = document.getElementById("how-to");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("performance-review");

//Quiz Elements
/*
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
*/

//Performance Review
const scoreDisplay = document.getElementById("score-display");
const messageDisplay = document.getElementById("message-display");
const resultsTable = document.getElementById("results-table");

//const numQuestions = 5; //The total number of questions in a quiz (can be increased)
let currentState = states.howTo;
let quiz;
//let currentQuestion;
//let questions;
//let answers; //stores answers entered by users

//Called when next button pressed
function handleNextButtonClicked(){
  //Resets UI
  hideAll();
  Quiz.enableAllButtons()

  //Sets UI based on state
  switch (currentState){
    case states.howTo:
      //Resets all state variables
      resultsTable.innerHTML = "";
      nextButton.innerHTML = "Next";
      nextButton.disabled = true;
      currentState = states.quiz;
      quizSection.hidden = false;
      quiz = new Quiz();
      /*
      questions = [];
      answers = Array(numQuestions).fill(null);
      currentQuestion = 0;
      
      loadQuestions();
      
      loadQuestion();
      
      */
      break;

    case states.quiz:
      if(quiz.currentQuestion < Quiz.numQuestions - 1){
        //Navigate to next question and set up UI
        quizSection.hidden = false;
        quiz.nextQuestion();
        //currentQuestion += 1;
        if(quiz.answers[quiz.currentQuestion] === null){
          nextButton.disabled = true;
        }
        if(quiz.currentQuestion > 0){
          backButton.disabled = false;
        }
        if(quiz.currentQuestion === Quiz.numQuestions - 1){
          nextButton.innerHTML = "Submit"
        }
        //loadQuestion();
      } else {
        //Navigate to Performance review and set up UI
        resultsSection.hidden = false;
        nextButton.disabled = false;
        nextButton.innerHTML = "Play Again"
        backButton.disabled = true;
        currentState = states.performanceReview;
        showResults();
      }
      break;

    case states.performanceReview:
      //Navigate to Landing Page and set up UI
      howToSection.hidden = false;
      nextButton.innerHTML = "Start Quiz";
      nextButton.disabled = false;
      backButton.disabled = true;
      currentState = states.howTo;
      break;
  }
}

//Navigate to previous question and set up UI
function handleBackButtonClicked(){
  hideAll();
  quizSection.hidden = false;
  nextButton.innerHTML = "Next"
  quiz.previousQuestion()
  //currentQuestion -= 1;
  if(quiz.currentQuestion === 0){
    backButton.disabled = true;
  }
  if(quiz.answers[quiz.currentQuestion] !== null){
    nextButton.disabled = false;
  }
  //loadQuestion();
}

//Save entered answer and enable next button
function handleAnswerInput({target}){
  //answers[currentQuestion] = target.value.toLowerCase().trim();
  quiz.setAnswer(target.value.toLowerCase().trim());
  nextButton.disabled = false;
  Quiz.enableAllButtons();
  if (target.type !== "text") {
    target.disabled = true;
  }
}

//Hides all app sections and answer inputs  
function hideAll(){
  howToSection.hidden = true;
  quizSection.hidden = true;
  resultsSection.hidden = true;
  Quiz.hideAnswerInputs();
  /*
    answerInputs.forEach((input) => {
      input.style.display = "none"
    });
  */
}

/*
function enableAllButtons(){
  Array.from(answerButtons).forEach((button)=>{
    button.disabled = false;
  })
}
*/

//Generates a random list of questions from all of the questions
/*
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
*/

//Sets up UI for current question
/*
function loadQuestion(){
  enableAllButtons();
  textEntry.value = "";
  const question = questions[currentQuestion];

  //Display question type and question
  questionTypeElement.innerHTML = question.type;
  questionElement.innerHTML = question.question;
  
  // Set up UI for corresponding question type
  switch(question.type){
    //Multi choice question
    case questionTypes.multiChoice:
      multiChoiceInput.style.display = "grid";
      for (let i = 0; i < 4; i++){
        const text = question.options[i]; //button text
        multiChoiceButtons[i].innerHTML = text;
        multiChoiceButtons[i].value = text;
        if(text.toLowerCase() === answers[currentQuestion]){
          multiChoiceButtons[i].disabled = true;
        }
      }
      break;

    //True or false question
    case questionTypes.trueFalse:
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
      fillInTheBlankInput.style.display = "block";
      if(answers[currentQuestion] !== null){
        textEntry.value = answers[currentQuestion];
      }
      break;

    //Invalid question 
    default:
      questionElement.innerHTML = "Invalid Question Type!!!";
  }

}
*/

//Display UI for performance review
function showResults(){
  let numCorrect = 0;
  console.log(quiz.answers);

  //Iterates through questions and answers to add results to table
  quiz.questions.forEach(({question, correctAnswer}, i)=>{
    correctAnswer = String(correctAnswer).toLowerCase();
    const isCorrect = correctAnswer.includes(quiz.answers[i]); 
    const color = isCorrect ? "#9de060" : "#f76d71";
    numCorrect += Number(isCorrect);
    const componentHTML = `
      <tr style="background-color: ${color}">
        <td>${question}</td>
        <td>${quiz.answers[i]}</td>
        <td>${correctAnswer}</td>
      </tr>
    `
    resultsTable.insertAdjacentHTML('beforeend', componentHTML);
  });
  const correctRatio = numCorrect/Quiz.numQuestions;
  scoreDisplay.innerHTML = numCorrect + "/" + Quiz.numQuestions;
  
  //These messages were bought to you by chat GPT
  let message = "";
  if(correctRatio === 1){
    message = "Flawless. NASA just called — they want to study your brain.";
  } else if (correctRatio === 0){
    message = "0 correct is CRAZY. This wasn't a quiz — this was free-range button mashing. \
      Bro said 'lock in' and immediately logged out. Absolute NPC behavior. \
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
Array.from(Quiz.answerButtons).forEach((button)=>{
  button.addEventListener("click", handleAnswerInput);
});
Quiz.textEntry.addEventListener("input", handleAnswerInput);

document.addEventListener("keydown", ({key}) => {
  switch(key){
    case("Enter"): 
      if(!nextButton.disabled){
        handleNextButtonClicked();
      }
      break;
  }
});



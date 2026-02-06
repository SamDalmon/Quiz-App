import Quiz from "./Quiz.js";
import PerformanceReview from "./PerformanceReview.js";

//The states the App can be in
const states = {
  howTo: "how-to",
  quiz: "quiz",
  performanceReview: "performance-review"
};

//Navigation
const nextButton = document.getElementById("next-button");
const backButton = document.getElementById("back-button");

//Sections
const howToSection = document.getElementById("how-to");
const quizSection = document.getElementById("quiz");
const resultsSection = document.getElementById("performance-review");

/*
//Performance Review
const scoreDisplay = document.getElementById("score-display");
const messageDisplay = document.getElementById("message-display");
const resultsTable = document.getElementById("results-table");
*/

let currentState = states.howTo;
let quiz;
let performanceReview;

//Called when next button pressed
function handleNextButtonClicked(){
  //Resets UI
  hideAll();
  Quiz.enableAllButtons()

  //Sets UI based on state
  switch (currentState){
    case states.howTo:
      //Resets all state variables
      //resultsTable.innerHTML = "";
      nextButton.innerHTML = "Next";
      nextButton.disabled = true;
      currentState = states.quiz;
      quizSection.hidden = false;
      quiz = new Quiz();
      break;

    case states.quiz:
      if(quiz.currentQuestion < Quiz.numQuestions - 1){
        //Navigate to next question and set up UI
        quizSection.hidden = false;
        quiz.nextQuestion();
        if(quiz.answers[quiz.currentQuestion] === null){
          nextButton.disabled = true;
        }
        if(quiz.currentQuestion > 0){
          backButton.disabled = false;
        }
        if(quiz.currentQuestion === Quiz.numQuestions - 1){
          nextButton.innerHTML = "Submit"
        }
      } else {
        //Navigate to Performance review and set up UI
        resultsSection.hidden = false;
        nextButton.disabled = false;
        nextButton.innerHTML = "Play Again"
        backButton.disabled = true;
        currentState = states.performanceReview;
        performanceReview = new PerformanceReview(quiz.questions, quiz.answers);
        performanceReview.showResults();
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
  if(quiz.currentQuestion === 0){
    backButton.disabled = true;
  }
  if(quiz.answers[quiz.currentQuestion] !== null){
    nextButton.disabled = false;
  }
}

//Save entered answer and enable next button
function handleAnswerInput({target}){
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



/* jshint esversion: 11 */
import { allQuestions } from "../res/quiz-questions.js";

export default class Quiz {

  static enableAllButtons(){
    Array.from(this.answerButtons).forEach((button)=>{
      button.disabled = false;
    });
  }

  static hideAnswerInputs(){
    this.answerInputs.forEach((input) => {
      input.style.display = "none";
    });
  }

  constructor(numQuestions){
    this.numQuestions = numQuestions;
    this.questions = [];
    this.currentQuestion = 0;
    this.answers = Array(this.numQuestions).fill(null);
    this.loadQuestions();
    this.loadQuestion();
  }

  setAnswer(value){
    this.answers[this.currentQuestion] = value;
  }

  nextQuestion(){
    this.currentQuestion += 1;
    this.loadQuestion();
  }

  previousQuestion(){
    this.currentQuestion -= 1;
    this.loadQuestion();
  }

  //Generates a random list of questions from all of the questions
  loadQuestions(){
    const addedQuestions = []; //array of question indexes added
    for(let i = 0; i < this.numQuestions; i++){
      let randNum;
      do {
        randNum = Math.floor(Math.random() * allQuestions.length);
      } while (addedQuestions.includes(randNum));
      this.questions.push(allQuestions[randNum]);
      addedQuestions.push(randNum);
    }
    console.log(this.questions);
  }
  
  //Sets up UI for current question
  loadQuestion(){
    Quiz.enableAllButtons();
    Quiz.textEntry.value = "";
    const question = this.questions[this.currentQuestion];
  
    //Display question type and question
    Quiz.questionTypeElement.innerHTML = question.type;
    Quiz.questionElement.innerHTML = question.question;
    
    // Set up UI for corresponding question type
    switch(question.type){
      //Multi choice question
      case Quiz.questionTypes.multiChoice:
        Quiz.multiChoiceInput.style.display = "grid";
        for (let i = 0; i < 4; i++){
          const text = question.options[i]; //button text
          Quiz.multiChoiceButtons[i].innerHTML = text;
          Quiz.multiChoiceButtons[i].value = text;
          if(text.toLowerCase() === this.answers[this.currentQuestion]){
            Quiz.multiChoiceButtons[i].disabled = true;
          }
        }
        break;
  
      //True or false question
      case Quiz.questionTypes.trueFalse:
        Quiz.trueFalseInput.style.display = "grid";
        switch(this.answers[this.currentQuestion]){
          case "true":
            Quiz.trueButton.disabled = true;
            break;
          case "false":
            Quiz.falseButton.disabled = true;
            break;
        }
        break;
  
      //Fill in the blank question
      case Quiz.questionTypes.fillInTheBlank:
        Quiz.fillInTheBlankInput.style.display = "block";
        if(this.answers[this.currentQuestion] !== null &&
          this.answers[this.currentQuestion] !== undefined
        ){
          Quiz.textEntry.value = this.answers[this.currentQuestion];
        }
        break;
  
      //Invalid question 
      default:
        Quiz.questionElement.innerHTML = "Invalid Question Type!!!";
    }
  }
}

//Question types
Quiz.questionTypes = {
  multiChoice: "multi-choice",
  trueFalse: "true-false",
  fillInTheBlank: "fill-in-the-blank"
};

//Document Elements
Quiz.questionTypeElement = document.getElementById("question-type");
Quiz.questionElement = document.getElementById("question");
Quiz.multiChoiceInput = document.getElementById(Quiz.questionTypes.multiChoice+"-input");
Quiz.trueFalseInput = document.getElementById(Quiz.questionTypes.trueFalse+"-input");
Quiz.fillInTheBlankInput = document.getElementById(Quiz.questionTypes.fillInTheBlank+"-input");
Quiz.answerInputs = [Quiz.multiChoiceInput, Quiz.trueFalseInput, Quiz.fillInTheBlankInput];
Quiz.multiChoiceButtons = document.getElementsByClassName("option");
Quiz.trueButton = document.getElementById("true-button");
Quiz.falseButton = document.getElementById("false-button");
Quiz.answerButtons = document.getElementsByClassName("answer-button");
Quiz.textEntry = document.getElementById("text-entry");
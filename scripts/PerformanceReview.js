export default class PerformanceReview {
  //Performance Review
  static scoreDisplay = document.getElementById("score-display");
  static messageDisplay = document.getElementById("message-display");
  static resultsTable = document.getElementById("results-table");

  constructor(questions, inputs){
    PerformanceReview.resultsTable.innerHTML = "";
    this.questions = questions;
    this.inputs = inputs;
    this.numQuestions = this.questions.length
  }

  //Display UI for performance review
  showResults(){
    let numCorrect = 0;
    console.log(this.inputs);
  
    //Iterates through questions and answers to add results to table
    this.questions.forEach(({question, correctAnswer}, i)=>{
      correctAnswer = String(correctAnswer).toLowerCase();
      const isCorrect = correctAnswer.includes(this.answers[i]); 
      const color = isCorrect ? "#9de060" : "#f76d71";
      numCorrect += Number(isCorrect);
      const componentHTML = `
        <tr style="background-color: ${color}">
          <td>${question}</td>
          <td>${this.answers[i]}</td>
          <td>${correctAnswer}</td>
        </tr>
      `;
      PerformanceReview.resultsTable.insertAdjacentHTML('beforeend', componentHTML);
    });
    const correctRatio = numCorrect/this.numQuestions;
    PerformanceReview.scoreDisplay.innerHTML = numCorrect + "/" + this.numQuestions;
    
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
    PerformanceReview.messageDisplay.innerHTML = message;
  }
}
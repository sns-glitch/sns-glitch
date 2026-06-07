// LETTERS
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// SCORE
let totalScore = 0;

let highScore = 
    localStorage.getItem("highScore") || 0;

// TIMER
let timeLeft = 30;
let timer;

// ROUNDS
let currentRound = 1;
let maxRounds = 5;

// Prevent spam submit
let roundSubmitted = false;


// RANDOM LETTER
function getRandomLetter() {

  return letters[
    Math.floor(Math.random() * letters.length)
  ];

}


// NEW ROUND
function newRound() {

  clearInterval(timer);

  roundSubmitted = false;

  timeLeft = 30;

  document.getElementById("timer")
    .style.color = "#ff4d6d";

  document.getElementById("timer")
    .textContent = timeLeft;

  document.getElementById("round-number")
    .textContent = currentRound;

  const randomLetter = getRandomLetter();

  document.getElementById("letter")
    .textContent = randomLetter;

  // Clear inputs
  document.getElementById("boy").value = "";
  document.getElementById("girl").value = "";
  document.getElementById("animal").value = "";
  document.getElementById("place").value = "";
  document.getElementById("thing").value = "";

  // Reset borders
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    input.style.border = "none";
  });

  // Focus first input
  document.getElementById("boy").focus();

  // TIMER
  timer = setInterval(() => {

    timeLeft--;

    document.getElementById("timer")
      .textContent = timeLeft;

    // Final 5 seconds
    if (timeLeft <= 5) {

      document.getElementById("timer")
        .style.color = "red";

    }

    // Time up
    if (timeLeft <= 0) {

      clearInterval(timer);

      submitAnswers();

      if (currentRound < maxRounds) {

        currentRound++;

        setTimeout(() => {

          newRound();

        }, 2000);

      } else {

        endGame();

      }

    }

  }, 1000);

}


// SUBMIT ANSWERS
function submitAnswers() {

  alert("Submit button works!");

  if (roundSubmitted) return;

  roundSubmitted = true;

  clearInterval(timer);

  const currentLetter =
    document.getElementById("letter")
    .textContent
    .toLowerCase();

  const inputs = [
    document.getElementById("boy"),
    document.getElementById("girl"),
    document.getElementById("animal"),
    document.getElementById("place"),
    document.getElementById("thing")
  ];

  let roundScore = 0;

  inputs.forEach(input => {

    const answer =
      input.value.trim().toLowerCase();

    if (
      answer !== "" &&
      answer.startsWith(currentLetter)
  
    ) {

      roundScore++;

      input.style.border =
        "3px solid lime";

    } else {

      input.style.border =
        "3px solid red";

    }

  });

  totalScore += roundScore;

  document.getElementById("score")
    .textContent = totalScore;

}


// START GAME
function startGame() {
  newRound();
}


// END GAME
function endGame() {

  let message = "";

  if (totalScore >=20) {

    message = "Amazing! You're a Category Clash master!";
  
  } else if (totalScore >= 15) {
   
    message = "Great job!";
     
  } else {

    message = "Keep praciticing!";
  }

  if (totalScore > highScore) {

    highScore = totalScore;

    localStorage.setItem(
      "highScore",
      highScore
    );

    document.getElementById(
      "high-score"
    ).textContent = highScore;

  }

  alert(
    "Game Over!\n\nFinal Score: "
        + totalScore +
        "\n\n" +
        message
  );
}


// ENTER KEY
document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Enter") {

      submitAnswers();

    }

  }
);

document.getElementById("high-score")
.textContent = highScore;

// START GAME ON PAGE LOAD
window.onload = newRound;
var subValue = getUrlParameter("sub");
var playButton = document.querySelector(".btn[href='./game.html']");

// Update the href of the play button based on the selected subject
playButton.href = `./game.html?sub=${subValue}`;

// Function to parse URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Subject mapping
let sub = [
  "Math 06/10",
  "Chem 06/10",
  "Phys 06/10",
  "Math 13/10",
  "Chem 13/10",
  "Phys 13/10",
  "Math 20/10",
  "Chem 20/10",
  "Phys 20/10",
  "Math 27/10",
  "Chem 27/10",
  "Phys 27/10",
  "Math 03/11",
  "Chem 03/11",
  "Phys 03/11",
  "Math 10/11",
  "Chem 10/11",
  "Phys 10/11",
  "Math 17/11",
  "Chem 17/11",
  "Phys 17/11",
  "Math 24/11",
  "Chem 24/11",
  "Phys 24/11",
  "Math 01/12",
  "Chem 01/12",
  "Phys 01/12",
];

// Get username input and save score button
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");

// Retrieve high scores from localStorage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

// Retrieve quiz summary data
const quizSummary = JSON.parse(localStorage.getItem("quizSummary")) || {};

// Extract data from quizSummary
const attempt = quizSummary.attempt || 0;
const correct = quizSummary.correct || 0;
const totalScore = quizSummary.totalScore || 0;

// Fill the table cells with data
document.getElementById("attempt").innerText = attempt;
document.getElementById("correct").innerText = correct;
document.getElementById("totalScore").innerText = totalScore;

// Enable the save score button only if username is provided
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

// Function to save the high score
const saveHighScore = (e) => {
  e.preventDefault();

  // Determine the subject based on subValue
  const subject = sub.find((item) => {
    const formattedValue = item.replace(" ", "_").toLowerCase(); // e.g., "math_06_10"
    return formattedValue === subValue; // Check if matches the subValue
  });

  // Save score details, including the current timestamp
  const score = {
    sub: subject || subValue, // Use the found subject or the raw subValue
    score: mostRecentScore,
    name: username.value,
    timestamp: new Date().toISOString(), // Store the current timestamp
    ...quizSummary,
  };

  highScores.push(score);

  // Sort high scores in descending order
  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  // Keep only the top MAX_HIGH_SCORES
  // highScores.splice(MAX_HIGH_SCORES);

  // Save updated high scores to localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // Redirect to the main page
  window.location.assign("./");
};

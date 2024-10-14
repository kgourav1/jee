function showHighScores(filterSubject = null, sortBy = "attempt") {
  const highScoresList = document.getElementById("highScoresList");
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Filter scores based on subject if provided
  const filteredScores = filterSubject
    ? highScores.filter((score) => score.sub === filterSubject)
    : highScores;

  // Sort scores based on sortBy parameter
  filteredScores.sort((a, b) => b[sortBy] - a[sortBy]);

  // Create the table
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  // Define headers including Timestamp
  const headers = [
    "Name",
    "Subject",
    "Attempt",
    "Correct",
    "Total Score",
    "Timestamp",
  ];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  filteredScores.forEach((score) => {
    const dataRow = document.createElement("tr");
    const dataKeys = ["name", "sub", "attempt", "correct", "totalScore"];

    // Add data cells
    dataKeys.forEach((key) => {
      const td = document.createElement("td");
      td.textContent = score[key];
      dataRow.appendChild(td);
    });

    // Create timestamp cell
    const timestampCell = document.createElement("td");
    const date = new Date(score.timestamp); // Convert timestamp to Date object

    // Check if the timestamp is valid and not NaN
    const formattedTime = !isNaN(date.getTime())
      ? `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "00:00"; // Default to "0:0" if NaN

    timestampCell.textContent = formattedTime;
    dataRow.appendChild(timestampCell);

    tbody.appendChild(dataRow);
  });
  table.appendChild(tbody);

  highScoresList.innerHTML = ""; // Clear previous content
  highScoresList.appendChild(table); // Append new table
}

// Call the function to display high scores
showHighScores();

// Clear leaderboard functionality
const clearLeaderboardBtn = document.getElementById("clearLeaderboard");
clearLeaderboardBtn.addEventListener("click", () => {
  localStorage.removeItem("highScores");
  // Clear the leaderboard table
  highScoresList.innerHTML = "";
});

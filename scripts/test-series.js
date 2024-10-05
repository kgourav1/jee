// /scripts/test-series.js
// Countdown Timer Logic
const countdownElement = document.getElementById("countdown");
const testDateElement = document.getElementById("test-date");

// Set the test date (ensure it matches the date in HTML)
const testDate = new Date("October 06, 2024 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = testDate - now;

  if (distance < 0) {
    countdownElement.innerHTML =
      "<a href='/test_portal' target='_blank'>Click here to give the TEST!</a>";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `<span class="days">${days}</span> Days 
                                    <span class="hours">${hours}</span> Hours 
                                    <span class="minutes">${minutes}</span> Minutes 
                                    <span class="seconds">${seconds}</span> Seconds`;
}

setInterval(updateCountdown, 1000);

// Fetch syllabus data from test.json
fetch("data/test.json")
  .then((response) => response.json())
  .then((data) => {
    populateSyllabusTables(data);
  })
  .catch((error) => console.error("Error loading syllabus data:", error));

function populateSyllabusTables(data) {
  const syllabusContainer = document.getElementById("syllabus-tables");

  Object.keys(data).forEach((subject) => {
    const table = document.createElement("table");
    table.className = "syllabus-table";

    // Create table headers
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    const headers = ["Chapter Name"];
    headers.forEach((headerText) => {
      const th = document.createElement("th");
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Create table body
    const tbody = document.createElement("tbody");
    data[subject].forEach((chapter) => {
      const row = document.createElement("tr");
      const chapterNameCell = document.createElement("td");
      chapterNameCell.textContent = chapter.name;

      row.appendChild(chapterNameCell);
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Append subject table to the syllabus container
    const subjectHeader = document.createElement("h3");
    subjectHeader.textContent = subject;

    syllabusContainer.appendChild(subjectHeader);
    syllabusContainer.appendChild(table);
  });
}

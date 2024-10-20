function showHome(subject) {
  // Hide the subject list div
  document.getElementById("subjectList").classList.add("hidden");

  // Show the home div
  document.getElementById("home").classList.remove("hidden");

  // Update the href of the "Play" button based on the selected subject
  var playButton = document.querySelector("#home .btn[href='./game.html']");
  playButton.href = `./game.html?sub=${subject}`;
}

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

let currTest = "20/10";

// Get unique dates from the sub array
let uniqueDates = [...new Set(sub.map((s) => s.split(" ")[1]))];

// Function to show subject buttons for a specific date
function showSubjectsForDate(date) {
  // Clear the existing subject buttons (if any)
  var subjectsContainer = document.querySelector(".subjects");
  subjectsContainer.innerHTML = "";

  // Loop through the subjects and create buttons for the selected date
  sub.forEach((item, index) => {
    let [subject, itemDate] = item.split(" ");
    if (itemDate === date) {
      let subjectButton = createSubjectButton(subject, index, date);
      subjectsContainer.appendChild(subjectButton);
    }
  });
}

// Function to create a date button
function createDateButton(date) {
  // Create a new div element
  var div = document.createElement("div");
  // Set class attribute
  div.className = "btn btn-color-date date-button";

  // Disable the button if the date is after currTest
  if (isDateAfter(date, currTest)) {
    div.classList.add("disabled"); // Add a class for styling
    // div.textContent = date + " (disabled)"; // Optional: indicate it's disabled
  } else {
    // Set onclick attribute to show subject buttons for this date
    div.setAttribute("onclick", `showSubjectsForDate('${date}')`);
  }
  div.textContent = date;

  // Return the created div element
  return div;
}

// Function to create a subject button
function createSubjectButton(subject, index, date) {
  // Create a new div element
  var div = document.createElement("div");
  // Set class attribute
  div.className = "btn btn-color-" + ((index % 4) + 1) + " subject";

  // Disable the button if the date is after currTest
  if (isDateAfter(date, currTest)) {
    div.classList.add("disabled"); // Add a class for styling
    div.textContent = subject + " (" + date + ")"; // Optional: indicate it's disabled
  } else {
    // Set onclick attribute
    div.setAttribute(
      "onclick",
      `showHome('${subject.toLowerCase()}_${date.replace("/", "_")}')`
    );
    // Set text content
    div.textContent = subject + " (" + date + ")";
  }

  // Return the created div element
  return div;
}

// Function to check if date1 is after date2
function isDateAfter(date1, date2) {
  const [day1, month1] = date1.split("/").map(Number);
  const [day2, month2] = date2.split("/").map(Number);

  if (month1 > month2 || (month1 === month2 && day1 > day2)) {
    return true;
  }
  return false;
}

// Function to create and append date buttons
function createDateButtons() {
  // Get the date container element
  var dateContainer = document.querySelector(".dates");
  // Loop through unique dates and create date buttons
  uniqueDates.forEach((date) => {
    var dateButton = createDateButton(date);
    dateContainer.appendChild(dateButton);
  });
}

// Call the function to create and append date buttons
createDateButtons();

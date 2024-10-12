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
  "Maths 13/10",
  "Chem 13/10",
  "Phys 13/10",
];

// Function to create a subject button
function createSubjectButton(setNumber) {
  // Create a new div element
  var div = document.createElement("div");
  // Set class attribute
  div.className = "btn btn-color-" + ((setNumber % 4) + 1) + " subject";
  // Set onclick attribute
  div.setAttribute("onclick", "showHome('os" + setNumber + "')");
  // Set text content
  div.textContent = "JEE Main (" + sub[setNumber] + ")";
  // Return the created div element
  return div;
}

// Function to create and append subject buttons to the subjects container
function createSubjectButtons() {
  // Get the subjects container element
  var subjectsContainer = document.querySelector(".subjects");
  // Loop to create buttons for sets 0 to 4
  for (var i = 0; i < 6; i++) {
    // Create subject button
    var subjectButton = createSubjectButton(i);
    // Append the created button to the subjects container
    subjectsContainer.appendChild(subjectButton);
  }
}

// Call the function to create and append subject buttons
createSubjectButtons();

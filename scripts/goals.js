// /scripts/goals.js

function initializeGoals() {
  // Get references to the DOM elements
  const goalInput = document.getElementById("goal-input");
  const addGoalBtn = document.getElementById("add-goal-btn");
  const goalList = document.getElementById("goal-list");
  const progressBar = document.querySelector(".progress");

  // Load goals from localStorage and display them
  const goals = JSON.parse(localStorage.getItem("goals")) || [];

  // Function to update the progress bar
  function updateProgressBar() {
    const completedGoals = goals.filter((goal) => goal.completed).length;
    const totalGoals = goals.length;
    const percentage =
      totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    progressBar.style.width = `${percentage}%`;
  }

  // Function to render goals in the list
  function renderGoals() {
    goalList.innerHTML = "";
    goals.forEach((goal, index) => {
      const listItem = document.createElement("li");
      listItem.className = `goal-item ${goal.completed ? "completed" : ""}`;
      listItem.innerHTML = `
                <span class="goal-text">${goal.text}</span>
                <div class="goal-actions">
                    <button class="complete-btn">${
                      goal.completed ? "Undo" : "Complete"
                    }</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

      // Add event listeners for each button
      listItem
        .querySelector(".complete-btn")
        .addEventListener("click", () => toggleCompleteGoal(index));
      listItem
        .querySelector(".edit-btn")
        .addEventListener("click", () => editGoal(index));
      listItem
        .querySelector(".delete-btn")
        .addEventListener("click", () => deleteGoal(index));

      goalList.appendChild(listItem);
    });
    updateProgressBar(); // Update progress bar after rendering goals
  }

  // Function to add a new goal
  function addGoal() {
    const goalText = goalInput.value.trim();
    if (goalText === "") return;
    goals.push({ text: goalText, completed: false });
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
    goalInput.value = ""; // Clear the input field
  }

  // Function to toggle goal completion
  function toggleCompleteGoal(index) {
    goals[index].completed = !goals[index].completed;
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
  }

  // Function to edit an existing goal
  function editGoal(index) {
    const newGoalText = prompt("Edit your goal:", goals[index].text);
    if (newGoalText !== null && newGoalText.trim() !== "") {
      goals[index].text = newGoalText.trim();
      localStorage.setItem("goals", JSON.stringify(goals));
      renderGoals();
    }
  }

  // Function to delete a goal
  function deleteGoal(index) {
    goals.splice(index, 1);
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
  }

  // Attach event listener to "Add Goal" button
  addGoalBtn.addEventListener("click", addGoal);

  // Initial rendering of goals
  renderGoals();
}

initializeGoals();

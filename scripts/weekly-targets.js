// /scripts/weekly-goals.js

function initializeWeeklyGoals() {
  // Get references to the DOM elements
  const weeklyGoalInput = document.getElementById("weekly-goal-input");
  const addWeeklyGoalBtn = document.getElementById("add-weekly-goal-btn");
  const weeklyGoalList = document.getElementById("weekly-goal-list");
  const weeklyProgressBar = document.querySelector(".weekly-progress");

  // Load weekly goals from localStorage and display them
  const weeklyGoals = JSON.parse(localStorage.getItem("weeklyGoals")) || [];

  // Function to update the weekly progress bar
  function updateWeeklyProgressBar() {
    const completedGoals = weeklyGoals.filter((goal) => goal.completed).length;
    const totalGoals = weeklyGoals.length;
    const percentage =
      totalGoals === 0 ? 0 : Math.round((completedGoals / totalGoals) * 100);
    weeklyProgressBar.style.width = `${percentage}%`;
  }

  // Function to render weekly goals in the list
  function renderWeeklyGoals() {
    weeklyGoalList.innerHTML = "";
    weeklyGoals.forEach((goal, index) => {
      const listItem = document.createElement("li");
      listItem.className = `weekly-goal-item ${
        goal.completed ? "completed" : ""
      }`;
      listItem.innerHTML = `
                    <span class="weekly-goal-text">${goal.text}</span>
                    <div class="weekly-goal-actions">
                        <button class="complete-weekly-btn">${
                          goal.completed ? "Undo" : "Complete"
                        }</button>
                        <button class="edit-weekly-btn">Edit</button>
                        <button class="delete-weekly-btn">Delete</button>
                    </div>
                `;

      // Add event listeners for each button
      listItem
        .querySelector(".complete-weekly-btn")
        .addEventListener("click", () => toggleCompleteWeeklyGoal(index));
      listItem
        .querySelector(".edit-weekly-btn")
        .addEventListener("click", () => editWeeklyGoal(index));
      listItem
        .querySelector(".delete-weekly-btn")
        .addEventListener("click", () => deleteWeeklyGoal(index));

      weeklyGoalList.appendChild(listItem);
    });
    updateWeeklyProgressBar(); // Update progress bar after rendering weekly goals
  }

  // Function to add a new weekly goal
  function addWeeklyGoal() {
    const goalText = weeklyGoalInput.value.trim();
    if (goalText === "") return;
    weeklyGoals.push({ text: goalText, completed: false });
    localStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
    renderWeeklyGoals();
    weeklyGoalInput.value = ""; // Clear the input field
  }

  // Function to toggle weekly goal completion
  function toggleCompleteWeeklyGoal(index) {
    weeklyGoals[index].completed = !weeklyGoals[index].completed;
    localStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
    renderWeeklyGoals();
  }

  // Function to edit an existing weekly goal
  function editWeeklyGoal(index) {
    const newGoalText = prompt(
      "Edit your weekly goal:",
      weeklyGoals[index].text
    );
    if (newGoalText !== null && newGoalText.trim() !== "") {
      weeklyGoals[index].text = newGoalText.trim();
      localStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
      renderWeeklyGoals();
    }
  }

  // Function to delete a weekly goal
  function deleteWeeklyGoal(index) {
    weeklyGoals.splice(index, 1);
    localStorage.setItem("weeklyGoals", JSON.stringify(weeklyGoals));
    renderWeeklyGoals();
  }

  // Attach event listener to "Add Weekly Goal" button
  addWeeklyGoalBtn.addEventListener("click", addWeeklyGoal);

  // Initial rendering of weekly goals
  renderWeeklyGoals();
}

// Initialize the weekly goals feature
initializeWeeklyGoals();

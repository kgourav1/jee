// /scripts/quotes.js

// Function to initialize the quotes functionality
function initQuotes() {
  const quoteDisplay = document.getElementById("quote-display");
  const newQuoteBtn = document.getElementById("new-quote-btn");

  // Load quotes from JSON file and display a random one
  fetch("data/quotes.json")
    .then((response) => response.json())
    .then((data) => {
      const quotes = data.quotes;
      displayRandomQuote(quotes);
    })
    .catch((error) => console.error("Error loading quotes:", error));

  // Event listener for getting a new quote
  newQuoteBtn.addEventListener("click", () => {
    fetch("data/quotes.json")
      .then((response) => response.json())
      .then((data) => {
        const quotes = data.quotes;
        displayRandomQuote(quotes);
      })
      .catch((error) => console.error("Error loading quotes:", error));
  });

  // Function to display a random quote
  function displayRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.innerText = quotes[randomIndex];
  }
}

// Initialize the quotes functionality
initQuotes();

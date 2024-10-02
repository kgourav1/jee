// script.js
document.addEventListener("DOMContentLoaded", () => {
  // Function to dynamically load HTML, CSS, and JS for a given component
  function loadComponent(componentName) {
    // Load the HTML file
    fetch(`components/${componentName}.html`)
      .then((response) => response.text())
      .then((data) => {
        // Insert the HTML into the respective div
        document.getElementById(componentName).innerHTML = data;

        // Load the corresponding CSS file dynamically
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `styles/${componentName}.css`;
        document.head.appendChild(link);

        // Load the corresponding JS file dynamically
        const script = document.createElement("script");
        script.src = `scripts/${componentName}.js`;
        document.body.appendChild(script);
      })
      .catch((error) =>
        console.error(`Error loading ${componentName}:`, error)
      );
  }

  // Load each component with its associated CSS and JS
  const components = [
    "navbar",
    "goals",
    "quotes",
    "weekly-targets",
    "subjects",
    "test-series",
  ];
  components.forEach((component) => loadComponent(component));
});

// /scripts/subjects.js

// Chapter names for each subject
const syllabus = {
  math: [
    "Sets and Relations",
    "Functions",
    "Trigonometrical Ratios, Functions and Identities",
    "Trigonometrical Equations and Inequations",
    "Mathematical Induction",
    "Complex Numbers",
    "Quadratic Equations",
    "Permutation and Combination",
    "Binomial Theorem",
    "Sequences and Series",
    "Straight Lines",
    "Circle",
    "Parabola",
    "Ellipse",
    "Hyperbola",
    "Limits",
    "Logarithmic",
    "Mathematical Reasoning",
    "Statistics",
    "Probability",
    "Inverse Trigonometric Functions",
    "Matrices and Determinants",
    "Continuity and Differentiability",
    "Differentiation",
    "Application of Derivatives",
    "Indefinite Integration",
    "Definite Integration",
    "Area Under Curves",
    "Differential Equation",
    "Vector Algebra",
    "Vector 3D",
    "Heights and Distances",
    "Properties of Triangles",
  ],
  chemistry: [
    "Some Basic Concepts of Chemistry",
    "Atomic Structure",
    "Classification of Elements and Periodicity in Properties",
    "Chemical Bonding and Molecular Structure",
    "Liquid and Gaseous State",
    "Thermodynamics",
    "Chemical Equilibrium",
    "Ionic Equilibrium",
    "Solid State",
    "Solutions and Colligative Properties",
    "Electrochemistry",
    "Chemical Kinetics",
    "Surface Chemistry",
    "Nuclear Chemistry",
    "Nuclear and Surface Chemistry",
    "Metallurgy",
    "s Block Elements and Hydrogen",
    "p Block Elements",
    "d and f Block Elements",
    "Coordination Compounds",
    "Classification and Nomenclature of Organic Compounds",
    "Isomerism of Organic Compounds",
    "General Organic Chemistry",
    "Purification and Characterization of Organic Compounds",
    "Alkanes, Alkenes and Alkynes (Hydrocarbons)",
    "Haloalkanes",
    "Haloarenes and Phenols",
    "Alcohols and Ethers",
    "Aromatic Compounds",
    "Aldehydes and Ketones",
    "Carboxylic Acid and its Derivatives",
    "Amines",
    "Biomolecules and Polymers",
    "Practical and Environmental Chemistry",
    "Chemistry in Everyday Life",
    "Redox Reactions and Volumetric Analysis",
    "Qualitative Inorganic Analysis",
  ],
  physics: [
    "Mathematics in Physics",
    "Units and Dimensions",
    "Motion in One Dimension",
    "Motion in Two Dimension and Projectile Motion",
    "Circular Motion",
    "Newton’s Laws of Motion",
    "Work, Power and Energy",
    "Center of Mass and Momentum Conservation (Collision)",
    "Rotational Motion",
    "Gravitation",
    "Properties of Matter and Fluid Mechanics",
    "Thermal Properties of Matter, Calorimetry and Kinetic Theory of Gases",
    "Laws of Thermodynamics",
    "Heat Transfer",
    "Oscillations (SHM)",
    "Waves and Sound",
    "Electrostatics",
    "Current Electricity",
    "Magnetic Effects of Current",
    "Classical Magnetism and Magnetic Properties of Matter",
    "Electromagnetic Induction and Alternating Current",
    "Photoelectric Effect and Electromagnetic Waves",
    "Ray Optics",
    "Wave Optics",
    "Atomic Structure in Modern Physics",
    "Nuclear Physics and Radioactivity",
    "Semiconductors and Communication System",
    "Experimental Physics",
  ],
};

// Function to initialize the subjects functionality
function initSubjects() {
  // Populate tables with chapter names
  populateTable("math-table-body", syllabus.math, "math");
  populateTable("chemistry-table-body", syllabus.chemistry, "chemistry");
  populateTable("physics-table-body", syllabus.physics, "physics");
}

// Function to populate a subject table with individual checkboxes for each revision stage
function populateTable(tableId, chapters, subject) {
  const tableBody = document.getElementById(tableId);

  chapters.forEach((chapter) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${chapter}</td>
        <td><input type="checkbox" class="revision-checkbox" data-subject="${subject}" data-chapter="${chapter}" data-revision="first" /></td>
        <td><input type="checkbox" class="revision-checkbox" data-subject="${subject}" data-chapter="${chapter}" data-revision="second" /></td>
        <td><input type="checkbox" class="revision-checkbox" data-subject="${subject}" data-chapter="${chapter}" data-revision="third" /></td>
      `;
    tableBody.appendChild(row);
  });

  // Load checkbox states from local storage
  loadCheckboxStates(chapters, subject);
}

// Function to load checkbox states for each revision from local storage
function loadCheckboxStates(chapters, subject) {
  // Select all checkboxes related to the current subject
  const revisionCheckboxes = document.querySelectorAll(
    `input[data-subject="${subject}"]`
  );

  revisionCheckboxes.forEach((checkbox) => {
    const { chapter, revision } = checkbox.dataset;
    const savedState = localStorage.getItem(
      `${subject}-${chapter}-${revision}`
    );
    checkbox.checked = savedState === "true"; // Set the checkbox state

    // Event listener for checkbox change
    checkbox.addEventListener("change", () => {
      // Save each checkbox's state individually in local storage
      localStorage.setItem(
        `${subject}-${chapter}-${revision}`,
        checkbox.checked
      );
    });
  });
}

// Initialize the subjects functionality
initSubjects();

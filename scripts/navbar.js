const menuIcon = document.querySelector(".menu-icon");
const mobileMenu = document.getElementById("mobileMenu");

menuIcon.addEventListener("click", () => {
  mobileMenu.classList.toggle("active"); // Toggle active class to show/hide menu
});

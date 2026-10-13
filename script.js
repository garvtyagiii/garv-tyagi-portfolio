
/* ===== Portfolio Interactions ===== */

// Display a welcome message in the browser console.
console.log("Welcome to Garv Tyagi's Portfolio!");

// Add a subtle interaction to the page title.
const pageTitle = document.querySelector("header h1");

if (pageTitle) {
  pageTitle.style.cursor = "pointer";

  pageTitle.addEventListener("click", () => {
    pageTitle.classList.toggle("highlight");
  });
}

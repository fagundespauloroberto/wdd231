document.addEventListener("DOMContentLoaded", () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const primaryNav = document.getElementById("primary-nav");

    if (hamburgerBtn && primaryNav) {
        hamburgerBtn.addEventListener("click", () => {
            primaryNav.classList.toggle("open");
            hamburgerBtn.querySelector(".icon").textContent = 
                primaryNav.classList.contains("open") ? "✕" : "☰";
        });
    }
});
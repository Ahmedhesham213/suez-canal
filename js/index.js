document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.querySelector(".singn_in_btn");
    signInButton.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Redirecting to the Sign In page...");
        window.location.href = "login.html";
    });

    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            navLinks.forEach((link) => link.classList.remove("active"));
            event.target.classList.add("active");
        });
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.05)";
            card.style.transition = "transform 0.3s ease";
        });

        card.addEventListener("mouseout", () => {
            card.style.transform = "scale(1)";
        });
    });

    const aboutButton = document.querySelector(".btn");
    aboutButton.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Learn more about the Suez Canal by visiting the About page!");
        window.location.href = "about.html";
    });

    const socialLinks = document.querySelectorAll(".soial-media a");
    socialLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            alert(`You are being redirected to: ${link.href}`);
            window.open(link.href, "_blank");
        });
    });
});

//Start scroll at top
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

// Background follows mouse
document.addEventListener("mousemove", (event) => {
    document.documentElement.style.setProperty("--x", `${event.clientX}px`);
    document.documentElement.style.setProperty("--y", `${event.clientY}px`);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            // Left side stagger items
            entry.target.querySelectorAll(".reveal-left").forEach(el => {
                el.classList.add("visible");
            });

            // Right side block
            const right = entry.target.querySelector(".reveal-right");
            if (right) {
                right.classList.add("visible");
            }
        }
    });
}, {
    threshold: 0.25
});

// observe each section
document.querySelectorAll(".content-section").forEach(section => {
    revealObserver.observe(section);
});

// Hero Fade-in
window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".hero-step").forEach(el => {
        el.classList.add("visible");
    });
});

// -----------------------------
// ACTIVE NAV LINK SCROLL LOGIC
// -----------------------------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
    let scrollPos = window.scrollY + 150;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.nav-link[href="#${section.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}

window.addEventListener("scroll", setActiveLink);

// Also run once on load
setActiveLink();


// Smooth click behavior (extra polish)
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(setActiveLink, 50);
    });
});

//Vanta JS
const hero = document.querySelector("#hero");

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            // HERO IS VISIBLE → CREATE VANTA
            createVanta();
        } else {
            // HERO NOT VISIBLE → DESTROY VANTA
            destroyVanta();
        }

    });
}, {
    threshold: 0.1
});

heroObserver.observe(hero);

//Back to top button
const backToTopBtn = document.getElementById("backToTop");

// show button after scrolling down
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// smooth scroll to top
backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
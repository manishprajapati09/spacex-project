/* =====================================================
   SPACEX INSPIRED WEBSITE
   COMPLETE JAVASCRIPT
===================================================== */

"use strict";

/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1200);
});

/* =====================================================
   STICKY NAVBAR
===================================================== */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        if (nav.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });

}

document.querySelectorAll(".nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("active");

        if (menuBtn) {
            menuBtn.textContent = "☰";
        }

    });

});

/* =====================================================
   SMOOTH ACTIVE LINK
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

function updateActiveLink() {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active-link");
        }

    });

}

window.addEventListener("scroll", updateActiveLink);

/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements = document.querySelectorAll(
    ".mission-card, .rocket-card, .timeline-item, .stat-card, .launch-panel"
);

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(el => {

    el.classList.add("reveal");
    revealObserver.observe(el);

});

/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 120;

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.innerText = Math.floor(current);

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerText = target;

            }

        };

        updateCounter();

        counterObserver.unobserve(counter);

    });

}, {
    threshold: 0.4
});

counters.forEach(counter => {

    counterObserver.observe(counter);

});

/* =====================================================
   SPACEX API
===================================================== */

async function loadLaunchData() {

    try {

        const response = await fetch(
            "https://api.spacexdata.com/v5/launches/upcoming"
        );

        const launches = await response.json();

        if (!launches.length) return;

        launches.sort((a, b) => {
            return new Date(a.date_utc) - new Date(b.date_utc);
        });

        const nextLaunch = launches[0];

        const launchName =
            document.getElementById("launch-name");

        const launchDate =
            document.getElementById("launch-date");

        launchName.textContent =
            nextLaunch.name;

        launchDate.textContent =
            new Date(nextLaunch.date_utc)
                .toLocaleString();

        startCountdown(nextLaunch.date_utc);

    } catch (error) {

        console.error("Launch API Error:", error);

        const launchName =
            document.getElementById("launch-name");

        const launchDate =
            document.getElementById("launch-date");

        if (launchName) {
            launchName.textContent =
                "Unable to load launch data";
        }

        if (launchDate) {
            launchDate.textContent =
                "Check internet connection";
        }

    }

}

/* =====================================================
   COUNTDOWN TIMER
===================================================== */

function startCountdown(targetDate) {

    const target = new Date(targetDate).getTime();

    const daysEl =
        document.getElementById("days");

    const hoursEl =
        document.getElementById("hours");

    const minutesEl =
        document.getElementById("minutes");

    const secondsEl =
        document.getElementById("seconds");

    const interval = setInterval(() => {

        const now = new Date().getTime();

        const distance = target - now;

        if (distance < 0) {

            clearInterval(interval);

            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";

            return;

        }

        const days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (
                    distance %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (
                    distance %
                    (1000 * 60)
                ) /
                1000
            );

        daysEl.textContent =
            String(days).padStart(2, "0");

        hoursEl.textContent =
            String(hours).padStart(2, "0");

        minutesEl.textContent =
            String(minutes).padStart(2, "0");

        secondsEl.textContent =
            String(seconds).padStart(2, "0");

    }, 1000);

}

/* =====================================================
   PARALLAX HERO
===================================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    const offset = window.scrollY;

    if (hero) {
        hero.style.backgroundPositionY =
            offset * 0.4 + "px";
    }

});

/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const button =
                contactForm.querySelector("button");

            button.textContent =
                "Sending...";

            setTimeout(() => {

                button.textContent =
                    "Message Sent ✓";

                contactForm.reset();

                setTimeout(() => {

                    button.textContent =
                        "Send Message";

                }, 2500);

            }, 1200);

        }
    );

}

/* =====================================================
   RANDOM STAR TWINKLE
===================================================== */

function createStar() {

    const star =
        document.createElement("div");

    star.classList.add("twinkle-star");

    star.style.left =
        Math.random() * window.innerWidth + "px";

    star.style.top =
        Math.random() * window.innerHeight + "px";

    star.style.animationDuration =
        Math.random() * 3 + 2 + "s";

    document.body.appendChild(star);

    setTimeout(() => {

        star.remove();

    }, 5000);

}

setInterval(createStar, 800);

/* =====================================================
   STAR STYLE INJECTION
===================================================== */

const style =
document.createElement("style");

style.innerHTML = `
.twinkle-star{
    position:fixed;
    width:2px;
    height:2px;
    background:white;
    border-radius:50%;
    pointer-events:none;
    z-index:-1;
    animation:twinkle ease forwards;
}

@keyframes twinkle{
    0%{
        opacity:0;
        transform:scale(0);
    }

    50%{
        opacity:1;
        transform:scale(1.5);
    }

    100%{
        opacity:0;
        transform:scale(0);
    }
}
`;

document.head.appendChild(style);

/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

const topButton =
document.createElement("button");

topButton.innerHTML = "↑";

topButton.className =
"scroll-top";

document.body.appendChild(topButton);

const topStyle =
document.createElement("style");

topStyle.innerHTML = `
.scroll-top{
    position:fixed;
    right:25px;
    bottom:25px;

    width:50px;
    height:50px;

    border:none;
    border-radius:50%;

    background:white;
    color:black;

    font-size:22px;
    font-weight:bold;

    cursor:pointer;

    opacity:0;
    visibility:hidden;

    transition:.3s;

    z-index:999;
}

.scroll-top.show{
    opacity:1;
    visibility:visible;
}

.scroll-top:hover{
    transform:translateY(-4px);
}
`;

document.head.appendChild(topStyle);

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        topButton.classList.add("show");

    } else {

        topButton.classList.remove("show");

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

});

/* =====================================================
   INITIALIZE
===================================================== */

function loadLaunchData() 
{
    const launchName = document.getElementById("launch-name");
    const launchDate = document.getElementById("launch-date");

    if (launchName) {
        launchName.textContent = "Starship Mars Mission";
    }

    if (launchDate) {
        launchDate.textContent = "January 1, 2027";
    }

    startCountdown("2027-01-01T00:00:00");
}

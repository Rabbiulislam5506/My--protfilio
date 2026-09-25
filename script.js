﻿// --- Sticky Navbar ---
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 50);
});

// --- Hamburger Menu Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('fa-times'); // changes icon to X
});

// --- Typewriter Effect ---
const words = ["Web Developer", "UI/UX Designer", "Creative Thinker"];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typewriter').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000);
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typewriter').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500);
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

// Start typing effect on load
typingEffect();
// --- Scroll Reveal Animation (Left & Right) ---
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // একবার অ্যানিমেশন হওয়ার পর আর হবে না
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

// --- Number Counter Animation (About Section) ---
const counters = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); 

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current) + "+";
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target + "+";
                }
            };
            updateCounter();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// --- Skills Progress Bar Fill Animation ---
const progressBars = document.querySelectorAll('.progress');

const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth; // width 0 থেকে target এ যাবে
            observer.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));
// --- Projects Filtering Logic ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(button => button.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// --- Timeline Tabs Toggle ---
const tabBtns = document.querySelectorAll('.tab-btn');
const timelineContainers = document.querySelectorAll('.timeline-container');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from buttons & containers
        tabBtns.forEach(b => b.classList.remove('active'));
        timelineContainers.forEach(c => c.classList.remove('active'));

        // Add active class to clicked button & targeted container
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- Scroll Reveal Animation for Upwards (Projects & Others) ---
const revealUpElements = document.querySelectorAll('.reveal-up');

const revealUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealUpElements.forEach(el => revealUpObserver.observe(el));

// Note: Ensure the reveal-left and reveal-right elements in the timeline 
// are caught by the existing revealObserver we wrote in Step 2.
const newRevealElements = document.querySelectorAll('#experience .reveal-left, #experience .reveal-right');
newRevealElements.forEach(el => revealObserver.observe(el));
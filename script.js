/* ========================================
   1. THEME TOGGLE LOGIC (PERSISTENT)
   ======================================== */
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Function to set theme
const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌓';
};

// Toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

/* ========================================
   2. GHOST ENGINE (SCROLL REVEAL)
   ======================================== */
const observerOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Slight offset for a better "glide" feel
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            // Unobserve after animating to save resources
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target all sections, service cards, and sub-page content
const elementsToReveal = document.querySelectorAll(
    '.reveal-hidden, .service-card, .subpage-content, .subpage-header, .pampa-brand-section'
);

elementsToReveal.forEach(el => {
    el.classList.add('reveal-hidden'); // Ensure they have the base hidden class
    revealObserver.observe(el);
});

/* ========================================
   3. ACTIVE LINK HIGHLIGHTING
   ======================================== */
// This logic checks the current URL and applies the 'active' class 
// to the matching link in the navbar automatically.
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    // Check if the link href is part of the current URL path
    if (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== "../index.html") {
        link.classList.add('active');
    }
});

/* ========================================
   4. RESTORATION SLIDER (MOBILE & CLICK)
   ======================================== */
const sliders = document.querySelectorAll('.slider-container');

sliders.forEach(slider => {
    slider.addEventListener('click', () => {
        const state = slider.getAttribute('data-state');
        slider.setAttribute('data-state', state === 'after' ? 'before' : 'after');
    });
});

/* ========================================
   5. BACK TO TOP BUTTON
   ======================================== */
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
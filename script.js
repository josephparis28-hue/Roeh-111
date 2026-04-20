document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME TOGGLE & PERSISTENCE ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const syncThemeIcon = (theme) => {
        if (themeBtn) {
            themeBtn.textContent = theme === 'dark' ? '☀️' : '🌓';
        }
    };

    if (themeBtn) {
        // Set initial icon based on established theme
        syncThemeIcon(htmlElement.getAttribute('data-theme'));

        themeBtn.onclick = () => {
            const current = htmlElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            syncThemeIcon(next);
        };
    }

    // --- 2. SCROLL REVEAL ENGINE (INTERSECTION OBSERVER) ---
    const observerOptions = {
        threshold: 0.12, // Triggers when 12% of element is visible
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    // Target sections, cards, and sub-page content boxes
    const revealTargets = document.querySelectorAll('section, .service-card, .subpage-content');
    revealTargets.forEach(target => {
        target.classList.add('reveal-hidden');
        revealObserver.observe(target);
    });

    // --- 3. BEFORE/AFTER SLIDER ---
    const slider = document.getElementById('main-slider');
    if (slider) {
        const toggleSlider = () => {
            const state = slider.getAttribute('data-state');
            slider.setAttribute('data-state', state === 'after' ? 'before' : 'after');
        };
        slider.addEventListener('click', toggleSlider);
        // Ensure touch devices trigger it smoothly
        slider.addEventListener('touchstart', toggleSlider, { passive: true });
    }

    // --- 4. BACK TO TOP FUNCTIONALITY ---
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backBtn.style.display = "block";
            } else {
                backBtn.style.display = "none";
            }
        });

        backBtn.onclick = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }
});
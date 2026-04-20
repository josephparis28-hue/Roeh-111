document.addEventListener('DOMContentLoaded', () => {
    // --- 1. THEME TOGGLE ---
    const themeBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    if (themeBtn) {
        themeBtn.onclick = () => {
            const current = htmlElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeBtn.textContent = next === 'dark' ? '☀️' : '🌓';
        };
    }

    // --- 2. SLIDER ATTRIBUTE TOGGLE ---
    const slider = document.getElementById('main-slider');
    if (slider) {
        const toggleAction = (e) => {
            const current = slider.getAttribute('data-state');
            slider.setAttribute('data-state', current === 'after' ? 'before' : 'after');
        };
        slider.addEventListener('click', toggleAction);
    }

    // --- 3. SCROLL REVEAL (GHOST ENGINE) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    // This selects your main content areas to animate them
    document.querySelectorAll('section, .service-card, .subpage-content, .pillars-wrapper').forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // --- 4. BACK TO TOP ---
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.style.display = window.scrollY > 400 ? "block" : "none";
        });
        backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
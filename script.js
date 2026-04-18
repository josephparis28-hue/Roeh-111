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
            // Prevent interference with standard scrolling
            if (e.type === 'touchstart') {
                // We let it propagate so the inline 'onclick' also sees it
            }
            const current = slider.getAttribute('data-state');
            slider.setAttribute('data-state', current === 'after' ? 'before' : 'after');
        };

        slider.addEventListener('click', toggleAction);
        slider.addEventListener('touchstart', toggleAction, { passive: true });
    }

    // --- 3. BACK TO TOP ---
    const backBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backBtn.style.display = "block";
        } else {
            backBtn.style.display = "none";
        }
    });
    if (backBtn) {
        backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});
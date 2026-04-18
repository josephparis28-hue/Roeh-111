document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    if(themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌓';

    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeBtn.textContent = next === 'dark' ? '☀️' : '🌓';
        });
    }

    // --- 2. Mobile Slider Fix ---
    const slider = document.getElementById('main-slider');
    if (slider) {
        const handleToggle = (e) => {
            slider.classList.toggle('manual-reveal');
        };

        // Standard click for desktop
        slider.addEventListener('click', handleToggle);

        // Immediate touch for mobile
        slider.addEventListener('touchstart', (e) => {
            handleToggle();
            // Prevent double-tap zoom issues
            if (e.cancelable) e.preventDefault();
        }, {passive: false});
    }

    // --- 3. Back to Top ---
    const topBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topBtn.style.display = 'block';
        } else {
            topBtn.style.display = 'none';
        }
    });
    if(topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
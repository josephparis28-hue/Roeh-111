document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic (The Ghost Protocol)
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial icon based on theme
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌓';

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌓';
    });

    // 2. Before/After Slider Mobile Interaction
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        // This allows Pampa users to tap the image on their phones to switch views
        sliderContainer.addEventListener('click', function() {
            this.classList.toggle('manual-reveal');
        });
    }

    // 3. Back to Top Button Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
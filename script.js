document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    const backToTopBtn = document.getElementById("backToTop");

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlEl.getAttribute('data-theme') === 'dark';
            if (isDark) {
                htmlEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                htmlEl.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
        
    const slider = document.querySelector('.slider-container');

     if (slider) {
        slider.addEventListener('touchstart', function() {
        this.classList.add('active-touch');
    });
    
    // Add this to your existing script.js
    const slider = document.querySelector('.slider-container');

    if (slider) {
      slider.addEventListener('click', function() {
      this.classList.toggle('show-after');
    });
    }

    slider.addEventListener('touchend', function() {
    // Optional: keeps it revealed after tap, or remove class to hide again
    // this.classList.remove('active-touch'); 
    }

    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌓';

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌓';
    });

    
const initSlider = () => {
    const slider = document.getElementById('beforeAfterSlider');
    if (slider) {
        slider.addEventListener('click', function(e) {
            // This toggles the class regardless of where you tap
            this.classList.toggle('manual-reveal');
            console.log("Slider Toggled"); // You can see this in mobile inspect
        });
    }
};

// Run the function after a short delay to ensure DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}


    // 3. Back to Top Button
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

const handle = document.querySelector('.slider-handle');

handle.addEventListener('keydown', (e) => {
  let currentValue = parseInt(handle.getAttribute('aria-valuenow'));
  
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      updateSlider(currentValue + 1);
      break;
    case 'ArrowLeft':
    case 'ArrowDown':
      updateSlider(currentValue - 1);
      break;
    case 'Home':
      updateSlider(0);
      break;
    case 'End':
      updateSlider(100);
      break;
  }
});


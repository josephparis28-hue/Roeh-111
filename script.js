const runSliderLogic = () => {
    const slider = document.getElementById('main-slider');
    
    if (slider) {
        // We use 'click' which handles both tap and mouse
        slider.onclick = function() {
            this.classList.toggle('manual-reveal');
            console.log("Slider toggled: " + this.classList.contains('manual-reveal'));
        };
    }
};

// Start checking for the element as soon as the script loads
let checkExist = setInterval(function() {
   if (document.getElementById('main-slider')) {
      runSliderLogic();
      clearInterval(checkExist);
   }
}, 100);

// Also include your Theme Toggle here to keep it all in one file
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.onclick = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            themeToggle.textContent = next === 'dark' ? '☀️' : '🌓';
        };
    }
});

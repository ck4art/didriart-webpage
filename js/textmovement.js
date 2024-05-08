document.addEventListener('DOMContentLoaded', function() {
    const textAnimate = document.getElementById('textAnimate');
    textAnimate.onclick = function() { // Restart animation on click
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 1);
    };
});

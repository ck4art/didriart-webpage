document.addEventListener('DOMContentLoaded', function() {
    const textAnimate = document.getElementById('textAnimate');

    // Restart animation on click
    textAnimate.onclick = function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 1);
    };


});

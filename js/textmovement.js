document.addEventListener('DOMContentLoaded', function () {
    const textAnimate = document.getElementById('textAnimate');
    const wrapper = document.getElementById('textAnimateWrapper');

    function adjustScale() {
        const wrapperWidth = wrapper.clientWidth;
        const textWidth = textAnimate.scrollWidth;
        let scaleFactor = wrapperWidth / textWidth;

        // Begrenzung, um eine zu kleine Skalierung zu vermeiden
        scaleFactor = Math.min(scaleFactor, 1);

        textAnimate.style.transform = `scale(${scaleFactor})`;
    }

    // Initiale Anpassung
    adjustScale();

    // Skalierung bei Fenstergrößenänderung anpassen
    window.addEventListener('resize', adjustScale);
});

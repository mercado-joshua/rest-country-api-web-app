const colorModeBtn = () => {
    const ctaBtn = document.querySelector('[data-js-cta-btn]');

    ctaBtn.addEventListener('click', () => {
        // Get the current selected theme, on the first run
        // it should be `light`
        const currentTheme = document.documentElement.getAttribute( 'data-theme' );

        // Switch between `dark` and `light`
        const switchToTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Set our currenet theme to the new one
        document.documentElement.setAttribute( 'data-theme', switchToTheme );
    });
};

document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "complete") colorModeBtn();
});
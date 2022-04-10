"use strict";

var colorModeBtn = function colorModeBtn() {
  var ctaBtn = document.querySelector('[data-js-cta-btn]');
  ctaBtn.addEventListener('click', function () {
    // Get the current selected theme, on the first run
    // it should be `light`
    var currentTheme = document.documentElement.getAttribute('data-theme'); // Switch between `dark` and `light`

    var switchToTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Set our currenet theme to the new one

    document.documentElement.setAttribute('data-theme', switchToTheme);
  });
};

document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "complete") colorModeBtn();
});
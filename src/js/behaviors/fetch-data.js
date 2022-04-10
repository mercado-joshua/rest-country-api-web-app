/**
 * Delays the execution of a function in milliseconds.
 * @param {function} fn - target function
 * @param {number} delay - number in ms (milliseconds)
 */

const debounce = (fn, delay = 1500) => {
    let id;
    return function(...args) {

        if (id) clearTimeout(id);

        id = setTimeout(() => fn(...args), delay);
    };
};

const searchData = () => {
    // get the template
    const countryTemplate = document.querySelector('[data-js-country-template]');
    const resultSection = document.querySelector('[data-js-result-section]');
    const searchCountry = document.querySelector('[data-js-search-country]');
    const searchRegion = document.querySelector('[data-js-search-region]');

    let countries = [];

    searchCountry.addEventListener('input', debounce(event => {
        event.preventDefault();
        const value = event.target.value.toLowerCase();
        
        countries.forEach(country => {
            const isNameExist = country.name.toLowerCase().includes(value);
            // hide the cards
            country.element.classList.toggle('-hide', !isNameExist);
        });
    }));

    searchRegion.addEventListener('change', event => {
        event.preventDefault();
        const value = event.target.value.toLowerCase();

        console.log('You selected: ', value);

        countries.forEach(country => {
            const isRegionExist = country.region.toLowerCase().includes(value);
            // hide the cards
            country.element.classList.toggle('-hide', !isRegionExist);
        });
    });

    const fetchData = async () => {
        // fetch the data from the api
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();

        countries = data.map(country => {
            // create a card for each country
            const card = countryTemplate.content.cloneNode(true).children[0];
            const title = card.querySelector('[data-js-title]');
            const population = card.querySelector('[data-js-population]');
            const region = card.querySelector('[data-js-region]');
            const capital = card.querySelector('[data-js-capital]');
            const image = card.querySelector('[data-js-image]');

            // assign the data
            image.src = country.flags.svg;
            title.textContent = country.name.common;
            population.textContent = country.population;
            region.textContent = country.region;
            capital.textContent = country.capital;

            // put created cards inside of the container
            resultSection.append(card);

            return {
                name: country.name.common,
                region: country.region,
                element: card
            }
        });
    };

    fetchData();

};

document.addEventListener("readystatechange", event => {
    if (event.target.readyState === "complete") searchData();
});
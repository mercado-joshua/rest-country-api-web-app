"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Delays the execution of a function in milliseconds.
 * @param {function} fn - target function
 * @param {number} delay - number in ms (milliseconds)
 */
var debounce = function debounce(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  var id;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (id) clearTimeout(id);
    id = setTimeout(function () {
      return fn.apply(void 0, args);
    }, delay);
  };
};

var searchData = function searchData() {
  // get the template
  var countryTemplate = document.querySelector('[data-js-country-template]');
  var resultSection = document.querySelector('[data-js-result-section]');
  var searchCountry = document.querySelector('[data-js-search-country]');
  var searchRegion = document.querySelector('[data-js-search-region]');
  var countries = [];
  searchCountry.addEventListener('input', debounce(function (event) {
    event.preventDefault();
    var value = event.target.value.toLowerCase();
    countries.forEach(function (country) {
      var isNameExist = country.name.toLowerCase().includes(value); // hide the cards

      country.element.classList.toggle('-hide', !isNameExist);
    });
  }));
  searchRegion.addEventListener('change', function (event) {
    event.preventDefault();
    var value = event.target.value.toLowerCase();
    console.log('You selected: ', value);
    countries.forEach(function (country) {
      var isRegionExist = country.region.toLowerCase().includes(value); // hide the cards

      country.element.classList.toggle('-hide', !isRegionExist);
    });
  });

  var fetchData = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var response, data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fetch('https://restcountries.com/v3.1/all');

            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();

            case 5:
              data = _context.sent;
              countries = data.map(function (country) {
                // create a card for each country
                var card = countryTemplate.content.cloneNode(true).children[0];
                var title = card.querySelector('[data-js-title]');
                var population = card.querySelector('[data-js-population]');
                var region = card.querySelector('[data-js-region]');
                var capital = card.querySelector('[data-js-capital]');
                var image = card.querySelector('[data-js-image]'); // assign the data

                image.src = country.flags.svg;
                title.textContent = country.name.common;
                population.textContent = country.population;
                region.textContent = country.region;
                capital.textContent = country.capital; // put created cards inside of the container

                resultSection.append(card);
                return {
                  name: country.name.common,
                  region: country.region,
                  element: card
                };
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();

  fetchData();
};

document.addEventListener("readystatechange", function (event) {
  if (event.target.readyState === "complete") searchData();
});
import { displayWeatherInfoOfCity } from './display-weather-data.js';

const searchFormElement = document.querySelector('form.search-form');


searchFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    displayWeatherInfoOfCity();
});

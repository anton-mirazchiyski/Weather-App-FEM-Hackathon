import * as weatherGet from './get-weather-data.js';
import * as weatherDisplay from './display-weather-data.js';
import { determineWeatherConditionIcon } from './utils.js';

const searchFormElement = document.querySelector('form.search-form');
const weekDaysDropdownBtnElement = document.querySelector('.weekday-dropdown-btn');
const weekDaysDropdownElement = document.querySelector('.weekday-dropdown-options');
const unitsDropdownBtnElement = document.querySelector('.units-dropdown-btn');
const unitsDropdownElement = document.querySelector('.dropdown-options');


searchFormElement.addEventListener('submit', (event) => {
    event.preventDefault();
    displayWeatherInfoOfCity();
});


async function displayWeatherInfoOfCity() {
    const cityInfo = await weatherGet.getCityMainInfo();
    if (cityInfo == null) {
        return;
    }

    const [cityName, cityCountry, ...coordinates] = cityInfo;
    const [cityLatitude, cityLongitude] = coordinates;

    const currentWeatherData = await weatherGet.getCurrentWeatherData(cityLatitude, cityLongitude);
    const [temperature, apparentTemperature, humidity, windSpeed, precipitation, currentConditionCode] = currentWeatherData;
    const currentDate = weatherGet.getCurrentDate();
    const currentDayOfWeek = weatherGet.getCurrentDayOfTheWeek(currentDate);
    const currentWeatherConditionIcon = determineWeatherConditionIcon(currentConditionCode);

    weatherDisplay.displayLocationNames(cityName, cityCountry);
    weatherDisplay.displayCurrentWeatherData(temperature, apparentTemperature, humidity, windSpeed, precipitation, currentWeatherConditionIcon[0]);
    weatherDisplay.displayCurrentDate(currentDate, currentDayOfWeek);

    const dailyForecast = await weatherGet.getDailyForecast(cityLatitude, cityLongitude);
    const [higherTempValues, lowerTempValues, dailyConditionCodes] = dailyForecast;
    const dailyWeatherConditionIcons = determineWeatherConditionIcon(...dailyConditionCodes);
    
    weatherDisplay.displayDailyForecast(higherTempValues, lowerTempValues, currentDayOfWeek, dailyWeatherConditionIcons);
}


weekDaysDropdownBtnElement.addEventListener('click', () => {
    toggleDropdownVisibility(weekDaysDropdownElement);
});


unitsDropdownBtnElement.addEventListener('click', () => {
    toggleDropdownVisibility(unitsDropdownElement);
});


function toggleDropdownVisibility(dropdownElement) {
    const elementVisibility = window.getComputedStyle(dropdownElement).visibility;

    if (elementVisibility === 'hidden') {
        dropdownElement.style.visibility = 'visible';
        return;
    }

    if (elementVisibility === 'visible') {
        dropdownElement.style.visibility = 'hidden';
    }
}

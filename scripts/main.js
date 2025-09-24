import * as weatherGet from './get-weather-data.js';
import * as weatherDisplay from './display-weather-data.js';
import { determineWeatherConditionIcon } from './utils.js';

const searchFormElement = document.querySelector('form.search-form');


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
    const [temperature, apparentTemperature, humidity, windSpeed, precipitation] = currentWeatherData;
    const currentDate = weatherGet.getCurrentDate();
    const currentDayOfWeek = weatherGet.getCurrentDayOfTheWeek(currentDate);

    weatherDisplay.displayLocationNames(cityName, cityCountry);
    weatherDisplay.displayCurrentWeatherData(temperature, apparentTemperature, humidity, windSpeed, precipitation);
    weatherDisplay.displayCurrentDate(currentDate, currentDayOfWeek);

    const dailyForecast = await weatherGet.getDailyForecast(cityLatitude, cityLongitude);
    const [higherTempValues, lowerTempValues, dailyConditionCodes] = dailyForecast;
    const dailyWeatherConditionIcons = determineWeatherConditionIcon(...dailyConditionCodes);
    
    weatherDisplay.displayDailyForecast(higherTempValues, lowerTempValues, currentDayOfWeek, dailyWeatherConditionIcons);
}

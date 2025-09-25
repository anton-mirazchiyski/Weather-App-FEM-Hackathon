const searchInputElement = document.querySelector('.search-form input');


export async function getCityMainInfo() {
    const cityNameInput = searchInputElement.value;
    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityNameInput}&count=10&language=en&format=json`;

    try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();
        
        const firstOccurrence = data.results[0];
                                
        return [
            firstOccurrence.name,
            firstOccurrence.country,
            firstOccurrence.latitude,
            firstOccurrence.longitude,
        ];
    } catch(error) {
        return null;
    }
}


export async function getCurrentWeatherData(latitude, longitude) {
    const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,weather_code`;

    try {
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();

        const weatherInfo = data.current;
        
        return [
            weatherInfo.temperature_2m,
            weatherInfo.apparent_temperature,
            weatherInfo.relative_humidity_2m,
            weatherInfo.wind_speed_10m,
            weatherInfo.precipitation,
            weatherInfo.weather_code,
        ];
        
    } catch(error) {
        return null;
    }
}


export function getCurrentDate() {
    return Temporal.Now.plainDateISO();
}


export function getCurrentDayOfTheWeek(date) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const currentDayOfWeek = daysOfWeek[date.dayOfWeek - 1];
    return currentDayOfWeek;
}


export async function getDailyForecast(latitude, longitude) {
    const dailyForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;

    try {
        const response = await fetch(dailyForecastUrl);
        const data = await response.json();

        const higherTemperatureValues = data.daily.temperature_2m_max;
        const lowerTemperatureValues = data.daily.temperature_2m_min;
        const weatherConditionCodes = data.daily.weather_code;

        return [
            higherTemperatureValues,
            lowerTemperatureValues,
            weatherConditionCodes
        ];
        
    } catch(error) {
        return null;
    }
}

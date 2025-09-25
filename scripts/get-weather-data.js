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
    const urlParams = [
        'temperature_2m',
        'relative_humidity_2m',
        'apparent_temperature',
        'precipitation',
        'wind_speed_10m',
        'weather_code'
    ];

    const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${urlParams.join(',')}`;

    try {
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();

        const weatherInfo = data.current;
        
        return urlParams.map(param => weatherInfo[param]);
        
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
    const urlParams = [
        'temperature_2m_max',
        'temperature_2m_min',
        'weather_code'
    ];

    const dailyForecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=${urlParams.join(',')}&timezone=auto`;

    try {
        const response = await fetch(dailyForecastUrl);
        const data = await response.json();

        const dailyWeatherInfo = data.daily;

        return urlParams.map(param => dailyWeatherInfo[param]);

    } catch(error) {
        return null;
    }
}

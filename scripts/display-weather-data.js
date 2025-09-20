const searchInputElement = document.querySelector('.search-form input');


export async function displayWeatherInfoOfCity() {
    const cityInfo = await getCityMainInfo();
    if (cityInfo == null) {
        return;
    }

    const [cityName, cityCountry, ...coordinates] = cityInfo;
    const [cityLatitude, cityLongitude] = coordinates;

    const currentWeatherData = await getCurrentWeatherData(cityLatitude, cityLongitude);
    const [temperature, apparentTemperature, humidity, windSpeed, precipitation] = currentWeatherData;
    const currentDate = getCurrentDate();
    displayLocationNames(cityName, cityCountry);
    displayCurrentWeatherData(temperature, apparentTemperature, humidity, windSpeed, precipitation);
    displayCurrentDate(currentDate);
}


async function getCityMainInfo() {
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

async function getCurrentWeatherData(latitude, longitude) {
    const currentWeatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m`;

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
        ];
        
    } catch(error) {
        return null;
    }
}

function getCurrentDate() {
    return Temporal.Now.plainDateISO();
}


function displayCurrentWeatherData(temperature, apparentTemperature, humidity, windSpeed, precipitation) {
    const currentTemperatureElement = document.querySelector('.city-name-container .current-temperature-high');
    const apparentTemperatureElement = document.querySelector('.apparent-temperature');
    const humidityElement = document.querySelector('.humidity');
    const windSpeedElement = document.querySelector('.wind-speed');
    const precipitationElement = document.querySelector('.precipitation');

    currentTemperatureElement.textContent = `${Math.round(temperature)}°`;
    apparentTemperatureElement.textContent = `${Math.round(apparentTemperature)}°`;
    humidityElement.textContent = `${humidity}%`;
    windSpeedElement.textContent = `${Math.round(windSpeed)} km/h`;
    precipitationElement.textContent = `${precipitation} mm`;
}

function displayLocationNames(cityName, countryName) {
    const nameElement = document.querySelector('.city-info > .city-name');

    cityName !== countryName
                        ? nameElement.textContent = `${cityName}, ${countryName}`
                        : nameElement.textContent = `${countryName}`;
}

function displayCurrentDate(date) {
    const dateElement = document.querySelector('.city-info > .city-date');

    const monthsShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const currentDayOfWeek = daysOfWeek[date.dayOfWeek - 1];
    dateElement.textContent = `${currentDayOfWeek}, ${monthsShortNames[date.month - 1]} ${date.day}, ${date.year}`;
}

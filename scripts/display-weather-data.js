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
    // console.log(temperature, apparentTemperature, humidity, windSpeed, precipitation);
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

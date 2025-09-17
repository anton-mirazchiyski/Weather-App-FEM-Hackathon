const searchInputElement = document.querySelector('.search-form input');


export async function displayWeatherInfoOfCity() {
    const cityInfo = await getCityMainInfo();
    if (cityInfo == null) {
        return;
    }

    const [cityName, cityCountry, ...coordinates] = cityInfo;
    const [cityLatitude, cityLongitude] = coordinates;
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

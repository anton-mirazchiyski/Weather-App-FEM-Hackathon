export function displayCurrentWeatherData(temperature, apparentTemperature, humidity, windSpeed, precipitation, currentWeatherConditionIcon) {
    const currentTemperatureElement = document.querySelector('.city-name-container .current-temperature-high');
    const apparentTemperatureElement = document.querySelector('.apparent-temperature');
    const humidityElement = document.querySelector('.humidity');
    const windSpeedElement = document.querySelector('.wind-speed');
    const precipitationElement = document.querySelector('.precipitation');
    const imageIconElement = document.querySelector('.city-temperature img');

    currentTemperatureElement.textContent = `${Math.round(temperature)}°`;
    apparentTemperatureElement.textContent = `${Math.round(apparentTemperature)}°`;
    humidityElement.textContent = `${humidity}%`;
    windSpeedElement.textContent = `${Math.round(windSpeed)} km/h`;
    precipitationElement.textContent = `${precipitation} mm`;
    imageIconElement.src = currentWeatherConditionIcon;
}


export function displayLocationNames(cityName, countryName) {
    const nameElement = document.querySelector('.city-info > .city-name');

    cityName !== countryName
                        ? nameElement.textContent = `${cityName}, ${countryName}`
                        : nameElement.textContent = `${countryName}`;
}


export function displayCurrentDate(date, currentDayOfWeek) {
    const dateElement = document.querySelector('.city-info > .city-date');

    const monthsShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 

    dateElement.textContent = `${currentDayOfWeek}, ${monthsShortNames[date.month - 1]} ${date.day}, ${date.year}`;
}


export function displayDailyForecast(higherTempValues, lowerTempValues, currentDayOfWeek, dailyWeatherConditionIcons) {
    const weekDayInfoElements = document.querySelectorAll('.daily-forecast-data .weekday-info');

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayOfWeekIdx = daysOfWeek.indexOf(currentDayOfWeek.slice(0, 3));
    const currentDaysOfWeek = daysOfWeek.slice(currentDayOfWeekIdx,).concat(daysOfWeek.slice(0, currentDayOfWeekIdx));
    
    for (let i = 0; i < weekDayInfoElements.length; i++) {
        const weekDayInfoElement = weekDayInfoElements[i];

        const weekDayNameElement = weekDayInfoElement.querySelector('.weekday');
        const maxTemperatureElement = weekDayInfoElement.querySelector('.temp-high');
        const minTemperatureElement = weekDayInfoElement.querySelector('.temp-low');
        const imageIconElement = weekDayInfoElement.querySelector('.icon-container > img');

        weekDayNameElement.textContent = currentDaysOfWeek[i];
        maxTemperatureElement.textContent = `${Math.round(higherTempValues[i])}°`;
        minTemperatureElement.textContent = `${Math.round(lowerTempValues[i])}°`;
        imageIconElement.src = dailyWeatherConditionIcons[i];    
    } 
}

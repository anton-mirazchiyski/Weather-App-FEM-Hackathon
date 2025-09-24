export function determineWeatherConditionIcon(...weatherCodes) {
    const imagePath = '/assets/images';

    const weatherConditions = [
        {
            name: 'sunny',
            codes: [0, 1],
            icon: `${imagePath}/icon-sunny.webp`,
        },
        {
            name: 'partly-cloudy',
            codes: [2],
            icon: `${imagePath}/icon-partly-cloudy.webp`,
        },
        {
            name: 'overcast',
            codes: [3],
            icon: `${imagePath}/icon-overcast.webp`,
        },
        {
            name: 'drizzle',
            codes: [51, 53, 55, 56, 57],
            icon: `${imagePath}/icon-drizzle.webp`,
        },
        {
            name: 'rain',
            codes: [61, 63, 65, 66, 67, 80, 81, 82],
            icon: `${imagePath}/icon-rain.webp`,
        },
        {
            name: 'snow',
            codes: [71, 73, 75, 77, 85, 86],
            icon: `${imagePath}/icon-snow.webp`,
        },
        {
            name: 'storm',
            codes: [95, 96, 99],
            icon: `${imagePath}/icon-storm.webp`,
        },
        {
            name: 'fog',
            codes: [45, 48],
            icon: `${imagePath}/icon-fog.webp`,
        },
    ];
    
    const currentWeatherIcons = [];

    weatherCodes.forEach(weatherCode => {
        const currentCondition = weatherConditions.find(weatherCondition => weatherCondition.codes.includes(weatherCode));
        currentWeatherIcons.push(currentCondition.icon);
    });

    return currentWeatherIcons;
}

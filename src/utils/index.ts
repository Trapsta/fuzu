import { WeatherData } from "../contexts/AppContext";

export async function fetchWeatherData(city: string, countryCode: string, includeForecast: boolean): Promise<WeatherData>  {
    const apiKey = process.env.OPEN_WEATHER_API_KEY || 'e416b78df6e87d22b228f24c67e1a2d2'

    try {
        // Fetch current weather data
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
        if (!currentWeatherResponse.ok) {
            throw new Error(`Failed to fetch current weather data. Status: ${currentWeatherResponse.status}`);
        }
        const currentWeatherData = await currentWeatherResponse.json();

        // If includeForecast is true, fetch forecast data
        let forecastData;
        if (includeForecast) {
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
            if (!forecastResponse.ok) {
                throw new Error(`Failed to fetch forecast data. Status: ${forecastResponse.status}`);
            }
            forecastData = await forecastResponse.json();
        }

        return { current: currentWeatherData, forecast: forecastData };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

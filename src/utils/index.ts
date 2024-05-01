import "@formatjs/intl-numberformat/polyfill";
import "@formatjs/intl-numberformat/locale-data/en";

import { CurrentWeatherData, WeatherData } from "../contexts/AppContext";

export async function fetchWeatherData(
  city: string,
  countryCode: string,
  includeForecast: boolean,
  locale?: string
): Promise<WeatherData> {
  const apiKey =
    process.env.REACT_APP_OPEN_WEATHER_API_KEY ||
    "e416b78df6e87d22b228f24c67e1a2d2";

  const lang = locale !== "sw" ? "en" : "sw";
  const units = locale !== "sw" ? "standard" : "metric";

  try {
    // Fetch current weather data.
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=${units}&lang=${lang}`
    );
    if (!currentWeatherResponse.ok) {
      throw new Error(
        `Failed to fetch current weather data. Status: ${currentWeatherResponse.status}`
      );
    }
    const currentWeatherData = await currentWeatherResponse.json();

    // If includeForecast is true, fetch forecast data.
    let forecastData;
    if (includeForecast) {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&appid=${apiKey}&units=${units}&lang=${lang}`
      );
      if (!forecastResponse.ok) {
        throw new Error(
          `Failed to fetch forecast data. Status: ${forecastResponse.status}`
        );
      }
      forecastData = await forecastResponse.json();
    }

    return { current: currentWeatherData, forecast: forecastData };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export const tempDisplay = (temperature: number, userLocale = "en-US") => {
  // Format temperature according to the user's locale.
  const unitSystem = userLocale === "en-US" ? "fahrenheit" : "celsius";

  const formatted = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: unitSystem,
  }).format(Math.round(temperature));

  return formatted;
};

export const windDisplay = (speed: number, userLocale = "en-US") => {
  const unitSystem =
    userLocale === "en-US" ? "mile-per-hour" : "meter-per-second";

  const formatted = new Intl.NumberFormat(undefined, {
    style: "unit",
    unit: unitSystem,
  }).format(Math.round(speed));

  return formatted;
};

export const pressureDisplay = (pressure: number) => {
  const formatted = `${Math.round(pressure)} hPa`;

  return formatted;
};

export const UVIndexDisplay = (uvIndex: number) => {
  // Determine UV index level based on UV index value.
  let uvIndexLevel;
  if (uvIndex <= 2) {
    uvIndexLevel = "Low";
  } else if (uvIndex <= 5) {
    uvIndexLevel = "Moderate";
  } else if (uvIndex <= 7) {
    uvIndexLevel = "High";
  } else if (uvIndex <= 10) {
    uvIndexLevel = "Very High";
  } else {
    uvIndexLevel = "Extreme";
  }

  return uvIndexLevel;
};

export const humidityDisplay = (humidity: number) => {
  const formatted = `${Math.round(humidity)} %`;

  return formatted;
};

export const timeDisplay = (time: string) => {
  const formatted = new Date(time).toLocaleTimeString(undefined, {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });

  return formatted;
};

export const getNextForecast = (forecastData: CurrentWeatherData[]) => {
  const currentTime = new Date();

  // Init with a default value indicating not found.
  let nextHourIndex = -1;

  for (let i = 0; i < forecastData.length; i++) {
    // Get item's date and time.
    const forecastDateTime = new Date(forecastData[i].dt_txt as string);

    // Compare forecast date with current date.
    if (forecastDateTime > currentTime) {
      // Found the index of the next hour's forecast.
      nextHourIndex = i;
      break;
    }
  }

  // If next hour's forecast not found, default to the first.
  if (nextHourIndex === -1) {
    nextHourIndex = 0;
  }

  return forecastData.slice(nextHourIndex, nextHourIndex + 5);
};

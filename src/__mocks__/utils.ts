import mockWeatherData from "./mock-data";

export const fetchWeatherData = jest.fn().mockResolvedValue(mockWeatherData);

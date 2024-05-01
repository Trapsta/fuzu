import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWeatherData } from "../utils";

type CurrentWeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type ForecastData = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain?: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
};

export type WeatherData = {
  current: CurrentWeatherData;
  forecast?: ForecastData;
};

type AppContextType = {
  countryCode: string;
  locations: string[];
  currentLocation: string;
  currentLocationWeather: WeatherData | null;
  allLocationsWeather: WeatherData[];
};

const initialState = {
  countryCode: "KE",
  locations: [
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Naivasha",
    "Nyeri",
    "Machakos",
    "Eldoret",
    "Meru",
    "Mandera",
    "Kakamega",
  ],
  currentLocation: "Nairobi",
  currentLocationWeather: null,
  allLocationsWeather: [],
};

const AppContext = createContext<AppContextType>(initialState);

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
}

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [state, setState] = useState<AppContextType>(initialState);

  // Let's' implement the fetching logic for weather data here.
  useEffect(() => {
    // Fetch current location weather data.
    fetchWeatherData(state.currentLocation, state.countryCode, true)
      .then((weatherData) => {
        setState((prevState) => ({
          ...prevState,
          currentLocationWeather: weatherData,
        }));
      })
      .catch((error: any) =>
        console.error("Error fetching current location weather data:", error)
      );

    // Fetch weather data for all locations.
    Promise.all(
      state.locations.map((location) => {
        return fetchWeatherData(location, state.countryCode, false);
      })
    )
      .then((allLocationsWeatherData) => {
        setState((prevState) => ({
          ...prevState,
          allLocationsWeather: allLocationsWeatherData,
        }));
      })
      .catch((error) =>
        console.error("Error fetching weather data for all locations:", error)
      );
  }, [state.currentLocation, state.locations]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

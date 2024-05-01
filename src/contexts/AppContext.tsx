import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchWeatherData } from "../utils";
import { useConfig } from "./ConfigContext";

export type CurrentWeatherData = {
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
  dt_txt?: string;
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
  list: CurrentWeatherData[];
};

export type WeatherData = {
  current: CurrentWeatherData;
  forecast?: ForecastData;
};

type AppContextType = {
  loadingState: boolean;
  countryCode: string;
  locations: string[];
  currentLocation: string;
  currentLocationWeather: WeatherData | null;
  allLocationsWeather: WeatherData[];
};

const initialState = {
  loadingState: false,
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
  const { locale } = useConfig();

  // Let's' implement the fetching logic for weather data here.
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loadingState: true,
    }));
    // Fetch current location weather data.
    fetchWeatherData(state.currentLocation, state.countryCode, true, locale)
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
        return fetchWeatherData(location, state.countryCode, false, locale);
      })
    )
      .then((allLocationsWeatherData) => {
        setState((prevState) => ({
          ...prevState,
          allLocationsWeather: allLocationsWeatherData,
          loadingState: false,
        }));
      })
      .catch((error) => {
        console.error("Error fetching weather data for all locations:", error);
        setState((prevState) => ({
          ...prevState,
          loadingState: false,
        }));
      });
  }, [state.currentLocation, state.locations, locale]);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

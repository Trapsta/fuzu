import { WeatherData } from "../contexts/AppContext";

const mockWeatherData: WeatherData = {
  current: {
    coord: {
      lon: 36.8167,
      lat: -1.2833,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10n",
      },
    ],
    base: "stations",
    main: {
      temp: 18.62,
      feels_like: 18.99,
      temp_min: 18.62,
      temp_max: 18.87,
      pressure: 1020,
      humidity: 94,
    },
    visibility: 10000,
    wind: {
      speed: 2.06,
      deg: 170,
    },
    clouds: {
      all: 75,
    },
    dt: 1714594640,
    sys: {
      type: 1,
      id: 2543,
      country: "KE",
      sunrise: 1714534060,
      sunset: 1714577506,
    },
    timezone: 10800,
    id: 184745,
    name: "Nairobi",
    cod: 200,
  },
  forecast: {
    list: [
      {
        dt: 1714640400,
        main: {
          temp: 21.74,
          feels_like: 21.82,
          temp_min: 21.74,
          temp_max: 21.74,
          pressure: 1012,
          humidity: 71,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 84,
        },
        wind: {
          speed: 4.48,
          deg: 248,
        },
        visibility: 10000,
        dt_txt: "2024-05-02 09:00:00",
        coord: {
          lon: 0,
          lat: 0,
        },
        base: "",
        sys: {
          type: 0,
          id: 0,
          country: "",
          sunrise: 0,
          sunset: 0,
        },
        timezone: 0,
        id: 122283737,
        name: "",
        cod: 0,
      },
      {
        dt: 1714651200,
        main: {
          temp: 23.77,
          feels_like: 23.85,
          temp_min: 23.77,
          temp_max: 23.77,
          pressure: 1009,
          humidity: 63,
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        clouds: {
          all: 80,
        },
        wind: {
          speed: 3.2,
          deg: 238,
        },
        visibility: 10000,
        dt_txt: "2024-05-02 12:00:00",
        coord: {
          lon: 0,
          lat: 0,
        },
        base: "",
        sys: {
          type: 0,
          id: 0,
          country: "",
          sunrise: 0,
          sunset: 0,
        },
        timezone: 0,
        id: 1627458191,
        name: "",
        cod: 0,
      },
      {
        dt: 1714662000,
        main: {
          temp: 20.1,
          feels_like: 20.39,
          temp_min: 20.1,
          temp_max: 20.1,
          pressure: 1011,
          humidity: 85,
        },
        weather: [
          {
            id: 500,
            main: "Rain",
            description: "light rain",
            icon: "10d",
          },
        ],
        clouds: {
          all: 89,
        },
        wind: {
          speed: 0.81,
          deg: 202,
        },
        visibility: 10000,
        dt_txt: "2024-05-02 15:00:00",
        coord: {
          lon: 0,
          lat: 0,
        },
        base: "",
        sys: {
          type: 0,
          id: 0,
          country: "",
          sunrise: 0,
          sunset: 0,
        },
        timezone: 0,
        id: 253664748,
        name: "",
        cod: 0,
      },
    ],
  },
};

export default mockWeatherData;

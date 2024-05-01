import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { WeatherData, useApp } from "../contexts/AppContext";
import { tempDisplay } from "../utils";
import { useConfig } from "../contexts/ConfigContext";
import TempWithUnits from "./TempWithUnits";

type Props = {
  location: WeatherData;
};

const LocationCard = ({ location }: Props) => {
  const { currentLocation, setCurrentLocation } = useApp();
  const { locale } = useConfig();
  const currentWeather = location.current;
  const weatherIconCode = currentWeather?.weather[0].icon;

  if (currentLocation === currentWeather?.name) {
    // Let's omit current location in locations.
    return null;
  }

  return (
    <Card
      className="max-w-[340px] bg-white border border-gray-200 hover:bg-gray-100 dark:bg-darkTheme-currentBg dark:border-none"
      isPressable
      onPress={() => setCurrentLocation(currentWeather?.name)}
    >
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h3 className="text-xl font-semibold leading-none text-darkTheme-locationBg dark:text-white">
              <TempWithUnits
                temperature={tempDisplay(currentWeather.main.temp, locale)}
              />
            </h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
              className="absolute top-2 right-2 w-20 h-20 z-1"
              alt="weather icon"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody
        aria-label="Location Name"
        className="mt-3 px-3 py-3 text-small text-gray-500 dark:text-gray-400"
      >
        <p className="font-semibold">{currentWeather?.name}</p>
      </CardBody>
    </Card>
  );
};

export default LocationCard;

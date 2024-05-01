import { SunIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { WeatherData } from "../contexts/AppContext";
import { tempDisplay } from "../utils";

type Props = {
  location: WeatherData;
};

const LocationCard = ({ location }: Props) => {
  const currentWeather = location.current;
  const weatherIconCode = currentWeather?.weather[0].icon;

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h3 className="text-xl font-semibold leading-none text-default-600">
              {tempDisplay(currentWeather.main.temp)}
            </h3>
            <img
              src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
              className="absolute top-2 right-2 w-20 h-20 z-1"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="mt-3 px-3 py-3 text-small text-default-400">
        <p className="font-bold">{currentWeather?.name}</p>
      </CardBody>
    </Card>
  );
};

export default LocationCard;

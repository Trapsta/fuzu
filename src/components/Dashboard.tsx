import {
  ArrowsPointingInIcon,
  FlagIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Input } from "@nextui-org/input";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Spinner } from "@nextui-org/spinner";
import { filter, map } from "lodash";

import { WeatherData, useApp } from "../contexts/AppContext";
import LocationCard from "./LocationCard";
import {
  getNextForecast,
  humidityDisplay,
  pressureDisplay,
  tempDisplay,
  timeDisplay,
  windDisplay,
} from "../utils";
import ThemeToggle from "./ThemeToggle";
import LocaleToggle from "./LocaleToggle";
import { useConfig } from "../contexts/ConfigContext";
import TempWithUnits from "./TempWithUnits";
import { useState } from "react";

const DashboardContainer = styled.div`
  .app-title {
    color: ${(props) => props.theme.primary};
  }
  .locations-container {
    background-color: ${(props) => props.theme.locationBg};
  }
  .current-weather-container {
    background-color: ${(props) => props.theme.currentBg};
  }
  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const Dashboard = () => {
  const [keyword, setKeyword] = useState("");
  const { locale, theme } = useConfig();
  const {
    currentLocationWeather,
    allLocationsWeather,
    countryCode,
    loadingState,
    error,
  } = useApp();
  const currentLocation = currentLocationWeather?.current.name;

  const nextForecast = getNextForecast(
    currentLocationWeather?.forecast?.list || []
  );

  const relevantLocations = !keyword
    ? allLocationsWeather
    : filter(allLocationsWeather, (location) =>
        location.current.name
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
      );

  return (
    <DashboardContainer
      className={`fixed inset-0 grid gap-0 grid-cols-2 grid-rows-1 ${
        theme === "dark" ? "dark" : "light"
      }`}
    >
      {error && (
        <div className="rounded-md bg-red-50 p-4 fixed z-50 top-20 left-1/2 transform -translate-x-1/2">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-8 w-8 !text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Oops!</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {/* @ts-ignore error is type any */}
                  {error?.message ||
                    error ||
                    "There was an error fetching weather data. Please try again later."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="locations-container p-12">
        <h3 className="text-xl font-bold tracking-tight text-darkTheme-locationBg dark:text-white sm:text-2xl">
          <span className="app-title">Fuzu</span>{" "}
          <FormattedMessage id="app.title" />
        </h3>

        {/* Search */}
        {allLocationsWeather.length > 0 && (
          <div className="mt-12 m-auto max-w-80">
            <Input
              isClearable
              onClear={() => setKeyword("")}
              radius="sm"
              classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                  "bg-transparent",
                  "text-black/90 dark:text-white/90",
                  "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-md",
                  "bg-default-200/50",
                  "dark:bg-default/60",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/70",
                  "dark:hover:bg-default/70",
                  "group-data-[focused=true]:bg-default-200/50",
                  "dark:group-data-[focused=true]:bg-default/60",
                  "!cursor-text",
                ],
              }}
              placeholder="Search location"
              onChange={(e) => setKeyword(e.target.value)}
              startContent={
                <MagnifyingGlassIcon
                  width={24}
                  height={24}
                  className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
                />
              }
            />
          </div>
        )}

        {/* Locations */}
        <div
          aria-label="Locations Grid"
          className="mt-6 m-auto max-w-80 grid gap-3 grid-cols-2"
        >
          {map(relevantLocations, (location: WeatherData) => (
            <LocationCard location={location} key={location.current.id} />
          ))}
        </div>
      </div>
      <div className="current-weather-container p-8">
        <div className="px-2 flex gap-3 items-center justify-end">
          <LocaleToggle />
          <ThemeToggle />
          <a href="https://github.com/Trapsta/fuzu" target="_blank" rel="noreferrer">
            <svg
              width="28"
              height="28"
              aria-hidden="true"
              className="octicon octicon-mark-github"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>
        </div>
        <h3 className="mt-20 text-center text-xl font-bold tracking-tight text-darkTheme-locationBg dark:text-white sm:text-2xl">
          <FormattedMessage id="weather.forecast" />{" "}
          <span className="app-title">{currentLocation}</span>
        </h3>

        <div className="py-6">
          {currentLocationWeather && (
            <Card className="w-full h-[330px] col-span-12 sm:col-span-7 subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150 bg-gray-500">
              <CardHeader className="px-4 h-full absolute z-10 top-0 flex-col items-start subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150">
                <div className="font-bold text-white/90 font-medium text-xl w-full">
                  <FormattedMessage id="today" />
                  <span className="text-xs text-white float-right mt-2 mr-3">
                    <FormattedDate
                      value={new Date()}
                      year="numeric"
                      month="long"
                      day="numeric"
                      weekday="long"
                    />
                  </span>
                </div>
                <div className="mt-4 relative w-full grid gap-3 grid-cols-2 grid-rows-1">
                  <div className="text-6xl font-semibold leading-none text-white">
                    <TempWithUnits
                      temperature={tempDisplay(
                        currentLocationWeather?.current.main.temp,
                        locale
                      )}
                    />
                    <span className="text-sm text-white/80 block px-2 mt-2">
                      <FormattedMessage id="real.feel" />:{" "}
                      <TempWithUnits
                        temperature={tempDisplay(
                          currentLocationWeather?.current.main.feels_like,
                          locale
                        )}
                      />
                    </span>
                    <span className="text-sm text-white/80 block px-2 py-1">
                      {currentLocationWeather?.current.weather[0].description}
                    </span>
                  </div>
                  <img
                    src={`https://openweathermap.org/img/wn/${currentLocationWeather?.current.weather[0].icon}@4x.png`}
                    className="px-2 w-40 h-40 -mt-12"
                    alt="weather icon"
                  />
                </div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="relative overflow-hidden rounded-lg px-4">
                    <dt>
                      <div className="absolute rounded-md p-3">
                        <FlagIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-12 truncate text-sm font-medium text-white/60">
                        <FormattedMessage id="wind.speed" />
                      </p>
                    </dt>
                    <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-xl font-semibold text-white">
                        {windDisplay(
                          currentLocationWeather.current.wind.speed,
                          locale
                        )}
                      </p>
                    </dd>
                  </div>

                  <div className="relative overflow-hidden rounded-lg px-4">
                    <dt>
                      <div className="absolute rounded-md p-3">
                        <ArrowsPointingInIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-12 truncate text-sm font-medium text-white/60">
                        <FormattedMessage id="pressure" />
                      </p>
                    </dt>
                    <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-xl font-semibold text-white">
                        {pressureDisplay(
                          currentLocationWeather.current.main.pressure
                        )}
                      </p>
                    </dd>
                  </div>

                  <div className="relative overflow-hidden rounded-lg px-4">
                    <dt>
                      <div className="absolute rounded-md p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-droplet h-6 w-6 "
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 01-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 005.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0010 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                          ></path>
                          <path
                            fillRule="evenodd"
                            d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                          ></path>
                        </svg>
                      </div>
                      <p className="ml-12 truncate text-sm font-medium text-white/60">
                        <FormattedMessage id="humidity" />
                      </p>
                    </dt>
                    <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-xl font-semibold text-white">
                        {humidityDisplay(
                          currentLocationWeather.current.main.humidity
                        )}
                      </p>
                    </dd>
                  </div>
                </dl>
                <div className="flex flex-grow gap-2 items-center">
                  <MapPinIcon className="rounded-full w-10 h-11" />
                  <p className="text-sm text-white/60">
                    {currentLocation} , {countryCode}
                  </p>
                </div>
              </CardHeader>
              <Image
                removeWrapper
                alt="weather app background"
                className="z-0 w-full h-full object-cover"
                src={`https://source.unsplash.com/random/640x424?${currentLocation}`}
              />
            </Card>
          )}
        </div>
        {nextForecast.length > 0 && (
          <div className="py-6">
            <h3 className="text-base font-semibold leading-6 text-darkTheme-locationBg dark:text-white">
              <FormattedMessage id="weather.expect" /> {currentLocation}
            </h3>

            <dl className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {map(nextForecast, (item) => (
                <div
                  key={item.id}
                  className="relative overflow-hidden rounded-lg bg-lightTheme-locationBg dark:bg-darkTheme-locationBg px-4 py-3 shadow"
                >
                  <dt className="flex flex-col w-full">
                    {item.dt_txt && (
                      <p className="truncate text-sm text-center font-medium text-darkTheme-locationBg dark:text-white">
                        {timeDisplay(item.dt_txt)}
                      </p>
                    )}
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      className="h-10 w-10 text-white m-auto py-1.5"
                      alt="weather icon"
                    />
                    <p className="truncate text-xl text-center font-semibold text-darkTheme-locationBg dark:text-white">
                      <TempWithUnits
                        temperature={tempDisplay(item.main.temp, locale)}
                      />
                    </p>
                    <p className="mt-2 truncate text-sm text-center font-medium text-darkTheme-locationBg dark:text-gray-400">
                      {item.weather[0].description}
                    </p>
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
      {loadingState && (
        <div className={`absolute inset-0 bg-black opacity-40 flex z-50`}>
          <div className="m-auto">
            <Spinner size="lg" color="success" className="w-20 h-20" />
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;

import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, SunIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";
import { FormattedDate, FormattedMessage } from "react-intl";
import { Input } from "@nextui-org/input";
import { Card, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { map } from "lodash";

import { useApp } from "../contexts/AppContext";
import LocationCard from "./LocationCard";

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

const stats = [
  { id: 1, name: "Wind Speed", stat: "9.8 mph", icon: UsersIcon },
  { id: 2, name: "Pressure", stat: "12 Kpa", icon: EnvelopeOpenIcon },
  { id: 3, name: "UV Index", stat: "24.5", icon: CursorArrowRaysIcon },
];

const expect = [
  { id: 1, name: "Wind Speed", stat: "9.8 mph", icon: UsersIcon },
  { id: 2, name: "Pressure", stat: "12 Kpa", icon: EnvelopeOpenIcon },
  { id: 3, name: "UV Index", stat: "24.5", icon: CursorArrowRaysIcon },
  { id: 1, name: "Wind Speed", stat: "9.8 mph", icon: UsersIcon },
  { id: 2, name: "Pressure", stat: "12 Kpa", icon: EnvelopeOpenIcon },
];

const Dashboard = (props: any) => {
  const { currentLocation, locations } = useApp();
  return (
    <DashboardContainer className="fixed inset-0 grid gap-0 grid-cols-2 grid-rows-1">
      <div className="locations-container p-12">
        <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          <span className="app-title">Fuzu</span>{" "}
          <FormattedMessage id="app.title" />
        </h3>

        {/* Search */}
        <div className="mt-12 m-auto max-w-80">
          <Input
            isClearable
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
            startContent={
              <MagnifyingGlassIcon
                width={24}
                height={24}
                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
              />
            }
          />
        </div>

        {/* Locations */}
        <div className="mt-6 m-auto max-w-80 grid gap-3 grid-cols-2">
          {map(locations, (location: string) => (
            <LocationCard location={location} />
          ))}
        </div>
      </div>
      <div className="current-weather-container p-8">
        <div className="px-2 float-right">
          <a href="https://github.com/Trapsta/fuzu" target="_blank">
            <svg
              width="24"
              height="24"
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
        <h3 className="mt-20 text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          <FormattedMessage id="weather.forecast" /> -{" "}
          <span className="app-title">{currentLocation}</span>
        </h3>

        <div className="py-6">
          <Card className="w-full h-[330px] col-span-12 sm:col-span-7 subpixel-antialiased rounded-b-large backdrop-blur backdrop-saturate-150">
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
                  28 C
                  <span className="text-sm text-white/80 block px-2 mt-2">
                    RealFeel: 32 C
                  </span>
                  <span className="text-sm text-white/80 block px-2 py-1">
                    Partly Cloudy
                  </span>
                </div>
                <SunIcon width={120} height={120} className="px-2" />
              </div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg px-4"
                  >
                    <dt>
                      <div className="absolute rounded-md p-3">
                        <item.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="ml-12 truncate text-sm font-medium text-white/60">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="ml-12 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-xl font-semibold text-white">
                        {item.stat}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-grow gap-2 items-center">
                <MapPinIcon className="rounded-full w-10 h-11 bg-black" />
                <p className="text-sm text-white/60">{currentLocation}</p>
              </div>
            </CardHeader>
            <Image
              removeWrapper
              alt="weather app background"
              className="z-0 w-full h-full object-cover"
              src={`https://source.unsplash.com/random/640x424?${currentLocation}`}
            />
          </Card>
        </div>
        <div className="py-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            <FormattedMessage id="weather.expect" />
          </h3>

          <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {expect.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-lg bg-white px-4 py-3 shadow"
              >
                <dt className="flex flex-col w-full">
                  <p className="truncate text-sm text-center font-medium text-gray-500">
                    2:00 PM
                  </p>
                  <item.icon
                    className="h-10 w-10 text-white m-auto py-1.5"
                    aria-hidden="true"
                  />
                  <p className="truncate text-xl text-center font-semibold text-gray-900">
                    32 C
                  </p>
                  <p className="truncate text-sm text-center font-medium text-gray-500">
                    Mostly Sunny
                  </p>
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;

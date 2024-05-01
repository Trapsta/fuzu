import { ReactElement, ReactNode } from "react";
import { RenderOptions, render } from "@testing-library/react";

import {
  AppProvider,
  initialState,
} from "../contexts/AppContext";
import { defaultLocale, locales } from "../i18n/config";
import { IntlProvider } from "react-intl";
import mockWeatherData from "../__mocks__/mock-data";

const mockState = {
  ...initialState,
  currentLocationWeather: null,
  allLocationsWeather: [mockWeatherData],
  currentLocation: "Mombasa",
};

const AllTheProviders = ({
  children,
  overrideState,
}: {
  children: ReactNode;
  overrideState?: any;
}) => {
  return (
    <AppProvider
      defaultState={
        overrideState ? { ...mockState, ...overrideState } : mockState
      }
    >
      <IntlProvider locale={defaultLocale} messages={locales[defaultLocale]}>
        {children}
      </IntlProvider>
    </AppProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: { overrideState?: any } & Omit<RenderOptions, "wrapper">
) => {
  const { overrideState, ...restOptions } = options || {};
  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} overrideState={overrideState} />,
    ...restOptions
  });
};

// Re-export everything.
export * from "@testing-library/react";

// Override render method.
export { customRender as render };

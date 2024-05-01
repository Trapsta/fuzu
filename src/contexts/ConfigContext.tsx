import { createContext, useState, useContext, ReactNode } from "react";
import { defaultLocale } from "../i18n/config";

type ConfigContextType = {
  locale: "en-US" | "sw";
  toggleLocale: () => void;
  theme: string;
  toggleTheme: () => void;
};

const initialState = {
  locale: defaultLocale,
  toggleLocale: () => {},
  theme: "light",
  toggleTheme: () => {},
};

const ConfigContext = createContext<ConfigContextType>(initialState);

type ConfigProviderProps = {
  children: ReactNode;
};

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [locale, setLocale] = useState(initialState.locale);
  const [theme, setTheme] = useState(initialState.theme);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === "en-US" ? "sw" : "en-US")); // Toggle between 'en' and 'fr'
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light")); // Toggle between 'en' and 'fr'
  };

  return (
    <ConfigContext.Provider
      value={{ locale, toggleLocale, theme, toggleTheme }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);

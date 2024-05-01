import { ThemeProvider } from "styled-components";
import { NextUIProvider } from "@nextui-org/system";
import { FormattedMessage } from "react-intl";

import { AppProvider } from "./contexts/AppContext";
import { GlobalStyles } from "./styles/global-styles";
import { lightTheme, darkTheme } from "./styles/themes";
import useTheme from "./hooks/useTheme";
import useLocale from "./hooks/useLocale";
import ThemeToggler from "./components/ThemeToggler";
import LanguageToggler from "./components/LanguageToggler";
import I18n from "./i18n/I18n";
import Dashboard from "./components/Dashboard";

const App = () => {
  const [theme, themeToggler] = useTheme();
  const [language, languageToggler] = useLocale();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <NextUIProvider>
      <AppProvider>
        <I18n locale={language as "en-US" | "sw"}>
          <ThemeProvider theme={selectedTheme}>
            {false && (
              <>
                <GlobalStyles />
                <div className="flex flex-wrap gap-4 items-center">
                  <ThemeToggler themeToggler={themeToggler} />
                  <LanguageToggler
                    languageToggler={languageToggler}
                    locale={language}
                  />
                </div>
                <h1 className="text-3xl font-bold underline">
                  <FormattedMessage id="app.title" />
                </h1>
                <h2>
                  <FormattedMessage id="app.tagline" />
                </h2>
              </>
            )}
            <Dashboard />
          </ThemeProvider>
        </I18n>
      </AppProvider>
    </NextUIProvider>
  );
};
export default App;

import { ThemeProvider } from "styled-components";
import { FormattedMessage } from "react-intl";

import { GlobalStyles } from "./styles/global-styles";
import { lightTheme, darkTheme } from "./styles/themes";
import useTheme from "./hooks/useTheme";
import useLocale from "./hooks/useLocale";
import ThemeToggler from "./components/ThemeToggler";
import LanguageToggler from "./components/LanguageToggler";
import I18n from "./i18n/I18n";

const App = () => {
  const [theme, themeToggler] = useTheme();
  const [language, languageToggler] = useLocale();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <I18n locale={language as "en-US" | "sw"}>
      <ThemeProvider theme={selectedTheme}>
        <>
          <GlobalStyles />
          <ThemeToggler themeToggler={themeToggler} />
          <LanguageToggler
            languageToggler={languageToggler}
            locale={language}
          />
          <h1>
            <FormattedMessage id="app.title" />
          </h1>
          <h2>
            <FormattedMessage id="app.tagline" />
          </h2>
        </>
      </ThemeProvider>
    </I18n>
  );
};
export default App;

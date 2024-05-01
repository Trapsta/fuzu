import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme } from "./themes";
import { useConfig } from "../contexts/ConfigContext";

type Props = {
  children: ReactNode;
};

/* Init IntlProvider with locale, defaultLocale for fallback and out translations. */

export default function Theme({ children }: Props) {
  const { theme } = useConfig();
  const selectedTheme = theme === "light" ? lightTheme : darkTheme;

  return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
}

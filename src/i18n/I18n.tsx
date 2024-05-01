import { IntlProvider } from "react-intl";
import { defaultLocale, locales } from "./config";
import { ReactNode } from "react";
import { useConfig } from "../contexts/ConfigContext";

type Props = {
  children: ReactNode
};

/* Init IntlProvider with locale, defaultLocale for fallback and out translations. */

export default function I18n({ children }: Props) {
  const { locale } = useConfig();
   
  return (
    <IntlProvider
      locale={locale || defaultLocale}
      defaultLocale={defaultLocale}
      messages={locales[locale]}
    >
      {children}
    </IntlProvider>
  );
}

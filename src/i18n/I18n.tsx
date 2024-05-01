import { IntlProvider } from "react-intl";
import { defaultLocale, locales } from "./config";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  locale: "en-US" | "sw";
};

/* Init IntlProvider with locale, defaultLocale for fallback and out translations. */

export default function I18n({ locale, children }: Props) {
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

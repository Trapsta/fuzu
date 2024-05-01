import { useState } from "react";
import { defaultLocale } from "../i18n/config";

const useLocale = () => {
  const [locale, setLocale] = useState<"en-US" | "sw">(defaultLocale);
  const localeToggler = () => {
    locale === "sw" ? setLocale("en-US") : setLocale("sw");
  };
  return [locale, localeToggler];
};

export default useLocale;

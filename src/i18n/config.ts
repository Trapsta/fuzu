// Default to en-us.
export const defaultLocale: "en-US" | "sw" = "en-US";

// Let's support en-us & swahili.
export const locales = {
  // English translations.
  // Note that a message has to use the
  // same ID/key across locales.
  "en-US": {
    "app.title": "Fuzu Weather App",
    "app.tagline": "Today's weather",
  },
  // Swahili translations.
  sw: {
    "app.title": "Fuzu Hali ya Hewa",
    "app.tagline": "Hali ya hewa ya leo",
  },
};

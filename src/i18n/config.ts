// Default to en-us.
export const defaultLocale: "en-US" | "sw" = "en-US";

// Let's support en-us & swahili.
export const locales = {
  // English translations.
  // Note that a message has to use the
  // same ID/key across locales.
  "en-US": {
    "app.title": "Weather App",
    "app.tagline": "Today's weather",
    "weather.forecast": "Weather Forecast",
    "today": "Today",
    "weather.expect": "What to expect in the next few hours in",
    "wind.speed": "Wind Speed",
    "pressure": "Pressure",
    "humidity": "Humidity",
    "real.feel": "RealFeel"
  },
  // Swahili translations.
  sw: {
    "app.title": "Hali ya Hewa",
    "app.tagline": "Hali ya hewa ya leo",
    "weather.forecast": "Utabiri wa hali ya hewa",
    "today": "Leo Hii",
    "weather.expect": "Hali ya kutarajia katika saa chache zijazo hapa",
    "wind.speed": "Kasi ya Upepo",
    "pressure": "Shinikizo",
    "humidity": "Unyevu",
    "real.feel": "Hisia ya Kweli"
  },
};

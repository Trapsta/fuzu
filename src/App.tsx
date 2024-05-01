import { NextUIProvider } from "@nextui-org/system";

import { AppProvider } from "./contexts/AppContext";
import I18n from "./i18n/I18n";
import Dashboard from "./components/Dashboard";
import { ConfigProvider } from "./contexts/ConfigContext";
import Theme from "./styles/theme";

const App = () => {
  return (
    <ConfigProvider>
      <NextUIProvider>
        <AppProvider>
          <I18n>
            <Theme>
              <Dashboard />
            </Theme>
          </I18n>
        </AppProvider>
      </NextUIProvider>
    </ConfigProvider>
  );
};
export default App;

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global-styles"
import { lightTheme, darkTheme } from "./styles/themes";
import useTheme from "./hooks/useTheme";
import ThemeToggler from "./components/ThemeToggler";

const App = () => {
   const [theme, themeToggler] = 
   useTheme();
   const selectedTheme = theme === 'light' ? lightTheme : darkTheme;

   return (
      <ThemeProvider theme={selectedTheme}>
         <>
            <GlobalStyles />
            <ThemeToggler themeToggler={themeToggler} />
            <p>Fuzu Weather App</p>
         </>
      </ThemeProvider>
   )
}
export default App;
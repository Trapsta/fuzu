import { useState } from 'react';

const THEMES = {
   LIGHT: "light",
   DARK: "dark"
}

const useTheme = () => {
    const [theme, setTheme] = useState(THEMES.LIGHT);
    const themeToggler = () => {
        theme === THEMES.LIGHT ? setTheme(THEMES.DARK) : setTheme(THEMES.LIGHT);
    };
    return [theme, themeToggler];
};

export default useTheme;
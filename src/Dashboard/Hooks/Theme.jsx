import React, { createContext, useContext, useEffect, useState } from "react";

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

const ThemeModeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
  resetTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeProvider = ({ children }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);

    const systemThemeChangeHandler = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', systemThemeChangeHandler);

    return () => {
      mediaQuery.removeEventListener('change', systemThemeChangeHandler);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const setAndPersistTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setAndPersistTheme(theme === 'light' ? 'dark' : 'light');
  };

  const resetTheme = () => {
    localStorage.removeItem('theme');
    setTheme(window.matchMedia(DARK_MODE_QUERY).matches ? 'dark' : 'light');
  };

  console.log(theme);

  return (
    <ThemeModeContext.Provider
      value={{ theme, setTheme: setAndPersistTheme, toggleTheme, resetTheme }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;

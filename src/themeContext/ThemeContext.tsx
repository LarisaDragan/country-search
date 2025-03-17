import { useEffect, useState } from "react";
import { ThemeContext, Theme } from "./CreateContext";

const THEME_KEY = "theme"; // key for localStorage

export const ThemeProvide: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // lazy loading for the theme from localstorage - default - light
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    return (localStorage.getItem(THEME_KEY) as Theme) || "light";
  });

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem(THEME_KEY, currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: "light",
  darkMode: () => {},
  lightMode: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
     return localStorage.getItem("theme") || "light";
  });

  const darkMode = () => {
    setTheme("dark");
  };

  const lightMode = () => {
    setTheme("light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, darkMode, lightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

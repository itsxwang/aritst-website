import {  useState,useEffect } from "react";


import Home from "./Components/Home/Home";
import ThemeContext from "./contexts/themeContext";

import './index.css';



function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === null) {
      return "dark";
    }
    return storedTheme === "light" ? "light" : "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <Home />         
      </ThemeContext.Provider>
    </>
  )
}

export default App;


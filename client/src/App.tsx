import {  useState } from "react";


import Home from "./Components/Home/Home";
import ThemeContext from "./contexts/themeContext";

import './index.css';



function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
      <Home />         
      </ThemeContext.Provider>
    </>
  )
}

export default App;


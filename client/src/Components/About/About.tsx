import React, { useState } from 'react';

function About() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.getItem("theme") === "light" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: light)").matches)
      ) {
        return "light";
      }
    }
    return "dark";
  });

  return (
    <div>
      {/* Use Tailwind's dark: modifier */}
        <div
    className={`bg-white text-red-500 ${
      theme === "dark" ? "dark:text-blue-700" : ""
    }`}>
        Should change color in dark mode
      </div>
      
      <button 
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
          localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
        }}
        className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
      >
        Toggle Theme (Current: {theme})
      </button>
    </div>
  );
}

export default About;
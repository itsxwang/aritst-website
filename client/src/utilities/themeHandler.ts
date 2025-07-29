export function setTheme(theme: 'light' | 'dark') {
    document.documentElement.classList.remove(theme !== 'dark' ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", JSON.stringify(theme));
}

export function getTheme() {

    const storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } 
    else {
        return storedTheme === "dark" ? "dark" : "light";
    }

}




import { createContext, type Dispatch, type SetStateAction } from "react";

interface ThemeContextProps {
        theme: string;
        setTheme: Dispatch<SetStateAction<string>>;
    }
    
    const ThemeContext = createContext<ThemeContextProps>({
        theme: 'dark',
        setTheme: () => {},
    });

export default ThemeContext;
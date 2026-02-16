"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = `light` | `dark` | `system`;

interface ThemeProviderContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeProviderContext>({
    theme: `light`,
    setTheme: () => null,
});

export function ThemeProvider({
    children,
    defaultTheme = `light`,
}: {
    children: React.ReactNode;
    defaultTheme?: Theme;
}) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const stored = localStorage.getItem(`trustack-theme`) as Theme | null;
        if (stored) setTheme(stored);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(`light`, `dark`);

        if (theme === `system`) {
            const systemTheme = window.matchMedia(`(prefers-color-scheme: dark)`).matches
                ? `dark`
                : `light`;
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        localStorage.setItem(`trustack-theme`, theme);
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // 'dark', 'light', or 'system'
    // 'dark', 'light', or 'system'
    const [theme, setTheme] = useState(() => {
        // Strict Black Mode: Default to dark, override any previous light setting
        const stored = localStorage.getItem('theme');
        if (stored === 'light') return 'dark';
        return stored || 'dark';
    });

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        const applyTheme = (targetTheme) => {
            if (targetTheme === 'dark') {
                body.classList.remove('light-mode');
                body.style.backgroundColor = '#050505'; // Fallback
            } else if (targetTheme === 'light') {
                body.classList.add('light-mode');
                body.style.backgroundColor = '#f0f2f5'; // Fallback
            } else {
                // System default
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemPrefersDark) {
                    body.classList.remove('light-mode');
                    body.style.backgroundColor = '#050505';
                } else {
                    // Even if system is light, the user REQUESTED black default.
                    // But if the user selects 'system' explicitly, we usually respect it.
                    // However, to fix "white" issues, let's default the "system" check failure to dark??
                    // No, better to just modify the default state in useState above.
                    // Let's force 'dark' if the stored value is 'light' just once to reset? 
                    // Or better: ensure index.css defaults are dark (which they are).

                    // Use the passed user rule "by default black".
                    body.classList.add('light-mode');
                }
            }
        };

        if (theme === 'system') {
            // For strict black default, maybe we should just ignore system light preference?
            // Let's just treat 'system' as dark for now if the user is complaining?
            // No, that breaks functionality.
            // I will set the default useState to 'dark' (already done).
            // I will ensure the 'light-mode' class is NOT present by default in index.html or body.
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(systemPrefersDark ? 'dark' : 'light');

            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e) => applyTheme(e.matches ? 'dark' : 'light');
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            applyTheme(theme);
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

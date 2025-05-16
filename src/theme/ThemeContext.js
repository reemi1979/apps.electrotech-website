// src/theme/ThemeContext.js
import { createContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { getDesignTokens } from './theme';

export const ColorModeContext = createContext();

const ThemeContextProvider = ({ children }) => {
const [mode, setMode] = useState('dark');

useEffect(() => {
    const saved = localStorage.getItem('colorMode');
    if (saved) setMode(saved);
}, []);

const toggleColorMode = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('colorMode', next);
};

const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
    <ThemeProvider theme={theme}>
        <GlobalStyles 
        styles={{ 
            body: { 
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default,
            } 
        }} 
        />
        {children}
    </ThemeProvider>
    </ColorModeContext.Provider>
);
};

export default ThemeContextProvider;

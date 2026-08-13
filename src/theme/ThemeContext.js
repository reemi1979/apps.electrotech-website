// src/theme/ThemeContext.js
import { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { getDesignTokens } from './theme';

const ThemeContextProvider = ({ children }) => {
const theme = useMemo(() => createTheme(getDesignTokens('light')), []);

return (
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
);
};

export default ThemeContextProvider;

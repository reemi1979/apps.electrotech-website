// src/theme/theme.js

export const getDesignTokens = (mode) => ({
  
  palette: {
    mode,

    background: {
      default: mode === 'dark' 
        ? '#1e1e1e' // ⬛ Dark: fond global
        : '#f4f4f4', // ⬜ Light: fond global

      paper: mode === 'dark' 
        ? '#2c2c2c' // ⬛ Dark: cards/dialogs
        : '#ffffff', // ⬜ Light: cards/dialogs

      white: mode === 'dark' 
        ? '#ffffff' // ⬜ Light: 
        : '#ffffff', // ⬜ Light: 
    },

    //Requis pour @MUI
    primary: {
      main: '#005A9E',       // 🔵 Bleu electrotech
      contrastText: '#ffffff'// ⚪ Texte sur fond bleu
    },

    //Requis pour @MUI
    secondary: {
      main: mode === 'dark' 
        ? '#BCBF2C'        // 🟨 Jaune Electrotech
        : '#005A9E',        // 🔵 Jaune Electrotech
    },

    divider: mode === 'dark' 
      ? '#444444' // ⚫ Gris foncé pour séparation
      : '#cccccc', // ⚪ Gris clair pour séparation

    text: {
      primary: mode === 'dark' 
        ? '#FFFFFF' // ⚪ Dark: texte normal
        : '#000000', // ⚫ Light: texte normal
      secondary: mode === 'dark' 
      ? '#BCBF2C'        // 🟨 Jaune Electrotech
      : '#005A9E',        // 🔵 Jaune Electrotech
    },

    custom: {
      electrotechBlue: mode === 'dark' 
        ? '#5B9BD5' // 🔵 Bleu electrotech + Pale proche gris
        : '#005A9E', // 🔵 Bleu electrotech
      electrotechYellow:  mode === 'dark'
        ? '#BCBF2C' // 🟨 Jaune Electrotech
        : '#BCBF2C', // 🟨 Jaune Electrotech
    },

  },

  typography: {
    fontFamily: '"Eurostile", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif'
  },

  shape: {
    borderRadius: 6
  }
});

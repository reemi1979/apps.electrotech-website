// src/theme/theme.js

export const getDesignTokens = (mode) => ({
  
  palette: {
    mode,

    background: {
      default: mode === 'dark' 
        ? '#1e1e1e' // ⬛ Dark: fond global
        : '#dedede', // ⬜ Light: fond global

      paper: mode === 'dark' 
        ? '#2c2c2c' // ⬛ Dark: cards/dialogs
        : '#ebebeb', // ⬜ Light: cards/dialogs

      light: mode === 'dark' 
        ? '#dedede' // ⬜ Light: 
        : '#dedede', // ⬜ Light: 

      white: mode === 'dark' 
        ? '#ffffff' // ⬜ Light: 
        : '#ffffff', // ⬜ Light: 

      contrast: mode === 'dark' 
        ? '#dedede' // ⬜ Light: 
        : '#2c2c2c', // ⬛ Light: 

      black: mode === 'dark' 
        ? '#1c1c1c' // ⬛ Light: 
        : '#1c1c1c', // ⬛ Light: 
    },

    //Requis pour @MUI
    primary: {
      main: '#005A9E',          // 🔵 Dark: Bleu electrotech (Boutons, @Mui components)
      contrastText: '#dedede'   // ⚪ Light: Texte sur fond bleu (Boutons, @Mui components)
    },

    //Requis pour @MUI
    secondary: {
      main: mode === 'dark' 
        ? '#444444'             // ⚫ Dark: Gris foncé (Boutons, @Mui components)
        : '#005A9E',            // 🔵 Light: Bleu Electrotech (Boutons, @Mui components)
    },

    divider: mode === 'dark' 
      ? '#444444'               // ⚫ Dark: Gris foncé pour séparation
      : '#a8a8a8',              // ⚪ Light: Gris clair pour séparation

    text: {
      primary: mode === 'dark' 
        ? '#dedede'             // ⚪ Dark: white text // SMALL TEXT, PARAGRAPH
        : '#000000',            // ⚫ Light: black text // SMALL TEXT, PARAGRAPH
      secondary: mode === 'dark' 
        ? '#BCBF2C'             // 🟨 Dark: yellow text // TITLE
        : '#005A9E',            // 🔵 Light: blue text // TITLE
      blue: mode === 'dark' 
        ? '#005A9E'             // 🔵 Dark: always blue text // SUB-TITLE
        : '#005A9E',            // 🔵 Light: always blue text // SUB-TITLE
      white: mode === 'dark' 
        ? '#dedede'             // ⚪ Dark: always white text // SUB-TITLE
        : '#dedede',            // ⚪ Light: always white text // SUB-TITLE
      black: mode === 'dark' 
        ? '#1c1c1c'              // ⚫ Dark: always black text // SUB-TITLE
        : '#1c1c1c' ,            // ⚫ Light: always black text // SUB-TITLE
      yellow: mode === 'dark' 
        ? '#BCBF2C'              // 🟨 Dark: always yellow text // SUB-TITLE
        : '#BCBF2C' ,            // 🟨 Light: always yellow text // SUB-TITLE
    },

    custom: {
      electrotechBlue: mode === 'dark' 
        ? '#005A9E' // 🔵 Dark: divers, toujours bleu. 
        : '#005A9E', // 🔵 Light: divers, toujours bleu.  
      electrotechYellow:  mode === 'dark'
        ? '#BCBF2C' // 🟨 Dark: divers, toujours jaune
        : '#BCBF2C', // 🟨 Light: divers, toujours jaune
    },

  },

  typography: {
    fontFamily: '"Eurostile", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: mode === 'dark' 
        ? '#FFFFFF'             // ⚪ Dark: white text // SMALL TEXT, PARAGRAPH
        : '#000000',            // ⚫ Light: black text // SMALL TEXT, PARAGRAPH
    },
  },

  shape: {
    borderRadius: 6
  }
});

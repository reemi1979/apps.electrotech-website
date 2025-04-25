// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark', // Mode sombre pour un fond foncé par défaut

    background: {
      default: '#1e1e1e',   // 🟫 Fond global du site (body)
      paper: '#2c2c2c'      // 🟦 Fond des composants MUI type Card, Dialog, etc.
    },

    primary: {
      main: '#0D4F8B',       // 🟦 Bleu principal : utilisé pour les boutons, liens, éléments actifs
      dark: '#005A9E',       // 🔵 Bleu foncé pour hover ou variantes plus sombres
      contrastText: '#ffffff'// ⚪ Texte dans les boutons primaires (blanc sur fond bleu)
    },

    secondary: {
      main: '#BCBF2C'        // 🟨 Jaune accent : peut servir à mettre en valeur un bouton secondaire ou icône
    },

    text: {
      primary: '#FFFFFF',     // ⚪ Texte principal sur fond foncé
      secondary: '#BCBF2C',   // 🟫 Texte secondaire, sous-titres, détails
      dark: '#005A9E',        // 🔵 Bleu foncé pour hover ou variantes plus sombres
    }
  },

  typography: {
    fontFamily: '"Eurostile", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif' // Typo professionnelle Windows-style
  },

  shape: {
    borderRadius: 6 // Coins arrondis pour les boutons, inputs, etc.
  }
});

export default theme;

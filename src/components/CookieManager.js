// src/components/CookieManager.js

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


//POUR UTILISER AILLEURS
// import { getCookiePrefs } from './components/CookieManager';

// const cookies = getCookiePrefs();
// if (cookies.analytics) {
//   // Init Matomo ou GA
// }


const defaultPrefs = {
  necessary: true,
  functional: false,
  analytics: false,
  advertising: false,
};

export const getCookiePrefs = () => {
  const prefs = localStorage.getItem('cookiePreferences');
  return prefs ? JSON.parse(prefs) : { ...defaultPrefs };
};

const CookieManager = () => {
  const [visible, setVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [prefs, setPrefs] = useState(defaultPrefs);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences');
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const handleSave = (values) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(values));
    setPrefs(values);
    setVisible(false);
    setDialogOpen(false);
  };

  const handleAcceptAll = () => {
    handleSave({ ...defaultPrefs, functional: true, analytics: true, advertising: true });
  };

  const handleDeclineAll = () => {
    handleSave({ ...defaultPrefs }); // Only "necessary" remains true
  };

  return (
    <>
      {visible && (
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: '#2c2c2c',
          color: 'white',
          p: 2,
          zIndex: 1300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
        }}>
          <Typography variant="body2" textAlign="center">
            Ce site utilise des cookies pour améliorer votre expérience. Cliquez sur « Accepter tout » pour autoriser tous les cookies, ou « Personnaliser » pour choisir vos préférences.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" color="primary" onClick={handleAcceptAll}>Accepter tout</Button>
            <Button variant="outlined" color="inherit" onClick={handleDeclineAll}>Refuser tout</Button>
            <Button variant="outlined" color="inherit" onClick={() => setDialogOpen(true)}>Personnaliser</Button>
          </Box>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullScreen={fullScreen}>
        <DialogTitle>Personnaliser les préférences de cookies</DialogTitle>
        <DialogContent>
          <FormControlLabel control={<Checkbox checked disabled />} label="Nécessaire (Toujours actif)" />
          <FormControlLabel control={<Checkbox checked={prefs.functional} onChange={(e) => setPrefs(prev => ({ ...prev, functional: e.target.checked }))} />} label="Fonctionnelle" />
          <FormControlLabel control={<Checkbox checked={prefs.analytics} onChange={(e) => setPrefs(prev => ({ ...prev, analytics: e.target.checked }))} />} label="Analytique" />
          <FormControlLabel control={<Checkbox checked={prefs.advertising} onChange={(e) => setPrefs(prev => ({ ...prev, advertising: e.target.checked }))} />} label="Publicité" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="inherit">Annuler</Button>
          <Button onClick={() => handleSave(prefs)} color="primary" variant="contained">Sauvegarder</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CookieManager;
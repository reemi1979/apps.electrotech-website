// src/components/ThemeToggleButton.js

import React, { useContext } from 'react';
import { IconButton, Tooltip, ListItemText, ListItemButton } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { ColorModeContext } from '../theme/ThemeContext';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const ThemeToggleButton = ({ variant = 'icon', onClick }) => {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();
    const { t } = useTranslation();
  
    const handleClick = () => {
      toggleColorMode();
      if (onClick) onClick();
    };
  
    // Choisir texte traduit selon mode
    const text = mode === 'dark' ? t('theme_toggle_light') : t('theme_toggle_dark');
    const icon = mode === 'dark' ? <Brightness7 /> : <Brightness4 />;
  
    if (variant === 'text') {
        return (
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={text} />
                {icon}
            </ListItemButton>
        );
    }
       
    return (
      <Tooltip title={text}>
        <IconButton
          onClick={handleClick}
          sx={{
            color: mode === 'dark' ? 'white' : 'black',
            '&:hover': { color: theme.palette.custom.electrotechYellow },
          }}
          size="large"
        >
          {icon}
        </IconButton>
      </Tooltip>
    );
  };
  
  export default ThemeToggleButton;


// src/components/ThemeToggleButton.js

import { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { ColorModeContext } from '../theme/ThemeContext';

const ThemeToggleButton = ({ variant = 'icon', onClick }) => {
    const { mode, toggleColorMode } = useContext(ColorModeContext);
    const theme = useTheme();
    const { t } = useTranslation();
  
    const handleClick = () => {
      toggleColorMode();
      if (onClick) onClick();
    };
  
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


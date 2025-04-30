import React, { useContext } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';
import { ColorModeContext } from '../theme/ThemeContext';
import { useTheme } from '@mui/material/styles';

const ThemeToggleButton = () => {
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();

  const iconColor = mode === 'dark' ? 'white' : 'black';

  return (
    <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
      <IconButton
        onClick={toggleColorMode}
        sx={{
          color: iconColor,
          '&:hover': {
            color: theme.palette.custom.electrotechYellow
          }
        }}
        size="large"
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;


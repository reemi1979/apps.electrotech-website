import React from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ScrollToIdButton = ({ targetId = 'section2' }) => {
  const scrollToTarget = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Zoom in>
      <Fab
        color="primary"
        onClick={scrollToTarget}
        size="medium"
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#0078D4',
          color: 'white',
          '&:hover': { backgroundColor: '#005A9E' },
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <KeyboardArrowDownIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToIdButton;

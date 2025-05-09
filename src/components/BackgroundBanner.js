// src/components/BackgroundBanner.js

import React from 'react';
import { Box } from '@mui/material';

const BackgroundBanner = ({ image, height = 200, top = 0, overlayColor = 'rgba(0, 0, 0, 0.6)' }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: height,
        position: 'absolute', // absolute inside relative parent
        top: top,
        left: 0,
        zIndex: -1,
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${process.env.PUBLIC_URL}/${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay fade */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          background: overlayColor, // example: 'rgba(0,0,0,0.4)'
        }}
      />
    </Box>
  );
};

export default BackgroundBanner;

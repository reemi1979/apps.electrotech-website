//src/components/LoadingScreen.js

import Box from '@mui/material/Box';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        component="img"
        src="/logos/electron.svg"
        alt="Loading Logo"
        sx={{ width: 200, height: 200 }}
      />
    </Box>
  );
};

export default LoadingScreen;

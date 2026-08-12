import Box from '@mui/material/Box';

const Home = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: 2,
    }}
  >
    <Box
      component="img"
      src="/logos/logo.svg"
      alt="Électrotech Logo"
      sx={{ width: { xs: '100%', md: 800 }, height: 'auto', maxWidth: '100%' }}
    />
  </Box>
);

export default Home;

// src/pages/Homes.js

// import React from 'react';
// import HeroVideo from '../components/HeroVideo';
// import { Box, Typography } from '@mui/material';

// const Home = () => {
//   return (
//     <Box sx={{ position: 'relative', zIndex: 0, minHeight: '100vh' }}>
//       <HeroVideo />

//       <Box sx={{ position: 'relative', zIndex: 1, pt: 10, px: 2 }}>
//         <Typography variant="h3" sx={{ mb: 3 }}>
//           Bienvenue chez Électrotech
//         </Typography>
//         <Typography variant="body1" paragraph>
//           Ceci est du contenu test avec fond vidéo et footer visible.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Home;



import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <>
      {/* SECTION HERO */}
      <Box sx={{ position: 'relative', zIndex: 0, height: '100vh' }}>
        <HeroVideo />

        {/* TEXTE CENTRÉ EN BAS */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 1,
            px: 2,
          }}
        >

        </Box>
      </Box>

      {/* SECTION CONTENU APRÈS LE HERO */}
      <Box sx={{ position: 'relative', zIndex: 1, px: 2, py: 10 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Bienvenue chez Électrotech
          </Typography>
          <Typography variant="body1">
            Ceci est du contenu test avec fond vidéo et footer visible.
          </Typography>
          <Typography variant="body1">
            Contenu principal après le Hero.
          </Typography>
      </Box>
    </>
  );
};

export default Home;

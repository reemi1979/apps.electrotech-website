// src/components/InViewPhotoCard.js

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';

const MotionBox = motion.create(Box); // ✅ Nouvelle syntaxe

const InViewPhotoCard = ({ photo, onClick }) => {

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <MotionBox
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      sx={{
        position: 'relative',
        height: { xs: 250, sm: 300 }, // hauteur responsive
        width: '100%', // 🔥 pleine largeur en mobile
        maxWidth: 400, // 💡 limite max (centre sur écran large)
        mx: 'auto', // centre horizontalement
        borderRadius: 3,
        overflow: 'hidden',
        cursor: 'pointer',
      }}
    >

      <Box
        component="img"
        src={photo.src}
        alt={photo.title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          color: 'white',
          textShadow: '0 0 10px rgba(0,0,0,0.7)',
        }}
      >
        <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>
          {photo.category}
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {photo.title}
        </Typography>
      </Box>
    </MotionBox>
  );
};

export default InViewPhotoCard;

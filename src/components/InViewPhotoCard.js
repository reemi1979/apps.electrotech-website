// src/components/InViewPhotoCard.js

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion.create(Box); // ✅ Nouvelle syntaxe

const InViewPhotoCard = ({ photo, onClick }) => {

const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
const theme = useTheme();

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
    
    {/* ✅ dégradé style Netflix */}
    <Box
        sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        zIndex: 1,
        }}
    />

    {/* texte */}
    <Box
        sx={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        zIndex: 2,
        }}
    >
        <Typography
        variant="caption"
        fontWeight="bold"
        sx={{
            color: theme.palette.text.white, // ✅ assure blanc
            textTransform: 'uppercase',
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
        }}
        >
        {photo.category}
        </Typography>
        <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
            color: theme.palette.text.white, // ✅ assure blanc
            textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
        }}
        >
        {photo.title}
        </Typography>
    </Box>
    </MotionBox>
);
};

export default InViewPhotoCard;

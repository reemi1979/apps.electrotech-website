// src/components/PhotoGalleryWithLabels.js

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard';
import { useTheme } from '@mui/material/styles';


const MotionBox = motion.create(Box);

const PhotoGalleryWithLabels = ({ photos }) => {
    const [selected, setSelected] = useState(null);
    const theme = useTheme();

    const isDark = theme.palette.mode === 'dark';
    const textShadow = isDark ? '1px 1px 4px rgba(0,0,0,0.8)' : '1px 1px 4px rgba(255,255,255,0.8)';

    return (
        <>
            
        <Grid container spacing={2} sx={{ px: 2, py: 4, justifyContent: 'center', maxWidth: 1400, margin: '0 auto' }}>
            {photos.map((photo, index) => (
            <Grid item size={{ xs:12, sm:6 ,md:4 }}  key={index}>
                <InViewPhotoCard photo={photo} onClick={() => setSelected(photo)} />
            </Grid>
            ))}
        </Grid>

        <AnimatePresence>
            {selected && (
            <Modal
                open={Boolean(selected)}
                onClose={() => setSelected(null)}
                closeAfterTransition
                disableScrollLock
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }, // stays dark for modal background
                },
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        outline: 'none',
                        width: '90vw',
                        maxWidth: 700,
                    }}
                >
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                            position: 'relative',
                            borderRadius: 3,
                            overflow: 'hidden',
                            bgcolor: theme.palette.background.default,
                            color: theme.palette.text.primary,
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '90vh',
                        }}
                        >
                        {/* Image */}
                        <Box
                            component="img"
                            src={selected.src}
                            alt={selected.title}
                            sx={{
                            width: '100%',
                            maxHeight: '70vh',
                            objectFit: 'contain',
                            }}
                        />

                        {/* Text below image */}
                        <Box
                            sx={{
                            p: 3,
                            overflowY: 'auto',
                            }}
                        >
                            <Typography
                            variant="caption"
                            sx={{
                                textTransform: 'uppercase',
                                color: theme.palette.text.primary,
                                textShadow,
                            }}
                            >
                            {selected.category}
                            </Typography>
                            <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{
                                mb: 1,
                                color: theme.palette.text.primary,
                                textShadow,
                            }}
                            >
                            {selected.title}
                            </Typography>
                            <Typography
                            variant="body1"
                            sx={{
                                color: theme.palette.text.primary,
                                textShadow,
                            }}
                            >
                            {selected.description}
                            </Typography>
                        </Box>
                    </MotionBox>
                </Box>
            </Modal>
            )}
        </AnimatePresence>
        </>
    );
};

export default PhotoGalleryWithLabels;

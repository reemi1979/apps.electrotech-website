// src/pages/components/PhotoGallerySlideShow.js

import { useState, useEffect, useRef } from 'react';
import { Box, Modal, Backdrop, Fab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const PhotoGallerySlideShow = ({
    basePath,
    typeFolderMap,
    selectedType,
    slidesPerView = 1,
    }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const [paused, setPaused] = useState(false);
    const pauseTimeoutRef = useRef(null);

    const theme = useTheme();

    const genPhotos = (folder, count) =>
        Array.from({ length: count }, (_, i) => ({
        src: `${process.env.PUBLIC_URL}/${basePath}/${folder}/${String.fromCharCode(
            97 + i
        )}.jpg`,
        }));

    const folder = typeFolderMap[selectedType];
    const photoCount = typeFolderMap.counts?.[selectedType] || 3;
    const photos = folder ? genPhotos(folder, photoCount) : [];

    useEffect(() => {
        if (!paused) {
        const interval = setInterval(() => {
            setIndex((prev) =>
            direction === 'right'
                ? (prev + 1) % photos.length
                : (prev - 1 + photos.length) % photos.length
            );
        }, 2000);
        return () => clearInterval(interval);
        }
    }, [direction, paused, photos.length]);

    const handlePause = () => {
        setPaused(true);
        if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
        pauseTimeoutRef.current = setTimeout(() => {
        setPaused(false);
        }, 2000);
    };

    const handleLeftClick = () => {
        setDirection('right');
        setIndex((prev) => (prev - 1 + photos.length) % photos.length);
        handlePause();
    };

    const handleRightClick = () => {
        setDirection('right');
        setIndex((prev) => (prev + 1) % photos.length);
        handlePause();
    };

    return (
        <>
        <Box
            sx={{
            width: '100%',
            maxWidth: 800,
            overflow: 'hidden',
            borderRadius: 4,
            mx: 'auto',
            position: 'relative',
            }}
        >
            <Box
            sx={{
                display: 'flex',
                width: `${(photos.length * 100) / slidesPerView}%`,
                transform: `translateX(-${(index * 100) / photos.length}%)`,
                transition: 'transform 1s ease',
            }}
            >
            {photos.map((photo, i) => (
                <Box
                key={i}
                sx={{
                    flex: `0 0 ${100 / photos.length}%`,
                    p: 1,
                }}
                >
                <InViewPhotoCard
                    photo={photo}
                    onClick={() => setSelectedPhoto(photo)}
                />
                </Box>
            ))}
            </Box>

            <Fab
            color="primary"
            size="medium"
            onClick={handleLeftClick}
            sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                zIndex: 10,
                boxShadow: theme.shadows[4],
            }}
            >
            <KeyboardArrowLeftIcon />
            </Fab>

            <Fab
            color="primary"
            size="medium"
            onClick={handleRightClick}
            sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                zIndex: 10,
                boxShadow: theme.shadows[4],
            }}
            >
            <KeyboardArrowRightIcon />
            </Fab>
        </Box>

        <AnimatePresence>
            {selectedPhoto && (
            <Modal
                open={Boolean(selectedPhoto)}
                onClose={() => setSelectedPhoto(null)}
                closeAfterTransition
                disableScrollLock
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                    sx: { backgroundColor: theme.palette.background.default === '#1e1e1e' 
                        ? 'rgba(0,0,0,0.8)' 
                        : 'rgba(0,0,0,0.8)' },
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
                }}
                >
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                    width: '90vw',
                    maxWidth: 700,
                    bgcolor: theme.palette.background.default,
                    borderRadius: 3,
                    overflow: 'hidden',
                    color: theme.palette.text.primary,
                    }}
                >
                    <Box component="img" src={selectedPhoto.src} sx={{ width: '100%' }} />
                </MotionBox>
                </Box>
            </Modal>
            )}
        </AnimatePresence>
        </>
    );
};

export default PhotoGallerySlideShow;

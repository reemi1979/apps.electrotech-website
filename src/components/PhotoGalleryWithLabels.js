// src/components/PhotoGalleryWithLabels.js

import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard'; // 👈 adapte si chemin différent
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const PhotoGalleryWithLabels = ({ photos }) => {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, py: 4, justifyContent: 'center', maxWidth: 1400, margin: '0 auto' }}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
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
                  bgcolor: theme.palette.background.default ?? '#111',
                  color: theme.palette.text.white ?? 'white',
                }}
              >
                {/* Image */}
                <Box
                  component="img"
                  src={selected.src}
                  alt={selected.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />

                {/* Dégradé overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  }}
                />

                {/* Texte */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    right: 16,
                    zIndex: 1,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: 'uppercase',
                      color: 'white',
                      textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {selected.category}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      mb: 1,
                      color: 'white',
                      textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {selected.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      textShadow: '1px 1px 4px rgba(0,0,0,0.8)',
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

import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard';
import { useTranslation } from 'react-i18next';

const MotionBox = motion(Box);

const ProductsControlPanelsPhotos = ({ selectedType }) => {
  const { t } = useTranslation('products');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const genPhotos = (folder, count) =>
    Array.from({ length: count }, (_, i) => ({
      src: `${process.env.PUBLIC_URL}/photos/products/controlpanels/${folder}/${String.fromCharCode(97 + i)}.jpg`
    }));

  const photoMap = {
    standard: genPhotos('standard', 11), // génère a.jpg à h.jpg
    custom: genPhotos('custom', 11), // exemple : 3 photos (a, b, c)
    serie: genPhotos('serie', 12),
    pushbuttons: genPhotos('pushbuttons', 12),
    junctionbox: genPhotos('junctionbox', 5),
  };

  const photos = photoMap[selectedType] || [];

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, py: 4, justifyContent: 'center' }}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <InViewPhotoCard photo={photo} onClick={() => setSelectedPhoto(photo)} />
          </Grid>
        ))}
      </Grid>

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
                  bgcolor: '#111',
                  borderRadius: 3,
                  overflow: 'hidden',
                  color: 'white',
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

export default ProductsControlPanelsPhotos;

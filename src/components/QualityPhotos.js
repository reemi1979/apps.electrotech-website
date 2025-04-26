// src/components/QualityPhotos.js

import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard';
import { useTranslation } from 'react-i18next';


const MotionBox = motion(Box);

const QualityPhotos = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation('quality');

  const photos = [
    {
      src: process.env.PUBLIC_URL + '/photos/quality/a.jpg',
      title: t('quality_photos_1_title'),
      category: t('quality_photos_1_category'),
      description: t('quality_photos_1_description'),
    },
    {
      src: process.env.PUBLIC_URL + '/photos/quality/b.jpg',
      title: t('quality_photos_2_title'),
      category: t('quality_photos_2_category'),
      description: t('quality_photos_2_description'),
    },
    {
      src: process.env.PUBLIC_URL + '/photos/quality/c.png',
      title: t('quality_photos_3_title'),
      category: t('quality_photos_3_category'),
      description: t('quality_photos_3_description')
    },
  ];
  

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, py: 4, justifyContent: 'center' }}>
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
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
              <Box component="img" src={selected.src} alt={selected.title} sx={{ width: '100%' }} />
              <Box sx={{ p: 3 }}>
                <Typography variant="caption" sx={{ textTransform: 'uppercase' }}>
                  {selected.category}
                </Typography>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                  {selected.title}
                </Typography>
                <Typography variant="body1">{selected.description}</Typography>
              </Box>
            </MotionBox>
          </Box>
        </Modal>
        
        )}
      </AnimatePresence>
    </>
  );
};

export default QualityPhotos;

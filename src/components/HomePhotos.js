// src/components/HomePhotos.js

import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InViewPhotoCard from './InViewPhotoCard';
import { useTranslation } from 'react-i18next';



const MotionBox = motion(Box);

const HomePhotos = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  const photos = [
    {
      src: process.env.PUBLIC_URL + '/photos/home/a.jpg',
      title: t('home_photos_1_title'),
      category: t('home_photos_1_category'),
      description: t('home_photos_1_description')
    },
    {
      src: process.env.PUBLIC_URL + '/photos/home/c.jpg',
      title: t('home_photos_2_title'),
      category: t('home_photos_2_category'),
      description: t('home_photos_2_description')
    },
    {
      src: process.env.PUBLIC_URL + '/photos/home/d.jpg',
      title: t('home_photos_3_title'),
      category: t('home_photos_3_category'),
      description: t('home_photos_3_description')
    },
    {
      src: process.env.PUBLIC_URL + '/photos/home/b.jpg',
      title: t('home_photos_4_title'),
      category: t('home_photos_4_category'),
      description: t('home_photos_4_description')
    },
    {
      src: process.env.PUBLIC_URL + '/photos/home/e.jpg',
      title: t('home_photos_5_title'),
      category: t('home_photos_5_category'),
      description: t('home_photos_5_description')
    }
  ];
  

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, py: 4, justifyContent: 'center',maxWidth: 1400, margin: '0 auto' }}>
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
                <Typography variant="h6">{selected.description}</Typography>
              </Box>
            </MotionBox>
          </Box>
        </Modal>
        
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePhotos;

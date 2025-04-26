// src/pages/News.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const News = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
  const [newsData, setNewsData] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/news/news.json')
      .then((res) => res.json())
      .then((data) => setNewsData(data.filter(item => item.activate)))
      .catch((err) => console.error('Error loading news:', err));
  }, []);

  const sortedNews = [...newsData].sort((a, b) => {
    if (a.sorting !== b.sorting) return a.sorting - b.sorting;
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
      <Box
        component="img"
        src={process.env.PUBLIC_URL + '/news/news.png'}
        alt="Actualités"
        sx={{ width: 120, mb: 4 }}
      />

      {sortedNews.map((item) => (
        <Box key={item.id} sx={{ mb: 8 }}> {/* No dark box */}
          <Typography variant="h3" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
            {item[i18n.language]?.title || item.en.title}
          </Typography>
          <Box
            component="img"
            src={process.env.PUBLIC_URL + `/news/${item.id}.jpg`}
            alt={item[i18n.language]?.title || item.en.title}
            onClick={() => setSelected(item)}
            sx={{
              width: 400,
              height: 400,
              objectFit: 'cover',
              borderRadius: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' }
            }}
          />
            <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
            {item[i18n.language]?.description || item.en.description}
          </Typography>
        </Box>
      ))}

      {/* MODAL */}
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
                sx: { backgroundColor: 'rgba(0,0,0,0.8)' },
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
                  textAlign: 'center',
                  p: 4,
                }}
              >
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + `/news/${selected.id}.jpg`}
                  alt={selected[i18n.language]?.title || selected.en.title}
                  sx={{ width: '100%', height: 'auto', mb: 3 }}
                />
                <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                  {selected[i18n.language]?.title || selected.en.title}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: theme.palette.text.dark }}>
                  {selected.author} - {selected.date}
                </Typography>
              </MotionBox>
            </Box>
          </Modal>
        )}
      </AnimatePresence>

    </Container>
  );
};

export default News;

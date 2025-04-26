// src/pages/NewsList.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const NewsList = () => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [newsList, setNewsList] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/news/news.json')
      .then(res => res.json())
      .then(data => {
        const activeNews = data
          .filter(n => n.activate)
          .sort((a, b) => (b.sorting - a.sorting) || new Date(b.date) - new Date(a.date));
        setNewsList(activeNews);
      });
  }, []);

  return (
    <Container sx={{ py: 8, maxWidth: '800px', mx: 'auto' }}>
  <Typography variant="h3" sx={{ mb: 6, textAlign: 'center', color: theme.palette.text.secondary }}>
    {t('actualités')}
  </Typography>

  <Grid container spacing={3} justifyContent="center">
    {newsList.map((news) => {
      const locale = i18n.language.startsWith('fr') ? 'fr' : 'en';
      const content = news[locale];
      const slug = slugify(content.title);

      return (
        <Grid item xs={12} sm={6} md={6} sx={{ flexBasis: 400, flexGrow: 1, display: 'flex' }} key={news.id}>
          <Box
            component={Link}
            to={`/${slug}`}
            sx={{
              width: '100%',
              maxWidth: 500,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              minHeight: 140,
              p: 2,
              borderRadius: 2,
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: '#1e1e1e',
              transition: 'background-color 0.3s',
              '&:hover': { backgroundColor: '#2c2c2c' }
            }}
          >
            <Box
              component="img"
              src={process.env.PUBLIC_URL + `/news/img/${news.id}.png`}
              alt={content.title}
              sx={{
                width: 120,
                height: 120,
                minWidth: 120,
                borderRadius: 2,
                objectFit: 'cover',
                mr: 2,
              }}
            />
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.dark }}>
                {new Date(news.date).toLocaleDateString()}
              </Typography>
              <Typography variant="h5" noWrap sx={{ color: theme.palette.text.secondary, mt: 1 }}>
              {content.title}
              </Typography>
              <Typography variant="body2" noWrap sx={{ mt: 1, color: theme.palette.text.primary }}>
                {content.resume}
              </Typography>
            </Box>
            <ArrowForwardIosIcon sx={{ ml: 2, color: theme.palette.text.secondary }} />
          </Box>
        </Grid>
      );
    })}
  </Grid>

  <Box sx={{ textAlign: 'center', mt: 8 }}>
    <Box
      component="img"
      src={process.env.PUBLIC_URL + '/news/news.png'}
      alt="Actualités logo"
      sx={{ width: 120, height: 'auto', opacity: 0.6 }}
    />
  </Box>
</Container>

  );
};

export default NewsList;

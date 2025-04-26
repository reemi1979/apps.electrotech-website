// src/pages/NewsDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NewsDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const slugify = (text) =>
    text
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

      useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/news/news.json')
          .then((res) => res.json())
          .then((data) => {
            const found = data.find((item) => {
              const slugFr = slugify(item.fr?.title || '');
              const slugEn = slugify(item.en?.title || '');
              return slug === slugFr || slug === slugEn;
            });
            setNews(found);
            setLoading(false);
          });
      }, [slug]);
      

  if (loading) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!news) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
          {t('news_not_found')}
        </Typography>
      </Container>
    );
  }

  const title = news[i18n.language]?.title || '';
  const description = news[i18n.language]?.description || '';

  return (
    <Container sx={{ py: 8, textAlign: 'center', color: 'white' }}>
      <Box sx={{ textAlign: 'left', mb: 4 }}>
        <Typography
          component="button"
          onClick={() => navigate(-1)}
          sx={{
            background: 'none',
            border: 'none',
            color: theme.palette.primary.contrastText,
            cursor: 'pointer',
            fontSize: '2rem',
            textDecoration: 'underline',
            '&:hover': { textDecoration: 'none' }
          }}
        >
          ← {t('actualités_retour')}
        </Typography>
      </Box>

      <Typography variant="h2" gutterBottom sx={{ color: theme.palette.text.secondary }}>
        {title}
      </Typography>

      {news.type === 'video' ? (
        <Box
          component="video"
          src={process.env.PUBLIC_URL + `/news/vid/${news.id}.mp4`}
          controls
          autoPlay
          muted
          loop
          sx={{
            width: '100%',
            maxWidth: 900,
            height: 'auto',
            borderRadius: 2,
            my: 4,
          }}
        />
      ) : (
        <Box
          component="img"
          src={process.env.PUBLIC_URL + `/news/img/${news.id}.png`}
          alt={title}
          sx={{
            width: '100%',
            maxWidth: 900,
            height: 'auto',
            borderRadius: 2,
            my: 4,
          }}
        />
      )}

      <Typography 
        variant="body1" 
        sx={{ maxWidth: 900, mx: 'auto', textAlign: 'left', whiteSpace: 'pre-line' }}
      >
        {description}
      </Typography>
    </Container>
  );
};

export default NewsDetail;
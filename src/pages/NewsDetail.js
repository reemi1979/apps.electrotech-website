// src/pages/NewsDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const slugify = (text) =>
    text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const NewsDetail = () => {

    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

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
            <Typography variant="h4" sx={{ color: theme.palette.custom.electrotechYellow }}>
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
            <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
            sx={{ fontSize: '1rem' }}
            >
            ← {t('news_back_button')}
            </Button>
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
            src={process.env.PUBLIC_URL + `/news/img/${news.id}.jpg`}
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
            sx={{ maxWidth: 900, mx: 'auto', textAlign: 'left', whiteSpace: 'pre-line', color: theme.palette.text.primary}}
            dangerouslySetInnerHTML={{ __html: description }}
        >
        </Typography>
        </Container>
    );
};

export default NewsDetail;
// src/pages/News/NewsList.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';

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
    const [visibleNews, setVisibleNews] = useState(12);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/news/news.json')
        .then(res => res.json())
        .then(data => {
            const activeNews = data
                .filter(n => n.activate && n.detected_as_job !== true) // ➔ ignorer les jobs
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            setNewsList(activeNews);
        });
    }, []);
    
        

    return (

        <Container sx={{ py: 8, maxWidth: '800px', mx: 'auto' }}>

            <Typography variant="h3" sx={{ textAlign: 'center', color: theme.palette.text.secondary, mt: 6 }}>
                {t('news_title')}
            </Typography>
            <Typography variant="h5" sx={{ textAlign: 'center', color: theme.palette.text.primary, mb: 0 }}>
            {t('news_title_sub')}
            </Typography>


            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <a
                href="https://www.facebook.com/ElectrotechAutomatisationIndustrielle"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'color 0.3s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#1877F2')}
                onMouseOut={e => (e.currentTarget.style.color = 'inherit')}
            >
                <img
                src={process.env.PUBLIC_URL + "/logos/facebook.svg"}
                alt="Facebook"
                style={{ width: 36, height: 36, marginRight: 10 }}
                />
                <Typography variant="h5" fontWeight="bold">
                {t('facebook_follow_us')}
                </Typography>
            </a>
            </Box>


            <br /> <br />

            <Grid container spacing={3} justifyContent="center">
                {newsList.slice(0, visibleNews).map((news) => {
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
                            backgroundColor: alpha(theme.palette.background.paper, 0.4),
                            transition: 'background-color 0.3s',
                            '&:hover': { backgroundColor: theme.palette.background.paper }
                            }}
                        >
                            <Box
                            component="img"
                            src={process.env.PUBLIC_URL + `/news/img/${news.id}.jpg`}
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
                            <Typography variant="caption" sx={{ color: theme.palette.text.blue }}>
                                {new Date(news.date).toLocaleDateString()}
                            </Typography>
                            <Typography variant="h5" noWrap sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                            {content.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    mt: 1,
                                    color: theme.palette.text.primary,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                                >
                                {content.resume}
                            </Typography>
                            </Box>
                            <ArrowForwardIosIcon sx={{ ml: 2, color: theme.palette.custom.electrotechYellow }} />
                        </Box>
                        </Grid>
                    );
                    })
                }
            </Grid>
                
            {visibleNews < newsList.length && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setVisibleNews(prev => prev + 12)}
                    >
                    {t('load_more')}
                    
                    </Button>
                </Box>
            )}

            <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center', mt: 6, color: theme.palette.text.secondary }}>
                {t('news_ai')}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic', textAlign: 'center', mb: 0, color: theme.palette.text.secondary }}>
                {t('news_ai_note')}
            </Typography>

    </Container>

    );
    };

    export default NewsList;

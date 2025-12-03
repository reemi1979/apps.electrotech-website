// src/pages/News/NewsDetail.js

import { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';               // 🆕
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

/* -------------------------------------------------- */
/* util                                              */
/* -------------------------------------------------- */
const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/* -------------------------------------------------- */
/* component                                         */
/* -------------------------------------------------- */
export default function NewsDetail() {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLegacySlug = slug?.match(/\.(asp|html|php)$/i);

  /* ---- load JSON -------------------------------------------------------- */
  useEffect(() => {
    if (isLegacySlug) return;

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
  }, [slug, isLegacySlug]);

  /* ---- early returns ---------------------------------------------------- */
  if (isLegacySlug) return <Navigate to="/" replace />;
  if (loading)
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  if (!news)
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ color: theme.palette.text.secondary }}>
          {t('news_not_found')}
        </Typography>
      </Container>
    );

  /* ---- derived fields --------------------------------------------------- */
  const langBlock = news[i18n.language] || {};
  const title       = langBlock.title || '';
  const description = langBlock.resume || langBlock.description || '';
  const baseUrl     = 'https://www.electrotech.ca';             // adapte si besoin
  const pageUrl = `${baseUrl}/news/${slug}`;
  const imgUrl      = `${baseUrl}/news/img/${news.id}.jpg`;
  const videoUrl    = `${baseUrl}/news/vid/${news.id}.mp4`;
  const uploadDate  = news.date || new Date().toISOString();

  /* ---- structured data -------------------------------------------------- */
  const structuredData =
    news.type === 'video'
      ? {
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: title,
          description,
          thumbnailUrl: imgUrl,
          uploadDate,
          contentUrl: videoUrl,
          embedUrl: pageUrl
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          name: title,
          caption: description,
          contentUrl: imgUrl,
          url: imgUrl
        };

  /* ---- render ----------------------------------------------------------- */
  return (
    <>
      {/* ---------------------- Helmet SEO -------------------------------- */}
      <Helmet>
        <title>{title}</title>

        {/* canonical */}
        <link rel="canonical" href={pageUrl} />

        {/* -------- Open Graph -------- */}
        <meta property="og:locale" content={i18n.language === 'fr' ? 'fr_CA' : 'en_CA'} />
        <meta property="og:type"   content={news.type === 'video' ? 'video.other' : 'article'} />
        <meta property="og:title"  content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url"    content={pageUrl} />
        {news.type === 'video' ? (
          <>
            <meta property="og:video"       content={videoUrl} />
            <meta property="og:video:type"  content="video/mp4" />
            <meta property="og:image"       content={imgUrl} />
          </>
        ) : (
          <meta property="og:image" content={imgUrl} />
        )}

        {/* -------- Twitter Card -------- */}
        <meta name="twitter:card"        content={news.type === 'video' ? 'player' : 'summary_large_image'} />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={imgUrl} />

        {/* -------- JSON-LD structured data -------- */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* ---------------------- Page -------------------------------------- */}
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
            src={videoUrl}
            poster={imgUrl}
            controls
            muted
            loop
            sx={{
              width: '100%',
              maxWidth: 900,
              height: 'auto',
              borderRadius: 2,
              my: 4
            }}
          />
        ) : (
          <Box
            component="img"
            src={imgUrl}
            alt={title}
            sx={{
              width: '100%',
              maxWidth: 900,
              height: 'auto',
              borderRadius: 2,
              my: 4
            }}
          />
        )}

        <Typography
          variant="h6"
          sx={{
            maxWidth: 900,
            mx: 'auto',
            textAlign: 'left',
            whiteSpace: 'pre-line',
            color: theme.palette.text.primary
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Container>
    </>
  );
}

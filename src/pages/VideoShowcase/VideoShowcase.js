// src/pages/VideoShowcase/VideoShowcase.js
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SeoHelmet from '../../components/SeoHelmet';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const VIDEO_SRC   = 'https://www.electrotech.ca/video.mp4';
const THUMBNAIL   = 'https://www.electrotech.ca/photos/video-thumbnail.jpg'; // 1280×720 JPG
const PAGE_URL    = 'https://www.electrotech.ca/video-showcase';            // final live URL

export default function VideoShowcase() {
  const { t } = useTranslation('');        // add texts in locales/videos.json

  return (
    <>
      {/* Canonical, hreflang, OG … */}
      <SeoHelmet />

      {/* Extra structured data just for this video */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type":   "VideoObject",
            name:        t('industrial_demo_title'),
            description: t('industrial_demo_description'),
            thumbnailUrl: THUMBNAIL,
            uploadDate:  "2025-07-01",            // ISO-8601
            contentUrl:  VIDEO_SRC,
            embedUrl:    PAGE_URL,
            publisher: {
              "@type": "Organization",
              name:    "Électrotech Automatisation Industrielle",
              logo: {
                "@type": "ImageObject",
                url: "https://www.electrotech.ca/photos/og-thumbnail.jpg",
                width: 600,
                height: 60
              }
            }
          })}
        </script>
      </Helmet>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          {t('industrial_demo_title')}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <video
            controls
            width="100%"
            poster={THUMBNAIL}
            src={VIDEO_SRC}
            type="video/mp4"
          >
            {t('video_not_supported')}
          </video>
        </Box>

        <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
          {t('industrial_demo_description')}
        </Typography>
      </Container>
    </>
  );
}

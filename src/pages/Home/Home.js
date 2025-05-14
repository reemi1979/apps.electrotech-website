// src/Home/Homes.js
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import LazyLoad from 'react-lazyload';
import HeroVideo from './HeroVideo';
import HomePhotos from './HomePhotos';
import HomeIndustries from './HomeIndustries';
import HomeServices from './HomeServices';
import ScrollToNextSectionButton from '../../components/ScrollToNextSectionButton';
import HomeAccordion from './HomeAccordion';
import HomeFlipBox1 from './HomeFlipBox1';
import HomeFlipBox2 from './HomeFlipBox2';
import HomeFlipBox3 from './HomeFlipBox3';

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const mapLink = isMobile
    ? 'geo:0,0?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2'
    : 'https://www.google.com/maps?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2';

  const [currentSection, setCurrentSection] = useState(1);
  const nextSectionId = `section${currentSection + 1}`;
  const isLastSection = currentSection >= 9;

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <title>Électrotech – Panneaux de contrôle et automatisation à Granby</title>
        <meta
          name="description"
          content="Électrotech est un leader en fabrication de panneaux de contrôle électrique à Granby. Spécialiste en automatisation industrielle depuis 1997."
        />
        <link rel="canonical" href="https://www.electrotech.ca/" />
        <meta property="og:title" content="Électrotech – Automatisation et panneaux de contrôle industriel" />
        <meta property="og:description" content="Fabricant de panneaux de contrôle électrique à Granby. Solutions complètes en automatisation industrielle depuis plus de 25 ans." />
        <meta property="og:url" content="https://www.electrotech.ca/" />
        <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_CA" />
        <meta property="fb:app_id" content="4066793063644485" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Électrotech – Automatisation et panneaux de contrôle industriel" />
        <meta name="twitter:description" content="Découvrez nos services d'ingénierie et de fabrication de panneaux électriques sur mesure à Granby." />
        <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Électrotech Automatisation Industrielle",
            "url": "https://www.electrotech.ca",
            "logo": "https://www.electrotech.ca/photos/og-thumbnail.jpg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-450-776-2628",
              "contactType": "Customer Service",
              "areaServed": "CA",
              "availableLanguage": ["French", "English"]
            },
            "sameAs": [
              "https://www.facebook.com/ElectrotechAutomatisationIndustrielle",
              "https://ca.linkedin.com/company/electrotech-ca"
            ]
          }
          `}
        </script>

        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://www.electrotech.ca",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.electrotech.ca/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
          `}
        </script>
      
      </Helmet>

      {/* Sections */}
      <Box id="section1" sx={{ position: 'relative', zIndex: 0, height: '100vh' }}>
        <LazyLoad once>
          <HeroVideo />
        </LazyLoad>
      </Box>

      <Box
        id="section2"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          position: 'relative',
          zIndex: 1,
          px: 2,
          py: 2,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mx: 'auto',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <LazyLoad once>
            <Box
              component="img"
              src={process.env.PUBLIC_URL + '/logos/logo.svg'}
              alt="Électrotech Logo"
              sx={{
                width: { xs: '100%', md: 800 },
                height: 'auto',
                mb: 10,
                mx: 'auto',
                display: 'block',
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.5s ease-in-out',
                '&:hover': {
                  filter: isDark ? 'none' : 'brightness(0)',
                },
              }}
            />
          </LazyLoad>
        </motion.div>
      </Box>

      <Box id="section3" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <HomeFlipBox1 />
      </Box>

      <Box id="section4" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <HomeFlipBox2 />
      </Box>

      <Box id="section5" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <HomeFlipBox3 />
      </Box>

      <Box id="section6" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          {t('home_expertise')}
        </Typography>
        <LazyLoad once>
          <HomePhotos />
        </LazyLoad>
      </Box>

      <Box id="section7" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          <HomeIndustries />
        </Typography>
      </Box>

      <Box id="section8" sx={{ minHeight: '100vh', ...sharedBoxStyle }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          <HomeServices />
        </Typography>
      </Box>

      <Box id="section9" sx={{ minHeight: '80vh', ...sharedBoxStyle }}>
        <HomeAccordion mapLink={mapLink} isMobile={isMobile} t={t} theme={theme} />
      </Box>

      <ScrollToNextSectionButton sectionIds={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']} />
    </>
  );
};

// Common style used across sections
const sharedBoxStyle = {
  display: 'flex',
  position: 'relative',
  zIndex: 1,
  px: 2,
  py: 2,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  mx: 'auto',
};

export default Home;

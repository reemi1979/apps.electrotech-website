//src/pages/Home.js

import { useEffect, lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import LazyLoad from 'react-lazyload';
import HeroVideo from './HeroVideo';
import ScrollToNextSectionButton from '../../components/ScrollToNextSectionButton';
import SeoHelmet from '../../components/SeoHelmet';

const HomeFlipBox1 = lazy(() => import('./HomeFlipBox1'));
const HomeFlipBox2 = lazy(() => import('./HomeFlipBox2'));
const HomeFlipBox3 = lazy(() => import('./HomeFlipBox3'));
const HomePhotos = lazy(() => import('./HomePhotos'));
const HomeIndustries = lazy(() => import('./HomeIndustries'));
const HomeServices = lazy(() => import('./HomeServices'));
const HomeAccordion = lazy(() => import('./HomeAccordion'));

const Home = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const mapLink = isMobile
    ? 'geo:0,0?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2'
    : 'https://www.google.com/maps?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2';

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      
      <SeoHelmet />

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
          }}
        />
      </LazyLoad>
    </Box>

      <Box id="section3" sx={{ minHeight: '100vh', display: 'flex', position: 'relative', zIndex: 1, px: 2, py: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center', mx: 'auto' }}>
        <Suspense fallback={null}><HomeFlipBox1 /></Suspense>
      </Box>

      <Box id="section4" sx={{ minHeight: '100vh', display: 'flex', position: 'relative', zIndex: 1, px: 2, py: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center', mx: 'auto' }}>
        <Suspense fallback={null}><HomeFlipBox2 /></Suspense>
      </Box>

      <Box id="section5" sx={{ minHeight: '100vh', display: 'flex', position: 'relative', zIndex: 1, px: 2, py: 2, alignItems: 'center', justifyContent: 'center', textAlign: 'center', mx: 'auto' }}>
        <Suspense fallback={null}><HomeFlipBox3 /></Suspense>
      </Box>

      <Box id="section6" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, py: 2, textAlign: 'center', mx: 'auto' }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          {t('home_expertise')}
        </Typography>
        <Suspense fallback={null}>
          <LazyLoad once>
            <HomePhotos />
          </LazyLoad>
        </Suspense>
      </Box>

      <Box id="section7" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, py: 2, textAlign: 'center', mx: 'auto' }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          <Suspense fallback={null}>
            <HomeIndustries />
          </Suspense>
        </Typography>
      </Box>

      <Box id="section8" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, py: 2, textAlign: 'center', mx: 'auto' }}>
        <Typography variant="h3" sx={{ mb: 2, color: theme.palette.text.secondary }}>
          <Suspense fallback={null}>
            <HomeServices />
          </Suspense>
        </Typography>
      </Box>

      <Box id="section9" sx={{ minHeight: '80vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto' }}>
        <Suspense fallback={null}>
          <HomeAccordion mapLink={mapLink} isMobile={isMobile} t={t} theme={theme} />
        </Suspense>
      </Box>

      <ScrollToNextSectionButton sectionIds={['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9']} />
    </>
  );
};

export default Home;

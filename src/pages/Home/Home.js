import { useEffect, useState, lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
      
      <SeoHelmet />

      {/* Your layout continues exactly as is */}
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

      <ScrollToNextSectionButton sectionIds={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']} />
    </>
  );
};

export default Home;

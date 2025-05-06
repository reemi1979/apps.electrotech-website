// src/Home/Homes.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';

import HeroVideo from './HeroVideo';
import HomePhotos from './HomePhotos';
import HomeIndustries from './HomeIndustries';
import HomeServices from './HomeServices';
import ScrollToNextSectionButton from '../../components/ScrollToNextSectionButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Home = () => {

    const { t } = useTranslation();
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const mapLink = isMobile
    ? 'geo:0,0?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2'
    : 'https://www.google.com/maps?q=625+Simonds+Sud,+Granby,+QC+J2J+1C2';
    
    const [currentSection, setCurrentSection] = useState(1);
    const nextSectionId = `section${currentSection + 1}`; // incrémente
    const isLastSection = currentSection >= 6;
    
    useEffect(() => {
      const handleScroll = () => {
      };
    
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);      


    return (
        <>

        <Box id="section1" sx={{ position: 'relative', zIndex: 0, height: '100vh' }}>
            <HeroVideo />
            
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 80,
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    zIndex: 1,
                    px: 2,
                }}
            >
            </Box>

        </Box>


        <Box id="section2" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto', }}>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
            <Box
                component="img"
                src={process.env.PUBLIC_URL + '/logos/logo.svg'}
                alt="Électrotech Logo"
                sx={{
                width: { xs: '100%', md: 800 },
                height: 'auto',
                mx: 'auto',
                display: 'block',
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
                transition: 'filter 0.5s ease-in-out',
                '&:hover': {
                    filter: isDark ? 'none' : 'brightness(0)', // ✅ couleur en dark, noir en light
                }
                }}
            />
            </motion.div>

            <Typography variant="h3" sx={{ mt:2, mb: 2 , color: theme.palette.text.secondary }}>
                {t('home_welcome')}
            </Typography>

            <Typography variant="h4"  sx={{mb: 2, maxWidth: 1400, margin: '0 auto', color: theme.palette.text.primary }}>
                {t('home_content_1')}
            </Typography>

            <Typography variant="h6" sx={{mb: 10, maxWidth: 1400, margin: '0 auto' }}>
                {t('home_content_2')}
            </Typography>

        </Box>
            

        <Box id="section3" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary}}>
                {t('home_expertise')}
                <HomePhotos />
            </Typography>

        </Box>


        <Box id="section4" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary}}>
                <HomeIndustries />
            </Typography>

        </Box>   
            

        <Box id="section5" sx={{ minHeight: '100vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary}}>
                <HomeServices />
            </Typography>

        </Box>

  
        <Box id="section6" sx={{ minHeight: '80vh', position: 'relative', zIndex: 1, px: 2, py: 2, textAlign: 'center', mx: 'auto', }}>

            <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.secondary, mb: 4 }}>
                CONTACTEZ-NOUS
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                    <LocationOnIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Typography
                        variant="body1"
                        component="a"
                        href={mapLink}
                        target={isMobile ? undefined : '_blank'}
                        rel={isMobile ? undefined : 'noopener noreferrer'}
                        sx={{
                        color: theme.palette.text.primary,
                        mt: 1,
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        625 Simonds Sud<br />
                        Granby, Québec, Canada<br />
                        J2J 1C2
                    </Typography>
                </Grid>



                <Grid item xs={12} sm={4}>
                    <PhoneIphoneIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Typography variant="body1" sx={{ mt: 1, color: theme.palette.text.primary }}>
                        1-450-776-2628
                    </Typography>
                </Grid>

                {/* Écrivez-nous */}
                <Grid item xs={12} sm={4}>
                    <AlternateEmailIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Typography variant="body1" sx={{ mt: 1, color: theme.palette.text.primary }}>
                        {t('home_contact_us_title')}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} >
                        {t('home_contact_us')}
                    </Button>
                </Grid>
            </Grid>
            </Box>

        </Box>

        <ScrollToNextSectionButton sectionIds={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']} />


        </>
    );
};

export default Home;

// src/pages/Achievements/Achievements.js

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import Slideshow from './AchievementsPhotos';
import BackgroundBanner from '../../components/BackgroundBanner';
import AchievementsAccordion from './AchievementsAccordion';
import SeoHelmet from '../../components/SeoHelmet';


const Achievements = () => {
    const theme = useTheme();
    const { t } = useTranslation('achievements');
    const slideshowRef = useRef(null);
    const [bannerTop, setBannerTop] = useState(350);

    // Measure slideshow vertical center
    useEffect(() => {
        if (slideshowRef.current) {
        const rect = slideshowRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const center = rect.top + scrollTop + rect.height / 2 - 100; // Adjusted offset
        setBannerTop(center);
        }
    }, []);

    return (
        <>

        <SeoHelmet />

        <Box sx={{ position: 'relative' }}>
            <BackgroundBanner image="photos/blue.jpg" height={100} top={bannerTop} />

            <Container sx={{ py: 8 }}>
                <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 10, textAlign: 'center' }}>
                    {t('achievements_title')}
                </Typography>

                <Typography
                    variant="h6"
                    component="p"
                    sx={{ maxWidth: 800, mx: 'auto', mb: 4, textAlign: 'center' }}
                >
                    {t('achievements_intro')}
                    
                </Typography>

                    <Box ref={slideshowRef}>
                    <Slideshow />
                    </Box>

                <Divider sx={{ my: 2, borderColor: 'text.secondary', borderBottomWidth: 2 }} />

                <AchievementsAccordion />

            </Container>
        </Box>
        
        </>
    );
};

export default Achievements;

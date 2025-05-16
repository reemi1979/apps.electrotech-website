// src/Home/HomeIndustries.js

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import BackgroundBanner from '../../components/BackgroundBanner';

const industries = [
    { src: process.env.PUBLIC_URL + '/photos/industries/a.webp', titleKey: 'home_industrie_airport_title', descriptionKey: 'home_industrie_airport_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/b.webp', titleKey: 'home_industrie_distribution_title', descriptionKey: 'home_industrie_distribution_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/c.webp', titleKey: 'home_industrie_manufacturing_title', descriptionKey: 'home_industrie_manufacturing_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/d.webp', titleKey: 'home_industrie_oem_title', descriptionKey: 'home_industrie_oem_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/e.webp', titleKey: 'home_industrie_foodpharma_title', descriptionKey: 'home_industrie_foodpharma_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/f.webp', titleKey: 'home_industrie_energy_title', descriptionKey: 'home_industrie_energy_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/g.webp', titleKey: 'home_industrie_mining_title', descriptionKey: 'home_industrie_mining_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/h.webp', titleKey: 'home_industrie_engineer_title', descriptionKey: 'home_industrie_engineer_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/i.webp', titleKey: 'home_industrie_transport_title', descriptionKey: 'home_industrie_transport_description' }
];

const HomeIndustries = () => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleUserAction = (index) => {
        setSelectedIndex(index);
    };

    return (
    
        <Box sx={{ position: 'relative' }}>
        
            <Box sx={{ px: 2, maxWidth: 1400, mx: 'auto' }}>
                
                <Box
                    sx={{
                    textAlign: 'center',
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    }}
                >

                    <Typography
                        variant="h3"
                        sx={{ mb: 2, color: theme.palette.text.white }}
                    >
                        {t('home_industrie_default_title')}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{ maxWidth: 1400, mx: 'auto', color: theme.palette.text.white }}
                    >
                        {t('home_industrie_default_description')}
                    </Typography>

                </Box>

                    <Grid
                        container
                        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                        spacing={2}
                        justifyContent="center"
                        sx={{ mb: 2, minHeight: { xs: 400, sm: 'auto' } }}
                    >
                        <BackgroundBanner image="photos/lobby.webp" height={250} top={0} />

                        {industries.map((item, index) => (
                            <Grid
                            key={`${index}-${item.titleKey}`}
                            gridColumn={{
                                xs: 'span 4', 
                                sm: 'span 4',
                                md: 'span 3', 
                                lg: 'span 2', 
                            }}
                            textAlign="center"
                            >
                            <Box
                                component="img"
                                src={item.src}
                                alt={t(item.titleKey)}
                                onClick={() => handleUserAction(index)}
                                onMouseOver={() => handleUserAction(index)}
                                sx={{
                                willChange: 'transform',
                                width: 100,
                                height: 100,
                                borderRadius: '10%',
                                objectFit: 'cover',
                                mx: 'auto',
                                transition: 'all 0.3s ease-in-out',
                                transform: selectedIndex === index ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: selectedIndex === index
                                    ? `0 0 15px ${
                                        theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.6)'
                                        : 'rgba(0,0,0,0.8)'
                                    }`
                                    : 'none',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                }}
                            />
                            </Grid>
                        ))}
                    </Grid>


                <Box 
                    sx={{
                    height: 'auto',
                    minHeight: 140,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: 3,
                    py: 2,
                    mx: 'auto',
                    maxWidth: 600,
                    border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    borderRadius: 4,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 20px rgba(0,0,0,0.7)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))',
                    }}
                >

                    <Typography variant="h4" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                        {t(industries[selectedIndex].titleKey)}
                    </Typography>

                    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                        {t(industries[selectedIndex].descriptionKey)}
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
};

export default HomeIndustries;


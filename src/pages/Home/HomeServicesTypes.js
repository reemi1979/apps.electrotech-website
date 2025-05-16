// src/pages/Services/ServicesTypes.js

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import BackgroundBanner from '../../components/BackgroundBanner';


const services = [
{ src: process.env.PUBLIC_URL + '/photos/services/a.webp', titleKey: 'home_service_assy_title', descriptionKey: 'home_service_assy_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/b.webp', titleKey: 'home_service_design_title', descriptionKey: 'home_service_design_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/c.webp', titleKey: 'home_service_machine_title', descriptionKey: 'home_service_machine_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/d.webp', titleKey: 'home_service_prog_title', descriptionKey: 'home_service_prog_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/e.webp', titleKey: 'home_service_cnc_title', descriptionKey: 'home_service_cnc_description' },
];

const selectedTypeMap = ['assy', 'design', 'machine', 'prog', 'cnc'];

const HomeServicesTypes = ({ selectedIndex, setSelectedIndex, setSelected }) => {
    
    const theme = useTheme();
    const { t } = useTranslation();

    const handleUserAction = (index) => {
        setSelectedIndex(index);
        setSelected(selectedTypeMap[index]);
    };

    const selected = services[selectedIndex];

    return (

        <Box sx={{ position: 'relative' }}>
              
            <Box sx={{ px: 2, maxWidth: 1400, mx: 'auto' }}>

                <BackgroundBanner image="photos/blue.webp" height={250} top={0} />

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
                    {t('home_service_default_title')}
                    </Typography>
                    <Typography
                    variant="h4"
                    sx={{ maxWidth: 1400, mx: 'auto', color: theme.palette.text.white }}
                    >
                    {t('home_service_default_description')}
                    </Typography>
                </Box>

                <Grid
                    container
                    columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                    spacing={2}
                    justifyContent="center"
                    sx={{ mb: 2, minHeight: { xs: 270, sm: 'auto' } }}
                    >
                    {services.map((item, index) => (
                        <Grid
                        key={item.titleKey || index}
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
                            transform: selected === item ? 'scale(1.05)' : 'scale(1)',
                            boxShadow:
                                selectedIndex === index
                                ? `0 0 15px ${
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.6)'
                                        : 'rgba(0,0,0,0.8)'
                                    }`
                                : 'none',
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
                        minHeight: 160, 
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

                    {selected && (
                        <>
                            <Typography variant="h4" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                                {t(selected.titleKey)}
                            </Typography>
                            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                                {t(selected.descriptionKey)}
                            </Typography>
                        </>
                    )}

                </Box>

            </Box>

        </Box>
    );
};

export default HomeServicesTypes;


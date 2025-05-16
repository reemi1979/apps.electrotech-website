//src/pages/Home/HomeAccordion.js

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FaxIcon from '@mui/icons-material/Fax';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

function HomeAccordion({ mapLink, isMobile }) {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', py: 6, maxWidth: '1000px', mx: 'auto' }}>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.secondary, mb: 4 }}>
                {t('home_accordion_title')}
            </Typography>

            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': {
                        display: 'none',
                    },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('home_accordion_location')}</Typography>
                </AccordionSummary>
                    
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background.default, }}>
                    <LocationOnIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Link
                        href={mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="none"
                        sx={{
                        color: theme.palette.text.primary,
                        mt: 1,
                        display: 'inline-block',
                        '&:hover': { textDecoration: 'underline' },
                        }}
                    >
                        <Typography variant="body1" component="div">
                            625 Simonds South<br />
                            Granby, Quebec, Canada<br />
                            J2J 1C2
                        </Typography>
                    </Link>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': {
                        display: 'none',
                    },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('home_accordion_phone')}</Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.palette.background.default, }}>
                    {/* Phone */}
                    <Box sx={{ textAlign: 'center' }}>
                        <LocalPhoneIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                        <Typography variant="body1" sx={{ m:2, color: theme.palette.text.primary }}>
                            1-450-776-2628
                        </Typography>
                    </Box>

                    {/* Fax */}
                    <Box sx={{ textAlign: 'center' }}>
                        <FaxIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                        <Typography variant="body1" sx={{ m:2, color: theme.palette.text.primary }}>
                            1-450-776-2628
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': {
                        display: 'none',
                    },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('home_accordion_email')}</Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background.default, }}>
                    <AlternateEmailIcon sx={{ fontSize: 50, color: theme.palette.text.secondary }} />
                    <Typography variant="body1" sx={{ mt: 1, color: theme.palette.text.primary }}>
                        {t('home_contact_us_title')}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        {t('home_contact_us')}
                    </Button>
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': {
                        display: 'none',
                    },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('home_accordion_facebook')}</Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background.default, }}>
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
                </AccordionDetails>
            </Accordion>

            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': {
                        display: 'none',
                    },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('home_accordion_linkedin')}</Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: theme.palette.background.default, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <a
                            href="https://ca.linkedin.com/company/electrotech-ca"
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
                            src={process.env.PUBLIC_URL + "/logos/linkedin.svg"}
                            alt="LinkedIn"
                            style={{ width: 36, height: 36, marginRight: 10 }}
                            />
                            <Typography variant="h5" fontWeight="bold">
                            {t('linkedin_follow_us')}
                            </Typography>
                        </a>
                    </Box>
                </AccordionDetails>
            </Accordion>

        </Box>
    );
}

export default HomeAccordion;

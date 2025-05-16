// src/pages/About/AchievementAccordion.js

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


function AchievementsAccordion() {
    const { t } = useTranslation('achievements');
    const theme = useTheme();

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'left' }}>
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
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                        {t('key_milestones_title')}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', backgroundColor: theme.palette.background.default, }}>
                    <Typography variant="h5" sx={{ color: theme.palette.text.blue }}>
                        {t('milestone_1_title')}
                    </Typography>
                    <Typography variant="h6">{t('milestone_1_desc')}</Typography>

                    <Typography variant="h5" sx={{ color: theme.palette.text.blue, mt: 2 }}>
                        {t('milestone_2_title')}
                    </Typography>
                    <Typography variant="h6">{t('milestone_2_desc')}</Typography>

                    <Typography variant="h5" sx={{ color: theme.palette.text.blue, mt: 2 }}>
                        {t('milestone_3_title')}
                    </Typography>
                    <Typography variant="h6">{t('milestone_3_desc')}</Typography>

                    <Typography variant="h5" sx={{ color: theme.palette.text.blue, mt: 2 }}>
                        {t('milestone_4_title')}
                    </Typography>
                    <Typography variant="h6">{t('milestone_4_desc')}</Typography>
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
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                        {t('client_testimonials_title')}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', backgroundColor: theme.palette.background.default, }}>
                    <Typography variant="h6">{t('testimonial_1')}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                        {t('testimonial_2')}
                    </Typography>
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
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                        {t('at_a_glance_title')}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', backgroundColor: theme.palette.background.default, }}>
                    <ul>
                        <li><Typography variant="h6">{t('glance_1')}</Typography></li>
                        <li><Typography variant="h6">{t('glance_2')}</Typography></li>
                        <li><Typography variant="h6">{t('glance_3')}</Typography></li>
                        <li><Typography variant="h6">{t('glance_4')}</Typography></li>
                        <li><Typography variant="h6">{t('glance_5')}</Typography></li>
                    </ul>
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
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                        {t('why_proud_title')}
                    </Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', backgroundColor: theme.palette.background.default, }}>
                    <Typography variant="h6">{t('why_proud_desc')}</Typography>
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
                    <Typography variant="h4" sx={{ color: theme.palette.text.primary }}>
                        {t('work_with_us_title')}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', backgroundColor: theme.palette.background.default, }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {t('work_with_us_desc')}
                    </Typography>

                    <Button
                        component={Link}
                        to="/contact-us"
                        variant="contained"
                        color="primary"
                    >
                        {t('contact_us_button')}
                    </Button>

                </AccordionDetails>
                
            </Accordion>
        </Box>
    );
}

export default AchievementsAccordion;

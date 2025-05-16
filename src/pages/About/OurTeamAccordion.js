// src/pages/About/OurTeamAccordion.js

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

function OurTeamAccordion() {
    const { t } = useTranslation('about');
    const theme = useTheme();

    return (
        <Box sx={{ textAlign: 'center', py: 6, maxWidth: '1000px', mx: 'auto' }}>

            {/* Team Roles */}
            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': { display: 'none' },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('our_team_team_others')}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ textAlign: 'left', backgroundColor: theme.palette.background.default }}>
                    <Typography variant="h6">🔹 {t('our_team_designers')}</Typography>
                    <Typography variant="h6">🔹 {t('our_team_technicians')}</Typography>
                    <Typography variant="h6">🔹 {t('our_team_sales')}</Typography>
                    <Typography variant="h6">🔹 {t('our_team_managers')}</Typography>
                </AccordionDetails>

            </Accordion>

            {/* Commitment Section */}
            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': { display: 'none' },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('our_team_commitment_title')}</Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ textAlign: 'left', backgroundColor: theme.palette.background.default }}>
                    <Typography variant="h6">{t('our_team_commitment_desc')}</Typography>
                </AccordionDetails>

            </Accordion>

            {/* Join Us Section */}
            <Accordion
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    '&:before': { display: 'none' },
                    '& .MuiAccordionSummary-root': {
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h4">{t('our_team_join_title')}</Typography>
                </AccordionSummary>
                
                <AccordionDetails sx={{ textAlign: 'left', backgroundColor: theme.palette.background.default }}>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {t('our_team_join_desc')}
                    </Typography>

                    <Button
                        component={Link}
                        to="/jobs"
                        variant="contained"
                        color="primary"
                    >
                        {t('our_team_job_button')}
                    </Button>

                </AccordionDetails>

            </Accordion>
        </Box>
    );
}

export default OurTeamAccordion;

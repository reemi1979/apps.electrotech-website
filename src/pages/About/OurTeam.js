// src/pages/About/Ourteam.js

import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const OurTeam = () => {
  const theme = useTheme();
  const { t } = useTranslation('about');

  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 10 }}>
        {t('our_team_title_page')}
      </Typography>

      <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
        {t('our_team_intro')}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_leadership_title')}
        </Typography>

        <Box textAlign="left" sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h4" sx={{ color: theme.palette.text.blue }}>
            👨‍💼 {t('our_team_charles_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('our_team_charles_desc')}</Typography>

          <Typography variant="h4" sx={{ color: theme.palette.text.blue }}>
            👨‍🏭 {t('our_team_isabelle_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('our_team_isabelle_desc')}</Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_team_title')}
        </Typography>

        <Box textAlign="left" sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h6" component="p">🔹 {t('our_team_designers')}</Typography>
          <Typography variant="h6" component="p">🔹 {t('our_team_technicians')}</Typography>
          <Typography variant="h6" component="p">🔹 {t('our_team_sales')}</Typography>
          <Typography variant="h6" component="p">🔹 {t('our_team_managers')}</Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_commitment_title')}
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
          {t('our_team_commitment_desc')}
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_join_title')}
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
          {t('our_team_join_desc')}
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          {t('our_team_job_button')}
        </Button>
      </Box>
    </Container>
  );
};

export default OurTeam;

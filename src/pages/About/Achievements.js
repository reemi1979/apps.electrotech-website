// src/pages/Achievements/Achievements.js

import React from 'react';
import { Box, Typography, Grid, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const MotionBox = motion(Box);

const Achievements = () => {
  const theme = useTheme();
  const { t } = useTranslation('achievements');

  return (
    <Container sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 10 }}>
        {t('achievements_title')}
      </Typography>

      <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
        {t('achievements_intro')}
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('key_milestones_title')}
        </Typography>

        <Box textAlign="left" sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h5" sx={{ color: theme.palette.text.blue }}>
            {t('milestone_1_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('milestone_1_desc')}</Typography>

          <Typography variant="h5" sx={{ color: theme.palette.text.blue }}>
            {t('milestone_2_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('milestone_2_desc')}</Typography>

          <Typography variant="h5" sx={{ color: theme.palette.text.blue }}>
            {t('milestone_3_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('milestone_3_desc')}</Typography>

          <Typography variant="h5" sx={{ color: theme.palette.text.blue }}>
            {t('milestone_4_title')}
          </Typography>
          <Typography variant="h6" component="p">{t('milestone_4_desc')}</Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('client_testimonials_title')}
        </Typography>

        <Box textAlign="left" sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h6" component="p">{t('testimonial_1')}</Typography>
          <Typography variant="h6" component="p">{t('testimonial_2')}</Typography>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('at_a_glance_title')}
        </Typography>

        <Box textAlign="left" sx={{ maxWidth: 800, mx: 'auto' }}>
          <ul>
            <li><Typography variant="h6" component="p">{t('glance_1')}</Typography></li>
            <li><Typography variant="h6" component="p">{t('glance_2')}</Typography></li>
            <li><Typography variant="h6" component="p">{t('glance_3')}</Typography></li>
            <li><Typography variant="h6" component="p">{t('glance_4')}</Typography></li>
            <li><Typography variant="h6" component="p">{t('glance_5')}</Typography></li>
          </ul>
        </Box>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('why_proud_title')}
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
          {t('why_proud_desc')}
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('work_with_us_title')}
        </Typography>
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto' }}>
          {t('work_with_us_desc')}
        </Typography>
        <Button variant="contained" color="primary">
          {t('contact_us_button')}
        </Button>
      </Box>
    </Container>
  );
};

export default Achievements;

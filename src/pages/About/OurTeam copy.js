// src/pages/About/Ourteam.js
import React from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const teamMembers = [
  {
    key: 'charles',
    fullname: 'Charles Fortin',
    img: 'charles.jpg',
  },
  {
    key: 'isabelle',
    fullname: 'Isabelle Guay',
    img: 'isabelle.jpg',
  },
  {
    key: 'zachary',
    fullname: 'Zachary Fortin',
    img: 'zachary.jpg',
  },
  {
    key: 'jerome',
    fullname: 'Jérôme Fortin',
    img: 'jerome.jpg',
  },
];

const OurTeam = () => {
  const theme = useTheme();
  const { t } = useTranslation('about');

  return (
    <Container sx={{ py: 8 }}>
      {/* Centered title + intro */}
      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 10, textAlign: 'center' }}>
        {t('our_team_title_page')}
      </Typography>

      <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto', mb: 4, textAlign: 'center' }}>
        {t('our_team_intro')}
      </Typography>

      {/* Team members (kept in center block) */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 1 }}>
          {t('our_team_team_title')}
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {teamMembers.map((member) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{ flexBasis: 400, flexGrow: 1, display: 'flex' }}
              key={member.key}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 140,
                  p: 2,
                  borderRadius: 2,
                  textDecoration: 'none',
                  color: 'inherit',
                  backgroundColor: theme.palette.background.default,
                  transition: 'background-color 0.3s',
                  '&:hover': { backgroundColor: theme.palette.background.paper }
                }}
              >
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}/photos/ourteam/${member.img}`}
                  alt={t(`our_team_${member.key}_title`)}
                  sx={{
                    width: 120,
                    height: 120,
                    minWidth: 120,
                    borderRadius: 2,
                    objectFit: 'cover',
                    mr: 2
                  }}
                />
                <Box sx={{ flex: 1, minWidth: 200, textAlign: 'left' }}>
                  <Typography variant="h6" sx={{ color: theme.palette.text.blue }}>
                    {t(`our_team_${member.key}_title`)}
                  </Typography>
                  <Typography variant="h4" noWrap sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                    {member.fullname}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: theme.palette.text.primary,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {t(`our_team_${member.key}_desc`)}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ALL TO LEFT FROM HERE ↓↓↓ */}

      <Box sx={{ my: 4, textAlign: 'left', maxWidth: 800, mx: 'auto' }}>
        
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_team_others')}
        </Typography>

        <Typography variant="h6" component="p">🔹 {t('our_team_designers')}</Typography>
        <Typography variant="h6" component="p">🔹 {t('our_team_technicians')}</Typography>
        <Typography variant="h6" component="p">🔹 {t('our_team_sales')}</Typography>
        <Typography variant="h6" component="p">🔹 {t('our_team_managers')}</Typography>
      </Box>

      <Box sx={{ my: 4, textAlign: 'left', maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_commitment_title')}
        </Typography>
        <Typography variant="h6" component="p">
          {t('our_team_commitment_desc')}
        </Typography>
      </Box>

      <Box sx={{ my: 4, textAlign: 'left', maxWidth: 800, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.blue }}>
          {t('our_team_join_title')}
        </Typography>
        <Typography variant="h6" component="p" sx={{ mb: 2 }}>
          {t('our_team_join_desc')}
        </Typography>
        <Button
          component={Link}
          to="/join-us"
          variant="contained"
          color="primary"
        >
          {t('our_team_job_button')}
        </Button>
      </Box>
    </Container>
  );
};

export default OurTeam;

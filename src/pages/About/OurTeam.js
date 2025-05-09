// src/pages/About/Ourteam.js

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';
import BackgroundBanner from '../../components/BackgroundBanner';

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
  {
    key: 'remi',
    fullname: 'Rémi Gauvin',
    img: 'remi.jpg',
  },
  {
    key: 'gabriel',
    fullname: 'Gabriel Potvin',
    img: 'gab.jpg',
  },
  {
    key: 'jpd',
    fullname: 'Jean-Philippe Duval',
    img: 'jpd.jpg',
  },
  {
    key: 'alex',
    fullname: 'Alex Mailhot',
    img: 'alex.jpg',
  },
  {
    key: 'martine',
    fullname: 'Martine Lecours',
    img: 'martine.jpg',
  },
  {
    key: 'pascal',
    fullname: 'Pascal Fleury',
    img: 'pascal.jpg',
  },
  {
    key: 'jocelyn',
    fullname: 'Jocelyn Lamarre',
    img: 'jocelyn.jpg',
  },
];

const OurTeam = () => {
  const theme = useTheme();
  const { t } = useTranslation('about');
  const [bannerTop, setBannerTop] = useState(200);
  const titleRef = useRef(null);
  const [hoveredMember, setHoveredMember] = useState(null);

  useEffect(() => {
    if (titleRef.current) {
      const titleRect = titleRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const top = titleRect.top + scrollTop;
      setBannerTop(top);
    }
  }, []);


  return (

    <Box sx={{ position: 'relative' }}>
      
    <BackgroundBanner image="photos/ourteam/bg1.jpg" height={500} top={bannerTop} />

    <Container sx={{ py: 8 }}>
      {/* Centered title + intro */}

      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.blue, mt: 5, textAlign: 'center' }}>
        {t('our_team_title_page')}
      </Typography>

      <Typography ref={titleRef} variant="h6" component="p" sx={{ color: theme.palette.text.white, maxWidth: 800, mx: 'auto', mb: 4, textAlign: 'center' }}>
        {t('our_team_intro')}
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.white, mt: 1, mb: 4, textAlign: 'center' }}>
        {t('our_team_team_title')}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={member.key}
              onMouseEnter={() => setHoveredMember(member.key)}
              onMouseLeave={() => setHoveredMember(null)}
            >
            <Box
              sx={{
                width: 150,
                height: 150,
                mx: 'auto',
                borderRadius: '50%',
                overflow: 'hidden',
                transition: 'transform 0.6s ease',
                '&:hover': {
                  transform: 'scale(1.3)',
                },
              }}
            >
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/photos/ourteam/${member.img}`}
                alt={member.fullname}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box >
            <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                color: theme.palette.text.secondary,
                fontWeight: hoveredMember === member.key ? 'bold' : 'normal',
                transition: 'font-weight 0.3s ease',
              }}
            >
              {member.fullname}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 0,
                color: theme.palette.text.primary,
                fontWeight: hoveredMember === member.key ? 'bold' : 'normal',
                transition: 'font-weight 0.3s ease',
              }}
            >
              {t(`our_team_${member.key}_title`)}
            </Typography>
            </Box>
          </Grid>

        ))}
      </Grid>

      {/* <Container sx={{ py: 8, textAlign: 'center' }}>

      <Box sx={{ mt: 2, minHeight: 50, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
          {hoveredMember ? t(`our_team_${hoveredMember}_desc`) : ''}
        </Typography>
      </Box>

    </Container> */}

      {/* ALL TO LEFT FROM HERE ↓↓↓ */}

      <Divider sx={{ my: 2, borderColor: 'text.secondary', borderBottomWidth: 2 }} />

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
    </Box>
  );
};

export default OurTeam;

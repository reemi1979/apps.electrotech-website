// src/pages/About/Ourteam.js
import { useRef, useEffect, useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { Divider } from '@mui/material';
import BackgroundBanner from '../../components/BackgroundBanner';
import OurTeamAccordion from './OurTeamAccordion';
import OurTeamFlipBox1 from './OurTeamFlipBox1';
import SeoHelmet from '../../components/SeoHelmet';

const teamMembers = [
  { key: 'charles', fullname: 'Charles Fortin', img: 'charles.jpg', row: 1 },
  { key: 'isabelle', fullname: 'Isabelle Guay', img: 'isabelle.jpg', row: 1 },
  { key: 'jerome', fullname: 'Jérôme Fortin', img: 'jerome.jpg', row: 1 },
  { key: 'zachary', fullname: 'Zachary Fortin', img: 'zachary.jpg', row: 1 },
  { key: 'remi', fullname: 'Rémi Gauvin', img: 'remi.jpg', row: 2 },
  { key: 'jpp', fullname: 'Jean-Patrick Picotte', img: 'jpp.jpg', row: 2 },
  { key: 'jpd', fullname: 'Jean-Philippe Duval', img: 'jpd.jpg', row: 2 },
  { key: 'gabriel', fullname: 'Gabriel Potvin', img: 'gab.jpg', row: 2 },
  { key: 'ivanho', fullname: 'Ivanho Dion', img: 'ivanho.jpg', row: 2 },
  { key: 'alex', fullname: 'Alex Mailhot', img: 'alex.jpg', row: 3 },
  { key: 'pascal', fullname: 'Pascal Fleury', img: 'pascal.jpg', row: 3 },
  { key: 'jocelyn', fullname: 'Jocelyn Lamarre', img: 'jocelyn.jpg', row: 3 },
  { key: 'martine', fullname: 'Martine Lecours', img: 'martine.jpg', row: 3 },
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

  const groupedByRow = teamMembers.reduce((acc, member) => {
    if (!acc[member.row]) acc[member.row] = [];
    acc[member.row].push(member);
    return acc;
  }, {});

  return (
    <>
      <SeoHelmet />
      <Box sx={{ position: 'relative' }}>
        <BackgroundBanner image="photos/ourteam/bg1.jpg" height={300} top={bannerTop} />
        <Container sx={{ py: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: theme.palette.text.blue, mt: 5, textAlign: 'center' }}
          >
            {t('our_team_title_page')}
          </Typography>

          <Typography
            ref={titleRef}
            variant="h6"
            component="p"
            sx={{ color: theme.palette.text.white, maxWidth: 800, mx: 'auto', mb: 10, textAlign: 'center' }}
          >
            {t('our_team_intro')}
          </Typography>

          {Object.values(groupedByRow).map((group, rowIndex) => (
            <Grid container spacing={4} sx={{ mb: 6 }} justifyContent="center" key={rowIndex}>
              {group.map((member) => (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  lg={12 / group.length}
                  key={member.key}
                  onMouseEnter={() => setHoveredMember(member.key)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      mx: 'auto',
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
                        width: '104%',
                        height: '100%',
                        objectFit: 'cover',
                        marginLeft: '-2%',
                        borderRadius: '10%',
                      }}
                    />
                  </Box>
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
          ))}

          <OurTeamFlipBox1 />

          <br /><br /><br />
          <Divider sx={{ my: 2, borderColor: 'text.secondary', borderBottomWidth: 2 }} />
          <OurTeamAccordion />
        </Container>
      </Box>
    </>
  );
};

export default OurTeam;

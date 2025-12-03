// src/pages/About/Ourteam.js
import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import BackgroundBanner from '../../components/BackgroundBanner';
import OurTeamAccordion from './OurTeamAccordion';
import OurTeamFlipBox1 from './OurTeamFlipBox1';
import SeoHelmet from '../../components/SeoHelmet';

const teamMembers = [
  { key: 'charles', fullname: 'Charles Fortin', row: 1, isVideo: false },
  { key: 'isabelle', fullname: 'Isabelle Guay', row: 1, isVideo: false },
  { key: 'jerome', fullname: 'Jérôme Fortin', row: 1, isVideo: false },
  { key: 'zachary', fullname: 'Zachary Fortin', row: 1, isVideo: false },
  { key: 'remi', fullname: 'Rémi Gauvin', row: 2, isVideo: false },
  { key: 'jpp', fullname: 'Jean-Patrick Picotte', row: 2, isVideo: false },
  { key: 'jpd', fullname: 'Jean-Philippe Duval', row: 2, isVideo: false },
  { key: 'gabriel', fullname: 'Gabriel Potvin', row: 2, isVideo: false },
  { key: 'ivanho', fullname: 'Ivanho Dion', row: 3, isVideo: false },
  { key: 'alex', fullname: 'Alex Mailhot', row: 3, isVideo: false },
  { key: 'pascal', fullname: 'Pascal Fleury', row: 3, isVideo: false },
  { key: 'jocelyn', fullname: 'Jocelyn Lamarre', row: 3, isVideo: false },
  { key: 'martine', fullname: 'Martine Lecours', row: 3, isVideo: false },
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

  useEffect(() => {
    // Preload all video elements offscreen
    teamMembers.forEach((member) => {
      if (member.isVideo) {
        const video = document.createElement('video');
        video.src = `${process.env.PUBLIC_URL}/photos/ourteam/${member.key}.mp4`;
        video.preload = 'auto';
        video.muted = true;
        video.setAttribute('playsinline', '');
        video.style.display = 'none';
        document.body.appendChild(video);
      }
    });
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
                  size={{ xs: 6, sm: 6, md: 3, lg: 12 / group.length }}
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
                    {member.isVideo ? (
                      hoveredMember === member.key ? (
                        <video
                          src={`${process.env.PUBLIC_URL}/photos/ourteam/${member.key}.mp4`}
                          muted
                          autoPlay
                          loop
                          playsInline
                          style={{
                            width: '104%',
                            height: '100%',
                            objectFit: 'cover',
                            marginLeft: '-2%',
                            borderRadius: '10%',
                          }}
                        />
                      ) : (
                        <Box
                          component="img"
                          src={`${process.env.PUBLIC_URL}/photos/ourteam/${member.key}.webp`}
                          alt={member.fullname}
                          sx={{
                            width: '104%',
                            height: '100%',
                            objectFit: 'cover',
                            marginLeft: '-2%',
                            borderRadius: '10%',
                          }}
                        />
                      )
                    ) : (
                      <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/photos/ourteam/${member.key}.webp`}
                        alt={member.fullname}
                        sx={{
                          width: '104%',
                          height: '100%',
                          objectFit: 'cover',
                          marginLeft: '-2%',
                          borderRadius: '10%',
                        }}
                      />
                    )}

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

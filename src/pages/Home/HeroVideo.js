import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

// Détection iOS
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

const HeroVideo = () => {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldPlay, setShouldPlay] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const playlistUrl = window.location.hostname === 'localhost'
    ? process.env.PUBLIC_URL + '/video/playlist.m3u8'
    : 'https://electrotech.ca/video/playlist.m3u8';

  const posterUrl = process.env.PUBLIC_URL + '/video.webp';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldPlay(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (shouldPlay && videoRef.current && !isIOS) {
      import('hls.js').then(({ default: Hls }) => {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(playlistUrl);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            videoRef.current.play().catch(() => {});
          });

          return () => hls.destroy();
        }
      });
    }
  }, [shouldPlay, playlistUrl]);

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <>
      <div
        className="video-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {shouldPlay && (
          <video
            ref={videoRef}
            src={isIOS ? playlistUrl : undefined} // src direct pour iOS
            poster={posterUrl}
            muted={isMuted}
            loop
            playsInline
            autoPlay
            preload="none"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        )}
      </div>

      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: theme.palette.background.white,
          p: 2,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          width: { xs: '90%', sm: 'auto' },
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: theme.palette.text.black, fontSize: '1rem', fontWeight: 'bold' }}
        >
          {t('hero_tracking')}
        </Typography>

        <Button
          onClick={() => navigate('/tracking')}
          variant="contained"
          color="primary"
          endIcon={<ArrowCircleRightIcon />}
          sx={{ ml: 4, px: 4, py: 1, textTransform: 'none' }}
        >
          {t('hero_tracking_button')}
        </Button>
      </Box>

      <Button
        onClick={toggleSound}
        variant="contained"
        color="primary"
        startIcon={isMuted ? <VolumeUpIcon /> : <VolumeOffIcon />}
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          zIndex: 10,
          padding: '8px 16px',
          fontSize: '1rem',
          textTransform: 'none',
        }}
      >
        {isMuted ? t('hero_button_sound_on') : t('hero_button_sound_off')}
      </Button>
    </>
  );
};

export default HeroVideo;

// src/Home/HeroVideo.js

import React, { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';



const HeroVideo = () => {

  const { t } = useTranslation();
  const videoRef = useRef(null);
  const videoPath = process.env.PUBLIC_URL + '/video.mp4';
  const videoPhoto = process.env.PUBLIC_URL + '/video.jpg';
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  const toggleSound = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      videoRef.current.play().catch(() => {});
      setIsMuted(newMuted);
    }
  };

  return (
    <>
    
      <div
        className="video-container"
        style={{
          position: 'absolute', // ⬅️ plus de fixed
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        
        <video
          ref={videoRef}
          src={videoPath}
          poster={videoPhoto}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top'
          }}
        />

      </div>

      <Box
        sx={{
          position: 'absolute',
          bottom: 100, // ✅ 100px from bottom
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: theme.palette.background.white,
          p: 2,
          borderRadius: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          width: { xs: '90%', sm: 'auto' }, 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
        }}
        
      >
        <Typography variant="h6" sx={{ color: theme.palette.text.black, fontSize: '1rem', fontWeight: 'bold' }}>
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
}

export default HeroVideo;

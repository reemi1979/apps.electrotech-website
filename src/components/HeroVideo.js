// src/components/HeroVideo.js

import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { useTranslation } from 'react-i18next';

const HeroVideo = () => {

  const { t } = useTranslation();
  const videoRef = useRef(null);
  const videoPath = process.env.REACT_APP_VIDEO_PATH;
  const [isMuted, setIsMuted] = useState(true);

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

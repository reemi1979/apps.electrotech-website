import React, { useRef, useState } from 'react';

const HeroVideo = () => {

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
      <div className="video-container">
        <video
          ref={videoRef}
          src={videoPath}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
        />
      </div>

      <button
        onClick={toggleSound}
        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}
      >
        {isMuted ? '🔊 Activer le son' : '🔇 Couper le son'}
      </button>
    </>
  );
}

export default HeroVideo;

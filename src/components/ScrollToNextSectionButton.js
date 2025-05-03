import React, { useEffect, useState } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { gsap } from 'gsap';
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const ScrollToNextSectionButton = ({ sectionIds }) => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 1; // +1 pour marge
      let activeIndex = 0;
    
      for (let i = 0; i < sectionIds.length; i++) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop > scrollPosition) {
          // Dès qu’on trouve une section plus basse que scrollPosition
          activeIndex = i - 1 >= 0 ? i - 1 : 0;
          break;
        }
        if (i === sectionIds.length - 1) {
          // Si on est en bas de page
          activeIndex = i;
        }
      }
    
      if (activeIndex >= sectionIds.length - 1) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    
      setCurrentIndex(activeIndex + 1); // 👉 pour viser la prochaine section
    };
    
    
    

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  const handleClick = () => {
    const nextIndex = currentIndex;
    const nextSection = document.getElementById(sectionIds[nextIndex]);
    if (nextSection) {

      //avec animation 

      gsap.to(window, {
        duration: 1,
        scrollTo: { y: nextSection, offsetY: 0 },
        ease: "power2.inOut"
      });

      // sans animation
      
      // nextSection.scrollIntoView({ behavior: 'auto' }); 

    }
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        onClick={handleClick}
        size="medium"
        sx={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#0078D4',
          color: 'white',
          zIndex: 9999,
          '&:hover': { backgroundColor: '#005A9E' },
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <KeyboardArrowDownIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToNextSectionButton;

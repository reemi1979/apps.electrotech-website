// src/components/ScrollToTopButton.js

import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setVisible(true);
        } else {
            setVisible(false);
        }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    return (
        <Zoom in={visible}>
        <Fab
            color="primary"
            onClick={scrollToTop}
            size="medium"
            sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            backgroundColor: '#0078D4',
            color: 'white',
            '&:hover': {
                backgroundColor: '#005A9E',
            },
            boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
            }}
        >
            <KeyboardArrowUpIcon />
        </Fab>
        </Zoom>
    );
};

export default ScrollToTopButton;

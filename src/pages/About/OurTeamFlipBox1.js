//src/pages/About/OurTeamFlipBox1.js

import { useState } from 'react';
import { Box, Typography, keyframes } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useMediaQuery } from '@mui/material';

function OurTeamFlipBox1() {
    const { t } = useTranslation('about');
    const theme = useTheme();
    const [flipped, setFlipped] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:650px)');

    // Define the shake keyframes
    const shake = keyframes`
        0% { transform: rotate(0deg); }
        20% { transform: rotate(1deg); }
        40% { transform: rotate(-1deg); }
        60% { transform: rotate(1deg); }
        80% { transform: rotate(-1deg); }
        100% { transform: rotate(0deg); }
    `;

    return (
        <Box
            sx={{
                perspective: '1000px',
                width: '100%',
                maxWidth: '1200px',
                height: isSmallScreen ? '70vh' : '50vh',
                margin: '0 auto',
                cursor: 'pointer'
            }}
            onClick={() => setFlipped(!flipped)}
        >
            <Box
                sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.8s',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transform: flipped ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
            >

                {/* Front Side */}
                
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateX(0deg)',
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: theme.palette.background.white,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '12px',
                        boxShadow: theme.shadows[3],
                        px: 2,
                        overflow: 'hidden',
                        '&:hover': !flipped
                        ? {
                            animation: `${shake} 0.7s ease-in-out`
                        }
                        : {}
                    }}
                >

                {/* Text block */}

                <Box
                    sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: 4
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                    >
                        {t('our_team_flipbox_title')}
                    </Typography>
                </Box>

                {/* Image block */}

                <Box
                    sx={{
                        position: 'relative',
                        height: isSmallScreen ? '50%' : '100%',
                        width: 'auto',
                        display: 'flex',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/photos/ourteam/t1.jpg`}
                        alt="Trophy 1"
                        sx={{
                            height: isSmallScreen ? '100%' : '100%',
                            width: 'auto',
                            transform: isSmallScreen ? 'scale(1.0)' : 'scale(1.2)',
                            position: 'relative',
                            transformOrigin: 'left center',
                            zIndex: 1
                        }}
                        />
                    </Box>
                </Box>

                {/* Back Side */}

                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: '12px',
                        boxShadow: theme.shadows[3],
                        transform: 'rotateX(180deg)',
                        px: 2
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{ mb: 2, maxWidth: '1000px', margin: '0 auto', color: theme.palette.text.primary }}
                    >
                        {t('our_team_flipbox_content_1')}
                    </Typography>
                    <Typography
                        variant={!isSmallScreen ? 'h6' : 'subtitle1'}
                        sx={{ mb: 10, maxWidth: '1000px', margin: '0 auto' }}
                    >
                        {t('our_team_flipbox_content_2')}
                    </Typography>
                    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                        <CloseIcon sx={{ fontSize: 40, color: theme.palette.text.secondary }} />
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}

export default OurTeamFlipBox1;

// src/pages/Services/Services.js

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ServicesTypes from './ServicesTypes';
import ServicesPhotos from './ServicesPhotos';
import BackgroundBanner from '../../components/BackgroundBanner';
import SeoHelmet from '../../components/SeoHelmet';


const selectedTypeMap = ['standard', 'custom', 'serie', 'pushbuttons', 'junctionbox'];

const Services = () => {

        const { index } = useParams();
        const [selectedIndex, setSelectedIndex] = useState(0);
        const [selected, setSelected] = useState(selectedTypeMap[0]);
        const theme = useTheme();
        const { t } = useTranslation();

    useEffect(() => {
        const idx = parseInt(index, 10);
        if (!isNaN(idx) && idx >= 0 && idx < selectedTypeMap.length) {
            setSelectedIndex(idx);
            setSelected(selectedTypeMap[idx]);
        } else {
            setSelectedIndex(0);
            setSelected(selectedTypeMap[0]);
        }
    }, [index]);

    return (

        <>

        <SeoHelmet />

            <Box sx={{ position: 'relative' }}>
        
            <BackgroundBanner image="photos/lobby.webp" height={550} top={200} />

            <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

                <Typography variant="h6" textAlign="center" sx={{ mt: 2, color: theme.palette.text.primary }}>
                    {t('service_panel_help')}
                </Typography>

                <Box sx={{ textAlign: 'left', mt: 6, maxWidth: 800, mx: 'auto' }}>
                    <ServicesTypes 
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                        setSelected={setSelected}
                    />
                </Box>

                <ServicesPhotos selectedType={selected} />
            </Container>
        </Box>

        </>
    );
};

export default Services;

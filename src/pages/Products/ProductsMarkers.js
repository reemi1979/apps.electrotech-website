// src/pages/Products/ProductsMarkers.js

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ProductsMarkersTypes from './ProductsMarkersTypes';
import BackgroundBanner from '../../components/BackgroundBanner';
import SeoHelmet from '../../components/SeoHelmet';


const ProductsMarkers = () => {
    const theme = useTheme();
    const { t } = useTranslation('products');
    const [selected, setSelected] = useState('cables');

    return (
        <>
      <SeoHelmet />
        <Box sx={{ position: 'relative' }}>
        
            <BackgroundBanner image="photos/lobby.webp" height={550} top={200} />

            <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

                <Typography variant="h6" textAlign="center" sx={{ mt: 2, color: theme.palette.text.primary }}>
                    {t('selected_control_panel_help')}
                </Typography>

                <Box sx={{ textAlign: 'left', mt: 6, maxWidth: 800, mx: 'auto' }}>
                    <ProductsMarkersTypes selected={selected} setSelected={setSelected} />
                </Box>

                <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.yellow }}>
                    {t(`selected_markers_${selected}_description_title`)}
                </Typography>

                <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto', color: theme.palette.text.white }}>
                    {t(`selected_markers_${selected}_description`)}
                </Typography>

                <Typography variant="body2" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    {t(`product_warning_min_order`)}
                </Typography>

            </Container>
        </Box>
         </>
    );
};

export default ProductsMarkers;

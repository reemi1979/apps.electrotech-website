// src/pages/Products/ProductsControlPanels.js

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ProductsControlPanelsTypes from './ProductsControlPanelsTypes';
import ProductsControlPanelsPhotos from './ProductsControlPanelsPhotos';
import BackgroundBanner from '../../components/BackgroundBanner';
import SeoHelmet from '../../components/SeoHelmet';


const ProductsControlPanels = () => {
    const theme = useTheme();
    const { t } = useTranslation('products');
    const [selected, setSelected] = useState('standard'); // valeur par défaut

    return (
        <>
        <SeoHelmet />
        <Box sx={{ position: 'relative' }}>
    
            <BackgroundBanner image="photos/lobby.webp" height={550} top={200} />

            <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

                <Typography variant="h6" textAlign="center" sx={{ mt: 2, color: theme.palette.text.primary }}>
                    {t('selected_control_panel_help')}
                </Typography>

                <Box sx={{ textAlign: 'left' , mt: 6, maxWidth: 800, mx: 'auto' }}>
                    <ProductsControlPanelsTypes selected={selected} setSelected={setSelected} />
                </Box>

                <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.yellow }}>
                    {t(`selected_control_panel_${selected}_description_title`)}
                </Typography>

                <Typography variant="h6" sx={{ mb: 4, minHeight: 100, maxWidth: 800, mx: 'auto', color: theme.palette.text.white }}>
                    {t(`selected_control_panel_${selected}_description`)}
                </Typography>

                <ProductsControlPanelsPhotos selectedType={selected} />
                
            </Container>

        </Box>
        </>
    );
};

export default ProductsControlPanels;

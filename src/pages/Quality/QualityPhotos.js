// src/pages/Quality/QualityPhotos.js

import PhotoGalleryWithLabels from '../../components/PhotoGalleryWithLabels';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

const QualityPhotos = () => {
    const { t } = useTranslation('quality');

    const photos = [
        { src: process.env.PUBLIC_URL + '/photos/quality/a.webp', title: t('quality_photos_1_title'), category: t('quality_photos_1_category'), description: t('quality_photos_1_description') },
        { src: process.env.PUBLIC_URL + '/photos/quality/b.webp', title: t('quality_photos_2_title'), category: t('quality_photos_2_category'), description: t('quality_photos_2_description') },
        { src: process.env.PUBLIC_URL + '/photos/quality/c.webp', title: t('quality_photos_3_title'), category: t('quality_photos_3_category'), description: t('quality_photos_3_description') },
        { src: process.env.PUBLIC_URL + '/photos/quality/d.webp', title: t('quality_photos_4_title'), category: t('quality_photos_4_category'), description: t('quality_photos_4_description') },
    
    ];

    return (
        <Box sx={{ position: 'relative' }}>
            <PhotoGalleryWithLabels photos={photos} />
        </Box>
    );
};

export default QualityPhotos;

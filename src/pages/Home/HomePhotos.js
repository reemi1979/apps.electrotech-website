// src/Home/HomePhotos.js

import Box from '@mui/material/Box';
import PhotoGalleryWithLabels from '../../components/PhotoGalleryWithLabels';
import { useTranslation } from 'react-i18next';
import BackgroundBanner from '../../components/BackgroundBanner';

const HomePhotos = () => {

    const { t } = useTranslation();

    const photos = [
        { src: process.env.PUBLIC_URL + '/photos/home/a.webp', title: t('home_photos_1_title'), category: t('home_photos_1_category'), description: t('home_photos_1_description') },
        { src: process.env.PUBLIC_URL + '/photos/home/c.webp', title: t('home_photos_2_title'), category: t('home_photos_2_category'), description: t('home_photos_2_description') },
        { src: process.env.PUBLIC_URL + '/photos/home/d.webp', title: t('home_photos_3_title'), category: t('home_photos_3_category'), description: t('home_photos_3_description') },
        { src: process.env.PUBLIC_URL + '/photos/home/b.webp', title: t('home_photos_4_title'), category: t('home_photos_4_category'), description: t('home_photos_4_description') },
        { src: process.env.PUBLIC_URL + '/photos/home/e.webp', title: t('home_photos_5_title'), category: t('home_photos_5_category'), description: t('home_photos_5_description') },
        { src: process.env.PUBLIC_URL + '/photos/home/f.webp', title: t('home_photos_6_title'), category: t('home_photos_6_category'), description: t('home_photos_6_description') },
    ];

    return (
        <Box sx={{ position: 'relative' }}>
        <BackgroundBanner image="photos/blue.webp" height={300} top={150} />
            <PhotoGalleryWithLabels photos={photos} />
        </Box>
    );

};

export default HomePhotos;

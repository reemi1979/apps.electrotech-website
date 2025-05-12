// src/pages/Quality/QualityPhotos.js

import PhotoGalleryWithLabels from '../../components/PhotoGalleryWithLabels';
import { useTranslation } from 'react-i18next';

const QualityPhotos = () => {
    const { t } = useTranslation('quality');

    const photos = [
        { src: process.env.PUBLIC_URL + '/photos/quality/a.jpg', title: t('quality_photos_1_title'), category: t('quality_photos_1_category'), description: t('quality_photos_1_description') },
        { src: process.env.PUBLIC_URL + '/photos/quality/b.jpg', title: t('quality_photos_2_title'), category: t('quality_photos_2_category'), description: t('quality_photos_2_description') },
        { src: process.env.PUBLIC_URL + '/photos/quality/c.jpg', title: t('quality_photos_3_title'), category: t('quality_photos_3_category'), description: t('quality_photos_3_description') },
    ];

    return <PhotoGalleryWithLabels photos={photos} />;
};

export default QualityPhotos;

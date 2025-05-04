// src/components/HomePhotos.js

import React from 'react';
import PhotoGalleryWithLabels from '../../components/PhotoGalleryWithLabels';
import { useTranslation } from 'react-i18next';

const HomePhotos = () => {
  const { t } = useTranslation();

  const photos = [
    { src: process.env.PUBLIC_URL + '/photos/home/a.jpg', title: t('home_photos_1_title'), category: t('home_photos_1_category'), description: t('home_photos_1_description') },
    { src: process.env.PUBLIC_URL + '/photos/home/c.jpg', title: t('home_photos_2_title'), category: t('home_photos_2_category'), description: t('home_photos_2_description') },
    { src: process.env.PUBLIC_URL + '/photos/home/d.jpg', title: t('home_photos_3_title'), category: t('home_photos_3_category'), description: t('home_photos_3_description') },
    { src: process.env.PUBLIC_URL + '/photos/home/b.jpg', title: t('home_photos_4_title'), category: t('home_photos_4_category'), description: t('home_photos_4_description') },
    { src: process.env.PUBLIC_URL + '/photos/home/e.jpg', title: t('home_photos_5_title'), category: t('home_photos_5_category'), description: t('home_photos_5_description') },
    { src: process.env.PUBLIC_URL + '/photos/home/f.svg', title: t('home_photos_6_title'), category: t('home_photos_6_category'), description: t('home_photos_6_description') },
  ];

  return <PhotoGalleryWithLabels photos={photos} />;
};

export default HomePhotos;

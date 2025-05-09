// src/pages/Products/ProductsControlPanelsPhotos.js
import React from 'react';
import PhotoGallerySlideShow from '../../components/PhotoGallerySlideShow';

const typeFolderMap = {
  standard: 'standard',
  custom: 'custom',
  serie: 'serie',
  pushbuttons: 'pushbuttons',
  junctionbox: 'junctionbox',
  counts: { standard: 11, custom: 11, serie: 9, pushbuttons: 12, junctionbox: 5 }
};

const ProductsControlPanelsPhotos = ({ selectedType }) => (
  <PhotoGallerySlideShow basePath="photos/products/controlpanels" typeFolderMap={typeFolderMap} selectedType={selectedType} slidesPerView={2}/>
);

export default ProductsControlPanelsPhotos;

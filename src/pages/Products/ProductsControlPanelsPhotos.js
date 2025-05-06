// src/pages/Products/ProductsControlPanelsPhotos.js
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';

const typeFolderMap = {
  standard: 'standard',
  custom: 'custom',
  serie: 'serie',
  pushbuttons: 'pushbuttons',
  junctionbox: 'junctionbox',
  counts: { standard: 11, custom: 11, serie: 9, pushbuttons: 12, junctionbox: 5 }
};

const ProductsControlPanelsPhotos = ({ selectedType }) => (
  <PhotoGallery basePath="photos/products/controlpanels" typeFolderMap={typeFolderMap} selectedType={selectedType} />
);

export default ProductsControlPanelsPhotos;

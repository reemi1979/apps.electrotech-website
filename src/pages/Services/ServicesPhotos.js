// src/components/ServicesPhotos.js
import React from 'react';
import PhotoGallery from '../../components/PhotoGallery';

const typeFolderMap = {
  assy: 'assy',         // selectedType "standard" → dossier "assy"
  design: 'design',
  machine: 'machine',
  prog: 'prog',
  cnc: 'cnc',
  counts: {
    assy: 3,
    design: 3,
    machine: 3,
    prog: 2,
    cnc: 2
  }
};

const ServicesPhotos = ({ selectedType }) => {

  return(
    <PhotoGallery basePath="photos/services" typeFolderMap={typeFolderMap} selectedType={selectedType} />
  );
}

export default ServicesPhotos;

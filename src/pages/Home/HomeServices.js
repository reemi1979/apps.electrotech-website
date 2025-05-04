// src/Home/ServicesTypesHome.js

import React from 'react';
import ServicesTypes from '../Services/ServicesTypes';

// On passe des fonctions "vides" pour éviter les erreurs
const HomeServices = () => {
  return (
    <ServicesTypes
      selectedIndex={0}
      setSelectedIndex={() => {}}
      setSelected={() => {}}
    />
  );
};

export default HomeServices;

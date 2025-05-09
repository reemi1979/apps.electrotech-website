// src/Home/HomeServices.js
import React, { useState } from 'react';
import HomeServicesTypes from './HomeServicesTypes';


const HomeServices = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  return (
    <HomeServicesTypes
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      setSelected={setSelected}
    />
  );
};

export default HomeServices;

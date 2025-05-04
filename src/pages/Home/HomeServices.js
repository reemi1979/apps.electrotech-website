// src/Home/HomeServices.js
import React, { useState } from 'react';
import ServicesTypes from '../Services/ServicesTypes';

const HomeServices = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  return (
    <ServicesTypes
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      setSelected={setSelected}
    />
  );
};

export default HomeServices;

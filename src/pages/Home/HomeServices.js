// src/Home/HomeServices.js

import { useState } from 'react';
import HomeServicesTypes from './HomeServicesTypes';

const HomeServices = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selected, setSelected] = useState(null);

    return (
        <HomeServicesTypes
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        setSelected={setSelected}
        selected={selected}
        />
    );
};

export default HomeServices;

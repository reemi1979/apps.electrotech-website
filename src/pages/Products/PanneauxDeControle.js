import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import ProductHelmet from './ProductHelmet';

const PanneauxDeControle = () => {
  return (
    <>
      <ProductHelmet />

      <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
        <Typography variant="h2" gutterBottom>
          Fabrication de panneaux de contrôle industriel
        </Typography>

        <Typography variant="body1" paragraph>
          Depuis 1997, Électrotech conçoit et fabrique des panneaux de contrôle industriels adaptés aux besoins de l'industrie manufacturière, agroalimentaire, et de l'automatisation en général. Nos panneaux intègrent des automates programmables (PLC), des interfaces opérateurs (HMI), des dispositifs de sécurité et de communication modernes.
        </Typography>

        <Typography variant="body1" paragraph>
          Nous utilisons des composants de marques reconnues comme Allen-Bradley, Siemens, Schneider, IFM, Phoenix Contact et bien d'autres. Nos installations sont conçues selon les normes CSA, UL ou CE, selon vos besoins spécifiques.
        </Typography>

        <Typography variant="body1" paragraph>
          Grâce à notre expertise en électricité industrielle et à notre machine de perçage Rittal Perforex, nous offrons une précision et une rapidité inégalées. Tous nos panneaux sont testés rigoureusement avant livraison.
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          Pourquoi choisir Électrotech ?
        </Typography>

        <ul>
          <li><Typography variant="body1">Plus de 25 ans d'expérience</Typography></li>
          <li><Typography variant="body1">Conception et fabrication sur place à Granby</Typography></li>
          <li><Typography variant="body1">Équipe multidisciplinaire : ingénieurs, électriciens, programmeurs</Typography></li>
          <li><Typography variant="body1">Qualité certifiée et tests en atelier</Typography></li>
          <li><Typography variant="body1">Service clé en main : conception, fabrication, mise en service</Typography></li>
        </ul>
      </Container>
    </>
  );
};

export default PanneauxDeControle;
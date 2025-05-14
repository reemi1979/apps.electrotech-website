// src/pages/Quote/QuotePage.js
import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Helmet } from 'react-helmet';
import QuoteWizard from './QuoteWizard';
import QuoteManualForm from './QuoteManualForm';

export default function QuotePage() {
  const [mode, setMode] = useState('manual');
  const [manualData, setManualData] = useState({});

  return (
    <>
      <Helmet>
        <title>Demande de soumission – Électrotech Automatisation Industrielle</title>
        <meta
          name="description"
          content="Faites une demande de soumission pour vos projets d'automatisation et de panneaux de contrôle industriel avec Électrotech à Granby."
        />
        <link rel="canonical" href="https://www.electrotech.ca/quote" />
        <meta property="og:title" content="Demande de soumission – Électrotech" />
        <meta property="og:description" content="Soumettez votre projet d'automatisation industrielle à Électrotech. Fabrication de panneaux de contrôle sur mesure depuis 1997." />
        <meta property="og:url" content="https://www.electrotech.ca/quote" />
        <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Demande de soumission – Électrotech" />
        <meta name="twitter:description" content="Soumettez votre projet à Électrotech pour recevoir une soumission adaptée à vos besoins en automatisation industrielle." />
        <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
      </Helmet>

      <Box sx={{ mt: 10, px: 4, py: 4, minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom>
          Request a Quotation
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Choose your preferred method:
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, value) => value && setMode(value)}
            size="small"
          >
            <ToggleButton value="builder">Use Panel Builder</ToggleButton>
            <ToggleButton value="manual">Enter Details Manually</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {mode === 'builder' && <QuoteWizard />}
        {mode === 'manual' && <QuoteManualForm data={manualData} onChange={setManualData} />}
      </Box>
    </>
  );
}

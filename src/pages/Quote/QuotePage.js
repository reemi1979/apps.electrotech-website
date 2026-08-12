// src/pages/Quote/QuotePage.js
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import QuoteManualForm from './QuoteManualForm';



export default function QuotePage() {
  const [manualData, setManualData] = useState({});

  return (
    <>
      <Box sx={{ mt: 10, px: 4, py: 4, minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom>
          Request a Quotation
        </Typography>
        <QuoteManualForm data={manualData} onChange={setManualData} />
      </Box>
    </>
  );
}

// src/pages/Quote/QuotePage.js
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import SeoHelmet from '../../components/SeoHelmet';
import QuoteWizard from './QuoteWizard';
import QuoteManualForm from './QuoteManualForm';



export default function QuotePage() {
  const [mode, setMode] = useState('manual');
  const [manualData, setManualData] = useState({});

  return (
    <>
      <SeoHelmet />

      <Box sx={{ mt: 10, px: 4, py: 4, minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom>
          Request a Quotation
        </Typography>
{/* 
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
        </Box> */}

        {mode === 'builder' && <QuoteWizard />}
        {mode === 'manual' && <QuoteManualForm data={manualData} onChange={setManualData} />}
      </Box>
    </>
  );
}

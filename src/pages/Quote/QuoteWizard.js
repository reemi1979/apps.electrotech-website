// src/pages/Quote/QuoteWizard.js
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import QuoteStep from './QuoteStep';
import QuoteSummary from './QuoteSummary';
import { quoteSteps } from './quoteSteps';


export default function QuoteWizard() {
  const [activeStep, setActiveStep] = useState(() => {
    const savedStep = localStorage.getItem('quoteActiveStep');
    return savedStep !== null ? Number(savedStep) : 0;
  });

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('quoteFormData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    localStorage.setItem('quoteFormData', JSON.stringify(formData));
    localStorage.setItem('quoteActiveStep', String(activeStep));
  }, [formData, activeStep]);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, quoteSteps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const updateForm = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const clearForm = () => {
    localStorage.removeItem('quoteFormData');
    localStorage.removeItem('quoteActiveStep');
    setFormData({});
    setActiveStep(0);
  };

  const currentStep = quoteSteps[activeStep];

  return (
    <Grid container spacing={4} sx={{ width: '100%' }} alignItems="flex-start">
      <Grid item size={{ xs: 12, md: 8 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {quoteSteps.map((step, index) => (
            <Step key={index}>
              <StepLabel>{step.name}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <QuoteStep
          step={currentStep}
          data={formData[currentStep.name] || {}}
          onUpdate={(stepData) => updateForm(currentStep.name, stepData)}
        />

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" color="error" onClick={clearForm}>Clear All</Button>
            <Button variant="contained" onClick={handleNext}>
              {activeStep === quoteSteps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      </Grid>

      <Grid item size={{ xs: 12, md: 4 }}>
        <QuoteSummary data={formData} />
      </Grid>
    </Grid>
  );
}

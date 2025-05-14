// src/pages/Quote/QuoteManualForm.js
import React from 'react';
import { Box, TextField, Grid, Button, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuoteManualForm({ data, onChange }) {
  const handleFieldChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).filter(file =>
      ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'image/png', 'image/jpeg', 'image/jpg'].includes(file.type)
    );
    const currentFiles = data.files || [];
    onChange({ ...data, files: [...currentFiles, ...newFiles] });
  };

  const handleRemoveFile = (index) => {
    const updated = [...(data.files || [])];
    updated.splice(index, 1);
    onChange({ ...data, files: updated });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            label="Your Name"
            value={data.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            label="Email"
            value={data.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            label="Company"
            value={data.company || ''}
            onChange={(e) => handleFieldChange('company', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <TextField
            label="Phone"
            value={data.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <TextField
        label="Date you want the quotation"
        type="date"
        value={data.quoteDate || ''}
        onChange={(e) => handleFieldChange('quoteDate', e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
      />

      <TextField
        label="Details"
        value={data.details || ''}
        onChange={(e) => handleFieldChange('details', e.target.value)}
        multiline
        minRows={6}
        fullWidth
        sx={{ resize: 'vertical' }}
        InputProps={{
          sx: {
            textarea: {
              resize: 'vertical'
            }
          }
        }}
      />

      <Box>
        <Button variant="outlined" component="label">
          Upload Files (PDF, Excel, Images)
          <input
            type="file"
            accept=".pdf,.xls,.xlsx,image/*"
            hidden
            onChange={handleFileUpload}
          />
        </Button>
        <Box sx={{ mt: 1 }}>
          {data.files?.length > 0 && (
            <>
              <Typography variant="subtitle2">Uploaded Files:</Typography>
              <ul style={{ paddingLeft: '1rem', listStyle: 'none' }}>
                {data.files.map((file, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{file.name}</span>
                    <IconButton onClick={() => handleRemoveFile(i)} size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

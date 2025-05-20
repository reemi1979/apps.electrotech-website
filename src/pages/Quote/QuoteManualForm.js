// src/pages/Quote/QuoteManualForm.js
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

export default function QuoteManualForm({ data, onChange }) {
  const { t } = useTranslation('about');
  const [submitting, setSubmitting] = useState(false);

  const handleFieldChange = (key, value) => {
    onChange({ ...data, [key]: value });
  };

  const handleRemoveFile = (index) => {
    const updated = [...(data.files || [])];
    updated.splice(index, 1);
    onChange({ ...data, files: updated });
  };

  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png',
    'image/jpeg',
    'image/webp'
  ];

  const dangerousExtensions = ['exe', 'bat', 'sh', 'js', 'vbs', 'msi', 'cmd', 'com', 'scr'];
  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      const validType = allowedMimeTypes.includes(file.type) && !dangerousExtensions.includes(extension);
      const validSize = file.size <= maxFileSize;
      return validType && validSize;
    });

    const currentFiles = data.files || [];
    onChange({ ...data, files: [...currentFiles, ...newFiles] });
  };

  const prepareAttachments = async (files) => {
    const readFileAsBase64 = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, content: reader.result.split(',')[1] });
        reader.readAsDataURL(file);
      });

    return Promise.all(files.map(readFileAsBase64));
  };

  const handleSubmit = () => {
    if (submitting) return;

    setSubmitting(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LdtmzUrAAAAAIfQeyOHcZcCCaE2QrK16MmJcFQZ', { action: 'contact' }).then(async (token) => {
        const attachments = await prepareAttachments(data.files || []);
        
        const fullData = {
          reason: 'quotation',
          name: data.name || '',
          contact: data.email || data.contact || '', // fallback si un champ est renommé
          subject: 'Manual Quote Request',
          message: data.details || '',
          recaptcha: token,
          attachments
        };

        try {

          const res = await fetch(process.env.REACT_APP_CONTACT_POST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData),
          });

          const result = await res.json();
          console.log('API response:', result);


          if (res.ok) {
            alert(t('contact_us_success'));
            onChange({
              name: '', email: '', company: '', phone: '', quoteDate: '', details: '', files: []
            });
          } else {
            alert(t('contact_us_error'));
          }
        } catch (err) {
          alert(t('contact_us_error'));
        } finally {
          setSubmitting(false);
        }
      });
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{xs:12, md:6}}>
          <TextField
            label="Your Name"
            value={data.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
          <TextField
            label="Email"
            value={data.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid size={{xs:12, md:6}}>
          <TextField
            label="Company"
            value={data.company || ''}
            onChange={(e) => handleFieldChange('company', e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={{xs:12, md:6}}>
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
        slotProps={{ inputLabel: { shrink: true } }}
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
        slotProps={{
          input: {
            sx: {
              textarea: {
                resize: 'vertical'
              }
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

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting}
        sx={{ alignSelf: 'flex-start', mt: 2 }}
      >
        {submitting ? t('contact_us_sending') : t('contact_us_submit')}
      </Button>
    </Box>
  );
}

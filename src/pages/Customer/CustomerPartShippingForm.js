// src/pages/Shipping/CustomerPartShippingForm.js

import { useEffect, useState, useRef  } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export default function CustomerPartShippingForm() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const shippingId = params.get('id');
  const [orderNumber, setOrderNumber] = useState('');
  const [projectManager, setProjectManager] = useState('');
  const [invalidId, setInvalidId] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    deliveryMethod: '',
    deliveryDate: '',
    contentDescription: '',
    files: []
  });
  const [rows, setRows] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=6LdtmzUrAAAAAIfQeyOHcZcCCaE2QrK16MmJcFQZ';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!shippingId) return;

    fetch(`https://api.electrotech.ca/getDataProjectPartsProvidedByClients?id=${encodeURIComponent(shippingId)}`)
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          setInvalidId(true);
          return;
        }

        const initialized = data.map(row => ({ ...row, confirmed: true }));
        setRows(initialized);

        if (data[0]?.NoCommande) {
          setOrderNumber(data[0].NoCommande);
          setProjectManager(data[0].ChargeProjetElectrotech);
        }
      })
      .catch(() => setInvalidId(true));
  }, [shippingId]);

  if (invalidId) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" color="error" gutterBottom>
          {t('shipping_form_invalid_id_title')}
        </Typography>
        <Typography variant="body1">
          {t('shipping_form_invalid_id_message')}
        </Typography>
      </Box>
    );
  }


  const handleRowChange = (index, key, value) => {
    setRows(prev => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const handleRemoveRow = (index) => {
    setRows(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddRow = () => {
    setRows(prev => [...prev, {
      "No pièce": '',
      "Manufacturier": '',
      "description2": '',
      "Qté à commander": '',
      confirmed: true
    }]);
  };

  const allowedMimeTypes = [
    'application/pdf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/png', 'image/jpeg', 'image/webp'
  ];
  const dangerousExtensions = ['exe', 'bat', 'sh', 'js', 'vbs', 'msi', 'cmd', 'com', 'scr'];
  const maxFileSize = 20 * 1024 * 1024; // 20 MB

  const handleChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return allowedMimeTypes.includes(file.type) && !dangerousExtensions.includes(extension) && file.size <= maxFileSize;
    });
    setData(prev => ({ ...prev, files: [...(prev.files || []), ...newFiles] }));
  };

  const handleRemoveFile = (index) => {
    const updated = [...(data.files || [])];
    updated.splice(index, 1);
    setData(prev => ({ ...prev, files: updated }));
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

  if (!window.grecaptcha || !window.grecaptcha.ready) {
    alert(t('contact_us_error'));
    setSubmitting(false);
    return;
  }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LdtmzUrAAAAAIfQeyOHcZcCCaE2QrK16MmJcFQZ', { action: 'contact' }).then(async (token) => {
        const attachments = await prepareAttachments(data.files || []);
        const fullData = {
          reason: 'part-shipping',
          subject: `Shipping Confirmation for ${orderNumber}`,
          name: 'inconnu',
          contact: 'nomail@electrotech.ca',
          message: `Livré par: ${data.deliveryMethod}\nDate Livraison: ${data.deliveryDate}\nContenu: ${data.contentDescription}`,
          recaptcha: token,
          attachments,
          rows,
          projectManager
        };

        try {
          const res = await fetch(process.env.REACT_APP_CONTACT_POST_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData)
          });
          if (res.ok) {
            alert(t('contact_us_success'));
            setData({ name: '', email: '', deliveryMethod: '', deliveryDate: '', contentDescription: '', files: [] });
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

    <Box sx={{ m: 2, mt: 15, display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>{t('shipping_form_title')}</Typography>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>{t('shipping_form_intro')}</Typography>
        <Box sx={{ fontSize: '1.25rem', lineHeight: 1.8 }}>
          <ul style={{ marginLeft: 20 }}>
            <li>
              📦 {t('shipping_form_identification')} <strong style={{ color: '#b30000' }}>{orderNumber}</strong> {t('shipping_form_with_pm')} <strong style={{ color: '#b30000' }}>{projectManager}</strong> {t('shipping_form_on_label')}.
            </li>
            <li>{t('shipping_form_check_parts')}</li>
            <li>{t('shipping_form_package_organization')}</li>
          </ul>
        </Box>

      </Box>

      {rows.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{t('shipping_form_client_parts')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
  {/* En-têtes */}
  <Box
    sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      mb: 1,
      px: 0.5,
      flexDirection: { xs: 'column', sm: 'row' }
    }}
  >

    <Typography variant="body2" sx={{ width: { xs: '100%', sm: 200 }, fontWeight: 'bold' }}>
      {t('shipping_form_part_number')}
    </Typography>
    <Typography variant="body2" sx={{ width: { xs: '100%', sm: 120 }, fontWeight: 'bold' }}>
      {t('shipping_form_manufacturer')}
    </Typography>
    <Typography variant="body2" sx={{ width: { xs: '100%', sm: '100%' }, fontWeight: 'bold' }}>
      {t('shipping_form_description')}
    </Typography>
    <Typography variant="body2" sx={{ width: { xs: '100%', sm: 80 }, fontWeight: 'bold' }}>
      {t('shipping_form_quantity')}
    </Typography>


  </Box>

  {/* Lignes dynamiques */}
  {rows.map((row, i) => (
    <Box
      key={i}
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        mb: 1,
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <TextField
        size="small"
        sx={{ width: { xs: '100%', sm: 200 } }}
        value={row["No pièce"]}
        onChange={(e) => handleRowChange(i, "No pièce", e.target.value)}
      />
      <TextField
        size="small"
        sx={{ width: { xs: '100%', sm: 120 } }}
        value={row.Manufacturier}
        onChange={(e) => handleRowChange(i, "Manufacturier", e.target.value)}
      />
      <TextField
        size="small"
        sx={{ width: { xs: '100%', sm: '100%' } }}
        value={row.description2}
        onChange={(e) => handleRowChange(i, "description2", e.target.value)}
      />
      <TextField
        size="small"
        sx={{ width: { xs: '100%', sm: 80 } }}
        value={row["Qté à commander"] ?? ''}
        onChange={(e) => handleRowChange(i, "Qté à commander", e.target.value)}
      />
      <IconButton
        onClick={() => handleRemoveRow(i)}
        size="small"
        color="error"
        sx={{ alignSelf: { xs: 'flex-end', sm: 'center' } }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  ))}

  <Button variant="contained" onClick={handleAddRow} size="small">
    {t('shipping_form_add_row')}
  </Button>
</AccordionDetails>

        </Accordion>
      )}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField label={t('shipping_form_delivery_method')} value={data.deliveryMethod} onChange={(e) => handleChange('deliveryMethod', e.target.value)} fullWidth />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label={t('shipping_form_delivery_date')}
              type="date"
              inputRef={inputRef}
              value={data.deliveryDate}
              onChange={(e) => handleChange('deliveryDate', e.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              onClick={() => inputRef.current?.showPicker?.()}
            />
        </Grid>
      </Grid>

      <TextField
        label={t('shipping_form_content_description')}
        value={data.contentDescription}
        onChange={(e) => handleChange('contentDescription', e.target.value)}
        multiline
        minRows={5}
        fullWidth
        slotProps={{ input: { sx: { textarea: { resize: 'vertical' } } } }}
      />

      <Box>
        <Button variant="contained" component="label">
          {t('shipping_form_upload_button')}
          <input type="file" accept=".pdf,.xls,.xlsx,image/*" hidden onChange={handleFileUpload} />
        </Button>

        {data.files.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2">{t('shipping_form_uploaded_files')}</Typography>
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
          </Box>
        )}
      </Box>


      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={submitting}
        sx={{ alignSelf: 'flex-start', mt: 2 }}
      >
        {submitting ? t('shipping_form_sending') : t('shipping_form_submit')}
      </Button>
    </Box>
  );
}

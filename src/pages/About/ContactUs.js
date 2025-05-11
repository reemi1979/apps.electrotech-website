import React, { useState } from 'react';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import validator from 'validator';

const ContactUs = () => {
  const { t } = useTranslation('about');

  const [formData, setFormData] = useState({
    reason: '',
    name: '',
    contact: '',
    company: '',
    title: '',
    country: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    setErrors({ ...errors, [field]: '' }); // clear error on edit
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.reason) newErrors.reason = t('contact_us_required');
    if (!formData.name) newErrors.name = t('contact_us_required');
    if (!formData.contact || (!validator.isEmail(formData.contact) && !validator.isMobilePhone(formData.contact, 'any')))
      newErrors.contact = t('contact_us_invalid_contact');
    if (!formData.subject) newErrors.subject = t('contact_us_required');
    if (!formData.message) newErrors.message = t('contact_us_required');
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!window.grecaptcha) {
      alert(t('contact_us_error'));
      return;
    }

    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LdtmzUrAAAAAIfQeyOHcZcCCaE2QrK16MmJcFQZ', { action: 'contact' }).then(async (token) => {
        const fullData = { ...formData, recaptcha: token };

        try {
          const res = await fetch('https://api.electrotech.ca/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData),
          });

          if (res.ok) {
            alert(t('contact_us_success'));
            setFormData({
              reason: '', name: '', contact: '', company: '',
              title: '', country: '', subject: '', message: ''
            });
            setErrors({});
          } else {
            alert(t('contact_us_error'));
          }
        } catch (err) {
          alert(t('contact_us_error'));
        }
      });
    });
  };

  return (
    <Box sx={{ maxWidth: 600, mt: 10, mx: 'auto', p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>{t('contact_us_title')}</Typography>

      <TextField
        select fullWidth label={t('contact_us_reason')}
        value={formData.reason} onChange={handleChange('reason')}
        error={!!errors.reason} helperText={errors.reason} sx={{ mb: 2 }}
      >
        <MenuItem value="quotation">{t('contact_us_reason_quotation')}</MenuItem>
        <MenuItem value="job">{t('contact_us_reason_job')}</MenuItem>
        <MenuItem value="question">{t('contact_us_reason_question')}</MenuItem>
        <MenuItem value="bug">{t('contact_us_reason_bug')}</MenuItem>
        <MenuItem value="other">{t('contact_us_reason_other')}</MenuItem>
      </TextField>

      <TextField fullWidth label={t('contact_us_name')} value={formData.name}
        onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} sx={{ mb: 2 }} />

      <TextField fullWidth label={t('contact_us_contact')} value={formData.contact}
        onChange={handleChange('contact')} error={!!errors.contact} helperText={errors.contact} sx={{ mb: 2 }} />

      <TextField fullWidth label={t('contact_us_company')} value={formData.company}
        onChange={handleChange('company')} sx={{ mb: 2 }} />

      <TextField fullWidth label={t('contact_us_function')} value={formData.title}
        onChange={handleChange('title')} sx={{ mb: 2 }} />

      <TextField fullWidth label={t('contact_us_country')} value={formData.country}
        onChange={handleChange('country')} sx={{ mb: 2 }} />

      <TextField fullWidth label={t('contact_us_subject')} value={formData.subject}
        onChange={handleChange('subject')} error={!!errors.subject} helperText={errors.subject} sx={{ mb: 2 }} />

      <TextField fullWidth multiline rows={5} label={t('contact_us_message')}
        value={formData.message} onChange={handleChange('message')}
        error={!!errors.message} helperText={errors.message} sx={{ mb: 3 }} />

      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        {t('contact_us_send')}
      </Button>
    </Box>
  );
};

export default ContactUs;

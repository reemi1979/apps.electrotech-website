import { useState } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography, Container } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import validator from 'validator';

const ContactUs = () => {
  const { t } = useTranslation('about');
  const [formData, setFormData] = useState({
    reason: '', name: '', contact: '', company: '',
    title: '', country: '', subject: '', message: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
    setErrors({ ...errors, [field]: '' });
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
    <>
      <Helmet>
        <title>Contact – Électrotech Automatisation Industrielle</title>
        <meta
          name="description"
          content="Contactez Électrotech à Granby pour toute demande d'information, soumission ou collaboration. Nous sommes spécialistes en automatisation industrielle."
        />
        <link rel="canonical" href="https://www.electrotech.ca/contact-us" />
        <meta property="og:title" content="Contact – Électrotech Automatisation Industrielle" />
        <meta property="og:description" content="Prenez contact avec Électrotech pour vos projets de panneaux de contrôle, services ou demandes de soumission." />
        <meta property="og:url" content="https://www.electrotech.ca/contact-us" />
        <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="4066793063644485" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact – Électrotech Automatisation Industrielle" />
        <meta name="twitter:description" content="Faites une demande ou posez vos questions à Électrotech via notre formulaire de contact." />
        <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
      </Helmet>

      <Box sx={{ position: 'relative' }}>
        <Container maxWidth={false} sx={{ maxWidth: '1280px', mx: 'auto', mt: 10, px: 2 }}>
          <Grid container spacing={2}>
            {/* LEFT COLUMN */}
            <Box sx={{ maxWidth: 600, mx: 'auto', px: 2 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {t('contact_us_company_name')}
                </Typography>

                <Typography sx={{ whiteSpace: 'pre-line', mb: 3 }}>
                  {t('contact_us_address') + '\n\n' + t('contact_us_hours')}
                </Typography>

                <Box sx={{ height: { xs: 250, md: 530 } }}>
                  <iframe
                    title="Google Map"
                    width="100%"
                    style={{ border: 0, height: '100%' }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.1490664346265!2d-72.7279568237042!3d45.39018473927337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9ce4918ab93f1%3A0x5a408fc39d8aeeb9!2s625%20Rue%20Simonds%20S%2C%20Granby%2C%20QC%20J2J%201C2!5e0!3m2!1sfr!2sca!4v1715443842952!5m2!1sfr!2sca"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Grid>
            </Box>

            {/* RIGHT COLUMN */}
            <Box sx={{ maxWidth: 600, mx: 'auto', px: 2 }}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                  {t('contact_us_title')}
                </Typography>

                <TextField select fullWidth label={t('contact_us_reason')}
                  value={formData.reason} onChange={handleChange('reason')}
                  error={!!errors.reason} helperText={errors.reason} sx={{ mb: 2 }}>
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

                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mb: 10 }}>
                  {t('contact_us_send')}
                </Button>
              </Grid>
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default ContactUs;

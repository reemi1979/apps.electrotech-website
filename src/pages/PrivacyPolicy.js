// src/pages/PrivacyPolicy.js

import React from 'react'
import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const PrivacyPolicy = () => {
  const { t } = useTranslation('policy');
  const theme = useTheme();

  return (
    <Container maxWidth="md" sx={{ mt:8, py: 4, color: theme.palette.text.primary }}>
      <Typography variant="h4" gutterBottom>
        {t('privacy_title')}
      </Typography>

      <Typography variant="h6" paragraph>
        {t('privacy_intro')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('privacy_types_title')}
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        <li>
          <Typography variant="h6"><strong>{t('privacy_type_necessary_title')}</strong> : {t('privacy_type_necessary')}</Typography>
        </li>
        <li>
          <Typography variant="h6"><strong>{t('privacy_type_functional_title')}</strong> : {t('privacy_type_functional')}</Typography>
        </li>
        <li>
          <Typography variant="h6"><strong>{t('privacy_type_analytics_title')}</strong> : {t('privacy_type_analytics')}</Typography>
        </li>
        <li>
          <Typography variant="h6"><strong>{t('privacy_type_ads_title')}</strong> : {t('privacy_type_ads')}</Typography>
        </li>
      </Box>
h6h6
      <Typography variant="h6" paragraph>
        {t('privacy_change_preferences')}
      </Typography>

      <Typography variant="h6" paragraph>
        {t('privacy_contact_intro')}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
        {t('privacy_rp_title')}
      </Typography>

      <Typography variant="h6" paragraph>
        {t('privacy_rp_intro1')}
      </Typography>

      <Typography variant="h6" paragraph>
        {t('privacy_rp_intro2')}
      </Typography>F

      <Typography variant="h6" gutterBottom>
        {t('privacy_rp_collect_title')}
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li>
          <Typography variant="h6">{t('privacy_rp_collect_emploi')}</Typography>
        </li>
        <li>
          <Typography variant="h6">{t('privacy_rp_collect_email')}</Typography>
        </li>
      </Box>

      <Typography variant="h6" gutterBottom>
        {t('privacy_rp_usage_title')}
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li><Typography variant="h6">{t('privacy_rp_usage_identify')}</Typography></li>
        <li><Typography variant="h6">{t('privacy_rp_usage_dossier')}</Typography></li>
        <li><Typography variant="h6">{t('privacy_rp_usage_legal')}</Typography></li>
      </Box>

      <Typography variant="h6" paragraph>
        {t('privacy_rp_limit')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('privacy_rp_retention_title')}
      </Typography>
      <Typography variant="h6" paragraph>
        {t('privacy_rp_retention')}
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('privacy_rp_responsable_title')}
      </Typography>
      <Typography variant="h6" paragraph>
        Isabelle Guay, directrice générale<br />
        iguay@electrotech.ca<br />
        450 776-2628<br />
        625, Simonds Sud, Granby, Québec, Canada, J2J 1C2
      </Typography>

      <Typography variant="h6" gutterBottom>
        {t('privacy_rp_rights_title')}
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li><Typography variant="h6">{t('privacy_rp_rights_consult')}</Typography></li>
        <li><Typography variant="h6">{t('privacy_rp_rights_exact')}</Typography></li>
        <li><Typography variant="h6">{t('privacy_rp_rights_correction')}</Typography></li>
      </Box>

      <Typography variant="h6" paragraph>
        {t('privacy_rp_rights_contact')}
      </Typography>

      <Typography variant="body2" sx={{ mt: 3 }}>
        {t('privacy_update')}
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
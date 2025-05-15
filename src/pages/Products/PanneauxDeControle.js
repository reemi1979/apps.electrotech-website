import { Typography, Container } from '@mui/material';
import SeoHelmet from '../../components/SeoHelmet';
import { useTranslation } from 'react-i18next';

const PanneauxDeControle = () => {

  const { t } = useTranslation('products');

  return (
    <>
      <SeoHelmet />

      <Container maxWidth="md" sx={{ mt: 10, mb: 10 }}>
        <Typography variant="h2" gutterBottom>
          {t('panneaux.heading')}
        </Typography>

        <Typography variant="body1" paragraph>
          {t('panneaux.para1')}
        </Typography>

        <Typography variant="body1" paragraph>
          {t('panneaux.para2')}
        </Typography>

        <Typography variant="body1" paragraph>
          {t('panneaux.para3')}
        </Typography>

        <Typography variant="h4" gutterBottom sx={{ mt: 6 }}>
          {t('panneaux.whyTitle')}
        </Typography>

        <ul>
          <li><Typography variant="body1">{t('panneaux.point1')}</Typography></li>
          <li><Typography variant="body1">{t('panneaux.point2')}</Typography></li>
          <li><Typography variant="body1">{t('panneaux.point3')}</Typography></li>
          <li><Typography variant="body1">{t('panneaux.point4')}</Typography></li>
          <li><Typography variant="body1">{t('panneaux.point5')}</Typography></li>
        </ul>
      </Container>
      
    </>
  );
};

export default PanneauxDeControle;
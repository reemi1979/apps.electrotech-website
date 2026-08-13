import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const TrackingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('id');
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!trackingId) {
      setProjects([]);
      setLoadError(false);
      return;
    }

    let active = true;
    fetch(`https://api.electrotech.ca/getDataProject?id=${encodeURIComponent(trackingId)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Tracking request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!active) return;
        setProjects(Array.isArray(data) ? data : []);
        setLoadError(false);
      })
      .catch(() => {
        if (!active) return;
        setProjects([]);
        setLoadError(true);
      });

    return () => { active = false; };
  }, [trackingId]);

  const getStepsForProject = (project) => {
    const panelCount = project.panels || 1;
    const cncPercent = project.cnc
      ? ((project.cnc.backplate / panelCount) + (project.cnc.panel / panelCount)) / 2
      : 0;
    const testPercent = project.test?.completed
      ? 1
      : Math.min((project.test?.qtytested || 0) / panelCount, 0.9);
    const prodPercent = project.prod?.completed
      ? 1
      : Math.min((project.prod?.proddone || 0) / (project.prod?.prodplan || 1), 0.9);

    return [
      { label: t('tracking_step_received'), value: true },
      { label: t('tracking_step_confirmed'), value: true },
      { label: t('tracking_step_orders_sent'), value: project.orders?.sent },
      { label: `${t('tracking_step_orders')} (${Math.round(Math.min(project.orders?.received || 0, 1) * 100)}%)`, value: (project.orders?.received || 0) >= 1 },
      ...(project.cnc?.cncplan > 0 ? [{ label: `${t('tracking_step_cnc_completed')} (${Math.round(Math.min(cncPercent, 1) * 100)}%)`, value: project.cnc.completed }] : []),
      { label: `${t('tracking_step_production')} (${Math.round(prodPercent * 100)}%)`, optional: project.state?.quaranteen ? <Typography variant="caption" color="error">{t('tracking_step_error_alert')}</Typography> : undefined, value: project.prod?.completed, error: project.state?.quaranteen },
      { label: `${t('tracking_step_tests')} (${Math.round(testPercent * 100)}%)`, optional: project.test?.qtytested === panelCount && !project.test?.completed ? <Typography variant="caption" color="error">{t('tracking_step_error_alert')}</Typography> : undefined, value: project.test?.completed, error: project.test?.qtytested === panelCount && !project.test?.completed },
      { label: t('tracking_step_shipped'), value: project.shipping?.shipped },
    ];
  };

  const renderResults = () => (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 6 }}>
        {t('tracking_for')}
      </Typography>
      {projects.map((project, index) => (
        <Box key={project.project || index} sx={{ mb: 6 }}>
          {project.title && <Typography variant="h5" sx={{ mb: 2 }}>{project.title}</Typography>}
          {projects.length > 1 && <Typography variant="subtitle1" sx={{ mb: 1 }}>{project.project}</Typography>}
          <Stepper alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
            {getStepsForProject(project).map((step, stepIndex) => (
              <Step key={stepIndex} completed={Boolean(step.value)}>
                <StepLabel optional={step.optional} error={step.error}>{step.label}</StepLabel>
                {isMobile && <Typography color={step.value ? 'green' : 'grey'}>{step.value ? 'Completed' : 'In Progress'}</Typography>}
              </Step>
            ))}
          </Stepper>
        </Box>
      ))}
    </>
  );

  return (
    <Box id="section1" sx={{ position: 'relative', zIndex: 0, minHeight: '100vh', pb: 10 }}>
      <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
        <Box p={4}>
          <Typography variant="h3" sx={{ color: theme.palette.text.secondary, mb: 2 }}>{t('tracking_title')}</Typography>
          {!trackingId ? (
            <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', color: theme.palette.text.primary }}>{t('tracking_link_required')}</Typography>
          ) : loadError || projects.length === 0 ? (
            <Typography variant="h6">{t('tracking_invalid_link')}</Typography>
          ) : renderResults()}
        </Box>
      </Container>
    </Box>
  );
};

export default TrackingProjects;

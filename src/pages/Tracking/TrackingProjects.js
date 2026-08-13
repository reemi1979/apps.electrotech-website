import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

const TrackingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', contact: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [submittingContact, setSubmittingContact] = useState(false);
  const [searchParams] = useSearchParams();
  const trackingId = searchParams.get('id');
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const trackingContactUrl = process.env.REACT_APP_CONTACT_POST_URL
    ? new URL('/tracking-contact', process.env.REACT_APP_CONTACT_POST_URL).toString()
    : '';

  const formatLastUpdate = (lastUpdate) => {
    if (!lastUpdate) return '';
    const date = new Date(lastUpdate);
    return Number.isNaN(date.getTime()) ? String(lastUpdate) : date.toLocaleString();
  };

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

  useEffect(() => {
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.querySelector('script[data-recaptcha="tracking-contact"]')) return undefined;

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = 'tracking-contact';
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  const submitTrackingContact = () => {
    if (submittingContact || !contactForm.name.trim() || !contactForm.contact.trim() || !contactForm.message.trim()) {
      setContactStatus('validation');
      return;
    }
    if (!trackingContactUrl || !process.env.REACT_APP_RECAPTCHA_SITE_KEY || !window.grecaptcha) {
      setContactStatus('error');
      return;
    }

    setSubmittingContact(true);
    setContactStatus('');
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'tracking_contact' }).then(async (recaptcha) => {
        try {
          const response = await fetch(trackingContactUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trackingId, ...contactForm, recaptcha })
          });
          if (!response.ok) throw new Error('Tracking contact request failed.');
          setContactForm({ name: '', contact: '', message: '' });
          setContactStatus('success');
        } catch {
          setContactStatus('error');
        } finally {
          setSubmittingContact(false);
        }
      }).catch(() => {
        setContactStatus('error');
        setSubmittingContact(false);
      });
    });
  };

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
      <Box sx={{ maxWidth: 720, mx: 'auto', mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{projects[0]?.clientName || t('tracking_client_placeholder')}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => { setContactStatus(''); setContactOpen(true); }}>
          {t('tracking_contact_manager', { name: projects[0]?.projectManager || t('tracking_project_manager_placeholder') })}
        </Button>
      </Box>
      {projects.map((project, index) => (
        <Accordion key={project.project || index} defaultExpanded={projects.length === 1} sx={{ maxWidth: 1100, mx: 'auto', mb: 2, textAlign: 'left', borderRadius: 2, overflow: 'hidden' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: { xs: 2, sm: 4 } }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h6">
                {project.project} - {project.title || t('tracking_title_placeholder')} - {project.panelQuantity ?? 0} x
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ px: { xs: 2, sm: 4 }, pb: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography color="text.secondary"><strong>{t('tracking_last_update')}:</strong> {project.lastUpdate ? formatLastUpdate(project.lastUpdate) : t('tracking_last_update_placeholder')}</Typography>
            </Box>
            <Stepper alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
              {getStepsForProject(project).map((step, stepIndex) => (
                <Step key={stepIndex} completed={Boolean(step.value)}>
                  <StepLabel optional={step.optional} error={step.error}>{step.label}</StepLabel>
                  {isMobile && <Typography color={step.value ? 'green' : 'grey'}>{step.value ? 'Completed' : 'In Progress'}</Typography>}
                </Step>
              ))}
            </Stepper>
          </AccordionDetails>
        </Accordion>
      ))}
      <Dialog open={contactOpen} onClose={() => !submittingContact && setContactOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{t('tracking_contact_manager', { name: projects[0]?.projectManager || t('tracking_project_manager_placeholder') })}</DialogTitle>
        <DialogContent>
          <TextField autoFocus fullWidth required margin="dense" label={t('tracking_contact_name')} value={contactForm.name} onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })} />
          <TextField fullWidth required margin="dense" label={t('tracking_contact_details')} value={contactForm.contact} onChange={(event) => setContactForm({ ...contactForm, contact: event.target.value })} />
          <TextField fullWidth required multiline minRows={5} margin="dense" label={t('tracking_contact_message')} value={contactForm.message} onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })} />
          {contactStatus === 'validation' && <Typography color="error" sx={{ mt: 2 }}>{t('tracking_contact_validation')}</Typography>}
          {contactStatus === 'error' && <Typography color="error" sx={{ mt: 2 }}>{t('tracking_contact_error')}</Typography>}
          {contactStatus === 'success' && <Typography color="success.main" sx={{ mt: 2 }}>{t('tracking_contact_success')}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button disabled={submittingContact} onClick={() => setContactOpen(false)}>{t('tracking_contact_cancel')}</Button>
          <Button variant="contained" disabled={submittingContact || contactStatus === 'success'} onClick={submitTrackingContact}>{t('tracking_contact_send')}</Button>
        </DialogActions>
      </Dialog>
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

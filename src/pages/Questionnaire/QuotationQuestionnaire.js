import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const sections = [
  { title: '1. Général', fields: [
    { label: 'Type de panneau à fabriquer', options: ['Centre de contrôle moteur', 'Distribution', 'Boîte à bouton', 'Automatisation / Contrôle', 'Remote I/O', 'Autre'] },
    { label: 'Quantité de panneaux identiques', type: 'text' },
    { label: 'Type d’installation', options: ['Intérieur', 'Extérieur'] },
    { label: 'Type de montage', options: ['Mural', 'Autoportant (Floormount)', 'Console opérateur', 'Autre'] },
    { label: 'Type de réseau ou communication', options: ['Ethernet/IP', 'Profinet', 'EtherCAT', 'Bacnet', 'Modbus/TCP', 'Autre'] },
    { label: 'Commutateur réseau requis (géré/non géré, nombre de ports)', type: 'long' },
    { label: 'Passe-câble RJ45 ou prise de service en façade', type: 'long' },
    { label: 'Lumière pour le cabinet requise', options: ['Oui', 'Non'] },
    { label: 'Prise de service DIN à l’intérieur du cabinet', options: ['Oui', 'Non'] },
    { label: 'Manufacturier à privilégier pour les composantes', type: 'long' }
  ] },
  { title: '2. Données électriques principales', fields: [
    { label: 'Tension et courant nominal du panneau', options: ['600V', '480V', '120/208V', '24Vdc', 'Autre'] },
    { label: 'kA requis de protection (SCCR)', type: 'text' },
    { label: 'Tension de contrôle', type: 'text' }
  ] },
  { title: '3. Dessin électrique EPLAN', fields: [
    { label: 'Standards de dessin ou gabarits souhaités', type: 'long' },
    { label: 'Exigences de câblage spécifiques', type: 'long' },
    { label: 'Représentation des composantes de champ requise', options: ['Oui', 'Non'] },
    { label: 'Plan 3D du cabinet requis', options: ['Oui', 'Non'] }
  ] },
  { title: '4. Protection et puissance', fields: [
    { label: 'Type de sectionneur', options: ['Fusible', 'Non-fusible DIN', 'Non-fusible sur porte', 'Autre'] },
    { label: 'Protection contre les surtensions / foudre requise', options: ['Oui', 'Non'] },
    { label: 'Liste des moteurs (HP et fonctionnement : drive, softstart ou contacteur)', type: 'long' },
    { label: 'Composants à intégrer ou privilégier', type: 'long' },
    { label: 'Autres informations pour la sélection des composantes de puissance', type: 'long' }
  ] },
  { title: '5. Sécurité machine', fields: [
    { label: 'Boucle de sécurité E-stop requise', options: ['Oui', 'Non'] },
    { label: 'Interlock de porte', options: ['Oui', 'Non'] },
    { label: 'Monitoring de vitesse zéro (Zero Speed switch)', options: ['Oui', 'Non'] },
    { label: 'Niveau de sécurité requis', type: 'text' },
    { label: 'Autres éléments de sécurité pertinents', type: 'long' }
  ] },
  { title: '6. Normes et certifications', fields: [
    { label: 'Normes requises', options: ['CSA', 'UL', 'IEC', 'Autre'] },
    { label: 'Précisions sur les normes', type: 'long' }
  ] },
  { title: '7. Environnement d’installation', fields: [
    { label: 'Température ambiante minimale', type: 'text' },
    { label: 'Température ambiante maximale', type: 'text' },
    { label: 'NEMA requis', options: ['NEMA 1', 'NEMA 12', 'NEMA 3R', 'NEMA 4', 'NEMA 4X', 'Inconnu - besoin de support'] },
    { label: 'Environnement particulier', options: ['Alimentaire', 'Washdown', 'Humidité élevée', 'Produits chimiques', 'Zone poussiéreuse', 'Autre'] },
    { label: 'Précisions sur l’environnement', type: 'long' }
  ] },
  { title: 'Questions logistiques et administratives', fields: [
    { label: 'Exigences d’emballage ou de transport', type: 'long' },
    { label: 'Budget prévu pour le projet', type: 'text' },
    { label: 'Cahier des charges ou spécification technique disponible', type: 'long' },
    { label: 'Responsable technique ou contact projet', type: 'long' }
  ] }
];

const fieldId = (sectionIndex, fieldIndex) => sectionIndex + '-' + fieldIndex;

const QuotationQuestionnaire = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [request, setRequest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [status, setStatus] = useState('loading');
  const [submitting, setSubmitting] = useState(false);
  const apiBase = useMemo(() => process.env.REACT_APP_CONTACT_POST_URL ? new URL('/', process.env.REACT_APP_CONTACT_POST_URL).toString() : '', []);

  useEffect(() => {
    if (!id || !apiBase) { setStatus('invalid'); return; }
    fetch(new URL('getQuestionnaire?id=' + encodeURIComponent(id), apiBase))
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => { setRequest(data); setStatus('ready'); })
      .catch(() => setStatus('invalid'));
  }, [apiBase, id]);

  useEffect(() => {
    const key = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    if (!key || document.querySelector('script[data-recaptcha="questionnaire"]')) return undefined;
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=' + key;
    script.async = true;
    script.defer = true;
    script.dataset.recaptcha = 'questionnaire';
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  const setValue = (key, value) => setAnswers((current) => ({ ...current, [key]: value }));
  const toggleOption = (key, option) => {
    const values = answers[key] || [];
    setValue(key, values.includes(option) ? values.filter((value) => value !== option) : [...values, option]);
  };

  const submit = () => {
    if (submitting || !window.grecaptcha || !process.env.REACT_APP_RECAPTCHA_SITE_KEY) { setStatus('error'); return; }
    setSubmitting(true);
    window.grecaptcha.ready(() => window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'quotation_questionnaire' }).then(async (recaptcha) => {
      try {
        const payload = sections.flatMap((section, sectionIndex) => section.fields.map((field, fieldIndex) => {
          const value = answers[fieldId(sectionIndex, fieldIndex)];
          return { section: section.title, label: field.label, value: Array.isArray(value) ? value.join(', ') : value || '' };
        })).filter((answer) => answer.value);
        const response = await fetch(new URL('submitQuestionnaire', apiBase), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, answers: payload, recaptcha }) });
        if (!response.ok) throw new Error();
        setStatus('success');
      } catch { setStatus('error'); } finally { setSubmitting(false); }
    }).catch(() => { setStatus('error'); setSubmitting(false); }));
  };

  if (status === 'loading') return <Container sx={{ py: 16, textAlign: 'center' }}><Typography>Chargement du questionnaire…</Typography></Container>;
  if (status === 'invalid') return <Container sx={{ py: 16, textAlign: 'center' }}><Typography variant="h5">Ce lien de questionnaire est invalide ou expiré.</Typography></Container>;
  if (status === 'success') return <Container sx={{ py: 16, textAlign: 'center' }}><Typography variant="h4">Merci.</Typography><Typography sx={{ mt: 2 }}>Votre questionnaire a été transmis à votre chargé de projet Electrotech.</Typography></Container>;

  return <Container maxWidth="md" sx={{ py: { xs: 12, md: 16 }, pb: 10 }}>
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 5 }, borderRadius: 3 }}>
      <Typography variant="h3" textAlign="center">Questionnaire de projet</Typography>
      <Typography variant="h6" textAlign="center" sx={{ mt: 2 }}>{request.clientName}</Typography>
      <Typography textAlign="center">{request.quotationNumber} — {request.quotationTitle}</Typography>
      <Typography textAlign="center" color="text.secondary" sx={{ mt: 2 }}>Veuillez répondre aux éléments applicables à votre projet.</Typography>
      <Box sx={{ mt: 4 }}>
        {sections.map((section, sectionIndex) => <Box key={section.title} sx={{ mb: 5 }}>
          <Typography variant="h5" sx={{ borderBottom: 2, borderColor: 'primary.main', pb: 1, mb: 2 }}>{section.title}</Typography>
          {section.fields.map((field, fieldIndex) => {
            const key = fieldId(sectionIndex, fieldIndex);
            return <Box key={key} sx={{ mb: 3 }}>
              {field.options ? <><Typography sx={{ fontWeight: 600, mb: 1 }}>{field.label}</Typography><FormGroup row>{field.options.map((option) => <FormControlLabel key={option} label={option} control={<Checkbox checked={(answers[key] || []).includes(option)} onChange={() => toggleOption(key, option)} />} />)}</FormGroup></> : <TextField fullWidth multiline={field.type === 'long'} minRows={field.type === 'long' ? 3 : undefined} label={field.label} value={answers[key] || ''} onChange={(event) => setValue(key, event.target.value)} />}
            </Box>;
          })}
        </Box>)}
      </Box>
      <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}><Typography>Si vous souhaitez transmettre des documents, veuillez les envoyer directement à votre contact chez Electrotech.</Typography></Paper>
      {status === 'error' && <Typography color="error" sx={{ mb: 2 }}>Impossible d’envoyer le questionnaire. Veuillez réessayer.</Typography>}
      <Box textAlign="center"><Button size="large" variant="contained" disabled={submitting} onClick={submit}>Envoyer le questionnaire</Button></Box>
    </Paper>
  </Container>;
};

export default QuotationQuestionnaire;

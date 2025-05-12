// src/pages/Tracking/TrackingProjects.js

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, TextField, Stepper, Step, StepLabel, StepContent, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

const TrackingProjects = () => {

    const [token, setToken] = useState(null);
    const [apiProjectData, setApiProjectData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const { projectNumber } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // replaces isMobile from react-device-detect

    useEffect(() => {
        if (token) fetchProjectData(token);
    }, [token]);

    useEffect(() => {
        async function fetchToken() {
            try {
                const response = await fetch('https://api.electrotech.ca/get-token');
                const data = await response.json();
                if (data.token) setToken(data.token);
                else console.error('Token not received:', data);
            } catch (error) {
                console.error('Token error:', error);
            }
        }
        fetchToken();
    }, []);

    const fetchProjectData = (authToken) => {
        fetch("https://api.electrotech.ca/getDataProject", {
            method: "GET",
            headers: { "Authorization": `Bearer ${authToken}` }
        })
            .then(res => {
                if (!res.ok) throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                console.log("📦 Données projet reçues :", data);
                setApiProjectData(data);
            })
            .catch(err => {
                console.error("❌ Erreur API (projet) :", err);
            });
    };

    const selectedProject = apiProjectData.find(p => p.project === projectNumber);

    const handleSearch = () => {
        if (searchInput.trim() !== '') navigate(`/tracking/${searchInput.trim()}`);
    };


    const panelCount = selectedProject?.panels || 1; // évite div/0

    const cncPercent = selectedProject?.cnc
    ? ((selectedProject.cnc.backplate / panelCount) + (selectedProject.cnc.panel / panelCount)) / 2
    : 0;
    
    const cncPercentClamped = Math.min(cncPercent, 1);

    let testPercent = 0;
    if (selectedProject) {
    const rawPercent = (selectedProject.test?.qtytested || 0) / (selectedProject.panels || 1);
    if (selectedProject.test?.completed) {
        testPercent = 1; // Force 100% if completed
    } else {
        testPercent = Math.min(rawPercent, 0.90); // Clamp to max 90% if not completed
    }
    }    

    let prodPercent = 0;
    if (selectedProject) {
    const rawPercent = (selectedProject.prod.proddone || 0) / (selectedProject.prod.prodplan || 1);
    if (selectedProject.prod.completed) {
        prodPercent = 1; // Force 100% if completed
    } else {
        prodPercent = Math.min(rawPercent, 0.9); // Clamp to max 90% if not completed
    }
    }
    

    const steps = selectedProject ? [
        { label: t('tracking_step_received'), value: true },
        { label: t('tracking_step_confirmed'), value: true },
        { label: t('tracking_step_orders_sent'), value: selectedProject.orders.sent },
        {
            label: `${t('tracking_step_orders')} (${Math.round(Math.min(selectedProject.orders.received, 1) * 100)}%)`,
            value: selectedProject.orders.received >= 1
        },
        ...(selectedProject.cnc.cncplan > 0 ? [
            {
                label: `${t('tracking_step_cnc_completed')} (${Math.round(cncPercentClamped * 100)}%)`,
                value: selectedProject.cnc.completed
            }
        ] : []),
        {
            label: `${t('tracking_step_production')} (${Math.round(prodPercent * 100)}%)`,
            optional: selectedProject.state?.quaranteen
            ? <Typography variant="caption" color="error">{t('tracking_step_error_alert')}</Typography>
            : undefined,
            value: selectedProject.prod.completed,
            error: selectedProject.state?.quaranteen
        },
        {
            label: `${t('tracking_step_tests')} (${Math.round(testPercent * 100)}%)`,
            optional:
            selectedProject.test?.qtytested === selectedProject.panels &&
            !selectedProject.test?.completed ? (
                <Typography variant="caption" color="error">
                {t('tracking_step_error_alert')}
                </Typography>
            ) : undefined,
            value: selectedProject.test.completed,
            error:
            selectedProject.test?.qtytested === selectedProject.panels &&
            !selectedProject.test?.completed
        },
        { label: t('tracking_step_shipped'), value: selectedProject.shipping.shipped }
    ] : [];
        
    

    const renderSearch = () => (
        <>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            {t('tracking_textfield_directive')}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
            label={t('tracking_textfield')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            variant="outlined"
            sx={{
                width: '200px',
                '& .MuiOutlinedInput-root': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                },
            }}
            />
            <Button
            onClick={handleSearch}
            variant="contained"
            sx={{
                height: '56px',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                minWidth: '80px'
            }}
            >
            {t('tracking_search_button')}
            </Button>
        </Box>
        </>
    );
    
    

    const renderNoResults = () => (
        <>
            <Typography variant="h6">{t('tracking_no_result')} {projectNumber}</Typography>
        </>
    );

    const renderResults = () => (
        <>

            <Typography variant="h5" gutterBottom sx={{ mb:6 }} > 
                {t('tracking_for')} {projectNumber}
            </Typography>

            <Stepper alternativeLabel={!isMobile} orientation={isMobile ? 'vertical' : 'horizontal'}>
                {steps.map((step, index) => (
                    <Step key={index} completed={!!step.value}>
                    <StepLabel
                        optional={step.optional}
                        error={step.error}
                    >
                        {step.label}
                    </StepLabel>
                    {isMobile && (
                        <Typography color={step.value ? 'green' : 'grey'}>
                        {step.value ? 'Completed' : 'In Progress'}
                        </Typography>
                    )}
                    </Step>
                ))}
            </Stepper>
        </>
    );

    return (
        <Box id="section1" sx={{ position: 'relative', zIndex: 0, height: '90vh' }}>
            <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
                <Box p={4}>

                    <Typography variant="h3" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                        {t('tracking_title')}
                    </Typography>

                    <Typography variant="h6" sx={{ mb: 10, maxWidth: 800, mx: 'auto', color: theme.palette.text.primary }}>
                        {t('tracking_title_description')}
                    </Typography>

                    {!projectNumber ? renderSearch() :
                        !selectedProject ? renderNoResults() :
                            renderResults()}
                </Box>
            </Container>
        </Box>
    );
};

export default TrackingProjects;

// src/pages/Tracking/TrackingProjects.js

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import SeoHelmet from '../../components/SeoHelmet';

const TrackingProjects = () => {
    const [token, setToken] = useState(null);
    const [apiProjectData, setApiProjectData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const { projectNumber } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                setApiProjectData(data);
            })
            .catch(err => {
                console.error("❌ Erreur API (projet) :", err);
            });
    };

    const isLotNumber = projectNumber?.startsWith('L');
    const selectedProjects = isLotNumber
        ? apiProjectData.filter(p => p.nolot === projectNumber)
        : [apiProjectData.find(p => p.project === projectNumber)].filter(Boolean);

    const handleSearch = () => {
        if (searchInput.trim() !== '') navigate(`/tracking/${searchInput.trim()}`);
    };

    const getStepsForProject = (project) => {
        const panelCount = project.panels || 1;
        const cncPercent = project.cnc
            ? ((project.cnc.backplate / panelCount) + (project.cnc.panel / panelCount)) / 2
            : 0;
        const cncPercentClamped = Math.min(cncPercent, 1);

        let testPercent = 0;
        if (project) {
            const rawPercent = (project.test?.qtytested || 0) / panelCount;
            testPercent = project.test?.completed ? 1 : Math.min(rawPercent, 0.90);
        }

        let prodPercent = 0;
        if (project) {
            const rawPercent = (project.prod.proddone || 0) / (project.prod.prodplan || 1);
            prodPercent = project.prod.completed ? 1 : Math.min(rawPercent, 0.9);
        }

        return [
            { label: t('tracking_step_received'), value: true },
            { label: t('tracking_step_confirmed'), value: true },
            { label: t('tracking_step_orders_sent'), value: project.orders.sent },
            {
                label: `${t('tracking_step_orders')} (${Math.round(Math.min(project.orders.received, 1) * 100)}%)`,
                value: project.orders.received >= 1
            },
            ...(project.cnc.cncplan > 0 ? [{
                label: `${t('tracking_step_cnc_completed')} (${Math.round(cncPercentClamped * 100)}%)`,
                value: project.cnc.completed
            }] : []),
            {
                label: `${t('tracking_step_production')} (${Math.round(prodPercent * 100)}%)`,
                optional: project.state?.quaranteen
                    ? <Typography variant="caption" color="error">{t('tracking_step_error_alert')}</Typography>
                    : undefined,
                value: project.prod.completed,
                error: project.state?.quaranteen
            },
            {
                label: `${t('tracking_step_tests')} (${Math.round(testPercent * 100)}%)`,
                optional:
                    project.test?.qtytested === panelCount && !project.test?.completed ? (
                        <Typography variant="caption" color="error">
                            {t('tracking_step_error_alert')}
                        </Typography>
                    ) : undefined,
                value: project.test?.completed,
                error:
                    project.test?.qtytested === panelCount && !project.test?.completed
            },
            { label: t('tracking_step_shipped'), value: project.shipping.shipped }
        ];
    };

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
        <Typography variant="h6">{t('tracking_no_result')} {projectNumber}</Typography>
    );

    const renderResults = () => (
        <>
            <Typography variant="h5" gutterBottom sx={{ mb: 6 }}>
                {t('tracking_for')} {projectNumber}
            </Typography>

            {selectedProjects.map((proj, idx) => {
                const steps = getStepsForProject(proj);
                return (
                    <Box key={idx} sx={{ mb: 6 }}>
                        {isLotNumber && (
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                {proj.project}
                            </Typography>
                        )}
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
                    </Box>
                );
            })}
        </>
    );

    return (
        <>
            <SeoHelmet />
            <Box id="section1" sx={{ position: 'relative', zIndex: 0, minHeight: '100vh', pb: 10 }}>
                <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
                    <Box p={4}>
                        <Typography variant="h3" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
                            {t('tracking_title')}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 10, maxWidth: 800, mx: 'auto', color: theme.palette.text.primary }}>
                            {t('tracking_title_description')}
                        </Typography>

                        {!projectNumber ? renderSearch() :
                            selectedProjects.length === 0 ? renderNoResults() :
                                renderResults()}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default TrackingProjects;

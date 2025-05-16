// src/components/Footer.js

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

import ThemeToggleButton from './ThemeToggleButton';


const Footer = ({ toggleBackground, backgroundEnabled }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                textAlign: 'center',
                py: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
            }}
        >
            
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Électrotech Automatisation Industrielle
            </Typography>

            <Typography variant="body2" sx={{ mt: 0.5 }}>
                625 Simonds Sud, Granby, Québec, Canada, J2J 1C2
            </Typography>

            {/* Réseaux sociaux */}
            <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
                <IconButton
                    component="a"
                    href="https://www.facebook.com/ElectrotechAutomatisationIndustrielle"
                    target="_blank"
                    rel="noopener"
                    aria-label="Facebook"
                    color="inherit"
                >
                <FacebookIcon />
                </IconButton>
                <IconButton
                    component="a"
                    href="https://ca.linkedin.com/company/electrotech-ca"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                    color="inherit"
                >
                <LinkedInIcon />
                </IconButton>
            </Stack>

            {/* Bouton Nous contacter */}
            <Box sx={{ mt: 1.5 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component={Link}
                    to="/contact-us"
                >
                    {t('footer_contact_us', 'Nous contacter')}
                </Button>
            </Box>

            {/* Politique de confidentialité */}
            <Box sx={{ mt: 1 }}>
                <MuiLink component={Link} to="/privacy-policy" underline="hover" color="inherit">
                    {t('footer_privacy_policy', 'Politique de confidentialité')}
                </MuiLink>
            </Box>

            {/* Boutons background et theme */}
            <Box sx={{ mt: 1 }}>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={toggleBackground}
                    sx={{ mr: 1 }}
                >
                    {backgroundEnabled ? t('footer_hide_background', 'Cacher fond') : t('footer_show_background', 'Afficher fond')}
                </Button>

                <ThemeToggleButton />
                
            </Box>

            {/* Droits réservés */}
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            © {new Date().getFullYear()} Electrotech Automatisation Industrielle – {t('footer_rights')}
            
            </Typography>

<MuiLink
  component={Link}
  to="/panneaux-de-controle"
  underline="hover"
  sx={{ color: theme.palette.text.primary }}
>
  Panneaux de contrôle
</MuiLink>

            <Typography variant="caption" sx={{ display: 'block' }}>
            <Trans
                i18nKey="footer_recaptcha_notice"
                components={{
                    privacy: <MuiLink href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" underline="hover" />,
                    terms: <MuiLink href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" underline="hover" />
                }}
            />
            </Typography>

        </Box>
    );
};

export default Footer;

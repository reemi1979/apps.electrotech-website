// src/components/SeoHelmet.js
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/* -------------------------------------------------- */
/* Table SEO – titres + descriptions uniques          */
/* -------------------------------------------------- */
const seoByPath = {
  /* ---------- FR : Panneaux de contrôle ---------- */
  '/panneau-de-controle': {
    title: 'Panneaux de contrôle industriels | Électrotech',
    description:
      'Conception et fabrication de panneaux de contrôle sur mesure, certifiés CSA et UL, pour vos systèmes d’automatisation.',
  },
  '/panneau-de-controle-industriel': {
    title: 'Panneau de contrôle industriel | Fabricant québécois',
    description:
      'Électrotech assemble et câble des panneaux de contrôle industriels prêts à l’emploi pour la production automatisée.',
  },
  '/boitier-de-controle': {
    title: 'Boîtier de contrôle sur mesure | Électrotech',
    description:
      'Boîtiers de contrôle robustes et fiables, adaptés à vos besoins d’automatisation industrielle.',
  },
  '/boitier-electrique': {
    title: 'Boîtier électrique industriel | Conception personnalisée',
    description:
      'Boîtiers électriques certifiés pour la protection de vos équipements et composants d’automatisation.',
  },
  '/coffret-de-controle': {
    title: 'Coffret de contrôle industriel | Électrotech',
    description:
      'Coffrets de contrôle pour lignes de production et automatisation, conçus et câblés au Québec.',
  },
  '/coffret-electrique': {
    title: 'Coffret électrique sur mesure | Fabrication rapide',
    description:
      'Coffrets électriques adaptés à vos environnements industriels et aux normes nord-américaines.',
  },
  '/fabricant-de-panneaux': {
    title: 'Fabricant de panneaux de contrôle | Service clé en main',
    description:
      'De la conception à l’assemblage, Électrotech est votre fabricant de panneaux de contrôle industriels.',
  },
  '/integration-de-panneaux': {
    title: 'Intégration de panneaux de contrôle | Électrotech',
    description:
      'Intégration complète de vos panneaux de contrôle dans vos installations industrielles.',
  },
  '/assemblage-de-panneaux': {
    title: 'Assemblage de panneaux industriels | Production rapide',
    description:
      'Assemblage et câblage de panneaux industriels dans notre atelier certifié UL/CSA.',
  },
  '/boites-a-boutons': {
    title: 'Boîtes à boutons sur mesure | Électrotech',
    description:
      'Boîtes à boutons robustes pour commandes locales sur machines et lignes de production.',
  },

  /* ---------- EN : Control panels ---------- */
  '/control-panel': {
    title: 'Industrial Control Panels | Electrotech Automation',
    description:
      'Custom-built industrial control panels, CSA/UL certified, for machinery and automation systems.',
  },
  '/industrial-control-panel': {
    title: 'Industrial Control Panel Manufacturer | Electrotech',
    description:
      'Complete design, wiring and testing of industrial control panels for North American standards.',
  },
  '/electrical-enclosure': {
    title: 'Electrical Enclosures | Custom Industrial Cabinets',
    description:
      'Protective electrical enclosures designed for harsh industrial environments.',
  },
  '/industrial-enclosure': {
    title: 'Industrial Enclosures | Rugged & Custom-Built',
    description:
      'Industrial enclosures for control hardware, PLCs and power distribution components.',
  },
  '/custom-control-panels': {
    title: 'Custom Control Panels | Turn-key Solutions',
    description:
      'Tailor-made control panels engineered to fit your automation requirements.',
  },
  '/panel-builder': {
    title: 'Panel Builder Services | Electrotech',
    description:
      'From schematic to assembly, complete panel-builder services for OEMs and integrators.',
  },
  '/push-button-boxes': {
    title: 'Push-Button Stations & Boxes | Electrotech',
    description:
      'Durable push-button boxes for machine controls and plant-floor operations.',
  },
  '/ul508a-panels': {
    title: 'UL 508A Control Panels | Certified Manufacturing',
    description:
      'UL 508A certified control panels for the U.S. market, built and tested in our facility.',
  },
  '/control-panel-manufacturer': {
    title: 'Control Panel Manufacturer | CSA & UL Certified',
    description:
      'Electrotech designs and manufactures control panels that meet CSA and UL standards.',
  },

  /* ---------- FR : Automatisation & PLC ---------- */
  '/automatisation': {
    title: 'Automatisation industrielle | Solutions complètes',
    description:
      'Services d’automatisation clé en main : conception, PLC, robotisation et intégration.',
  },
  '/automatisation-industrielle': {
    title: 'Automatisation industrielle | Améliorez votre production',
    description:
      'Optimisez vos lignes de production grâce à nos solutions d’automatisation sur mesure.',
  },
  '/programmation-automate': {
    title: 'Programmation d’automate PLC | Mise en service',
    description:
      'Programmation et dépannage d’automates Allen-Bradley, Siemens, Schneider et autres.',
  },
  '/automate-programmable': {
    title: 'Automate programmable (PLC) | Expertise Électrotech',
    description:
      'Configuration et support d’automates programmables pour vos processus industriels.',
  },
  '/robotisation': {
    title: 'Robotisation de production | Intégration robotique',
    description:
      'Intégration de solutions robotiques pour accroître la productivité et la qualité.',
  },

  /* ---------- EN : Automation & PLC ---------- */
  '/automation': {
    title: 'Industrial Automation | Turn-key Integration',
    description:
      'Custom automation solutions, PLC programming and robotics for manufacturing.',
  },
  '/industrial-automation': {
    title: 'Industrial Automation Systems | Electrotech',
    description:
      'Design and integration of industrial automation systems to boost efficiency.',
  },
  '/plc-programming': {
    title: 'PLC Programming Services | Allen-Bradley, Siemens, Schneider',
    description:
      'Professional PLC programming, troubleshooting and commissioning for all major brands.',
  },
  '/automated-system': {
    title: 'Automated Systems | Design & Integration',
    description:
      'End-to-end design of automated systems to streamline your production lines.',
  },
  '/custom-automation': {
    title: 'Custom Automation Solutions | Electrotech',
    description:
      'Tailored automation that fits your unique manufacturing challenges.',
  },
  '/automated-control': {
    title: 'Automated Control Systems | Engineering & Support',
    description:
      'Complete automated control systems, from concept to start-up.',
  },

  /* ---------- FR : Conception & câblage ---------- */
  '/conception-electrique': {
    title: 'Conception électrique industrielle | Dessins & schémas',
    description:
      'Plans et schémas électriques détaillés pour vos projets d’automatisation.',
  },
  '/plan-electrique': {
    title: 'Plan électrique industriel | Services de dessin CAD',
    description:
      'Plans électriques certifiés pour la fabrication de vos panneaux et installations.',
  },
  '/schema-electrique': {
    title: 'Schéma électrique | Documentation CEI & CSA',
    description:
      'Schémas électriques normalisés pour la fabrication et la maintenance.',
  },
  '/dessin-electrique': {
    title: 'Dessin électrique CAD | Électrotech',
    description:
      'Dessin industriel et mise à jour de schémas électriques existants.',
  },
  '/cablage-industriel': {
    title: 'Câblage industriel | Installation & mise en service',
    description:
      'Câblage d’armoires électriques et d’équipements en usine par des techniciens certifiés.',
  },
  '/cablage-de-panneau': {
    title: 'Câblage de panneau de contrôle | Service rapide',
    description:
      'Câblage complet de vos panneaux de contrôle selon les normes UL/CSA.',
  },
  '/installation-electrique-industrielle': {
    title: 'Installation électrique industrielle | Électrotech',
    description:
      'Installation et raccordement de systèmes électriques industriels clé en main.',
  },
  '/integration-electrique': {
    title: 'Intégration électrique | Automatisation & contrôle',
    description:
      'Intégration électrique et mise en réseau de vos équipements de production.',
  },

  /* ---------- EN : Electrical design & wiring ---------- */
  '/electrical-design': {
    title: 'Electrical Design Services | Industrial Schematics',
    description:
      'Complete electrical design and CAD drawings for control panels and automation systems.',
  },
  '/electrical-drawing': {
    title: 'Electrical Drawings & Schematics | CSA/UL Standards',
    description:
      'Detailed electrical schematics compliant with North American standards.',
  },
  '/industrial-wiring': {
    title: 'Industrial Wiring & Installation | Electrotech',
    description:
      'Professional industrial wiring, panel wiring and plant-floor installation services.',
  },
  '/panel-wiring': {
    title: 'Panel Wiring Services | Quick Turnaround',
    description:
      'High-quality panel wiring performed by certified electricians.',
  },
  '/electrical-installation': {
    title: 'Electrical Installation | Industrial Facilities',
    description:
      'Turn-key electrical installation for manufacturing plants and process industries.',
  },
  '/electrical-integration': {
    title: 'Electrical Integration | Automation & Control',
    description:
      'Electrical integration of machinery, robotics and control systems for seamless production.',
  },
};

/* -------------------------------------------------- */
/* Component                                          */
/* -------------------------------------------------- */
export default function SeoHelmet() {
  const location = useLocation();
  const { t, i18n } = useTranslation('seo');

  /* ----- Path & canonical handling ---------------- */
  const raw = location.pathname.replace(/\/$/, '');
  const hasLang = raw.startsWith('/fr') || raw.startsWith('/en');
  const short = hasLang ? raw.replace(/^\/(fr|en)/, '') || '/' : raw || '/';
  const canonical = `https://www.electrotech.ca${short === '/' ? '' : short}`;

  /* ----- SEO data (table > i18n fallback) --------- */
  const custom = seoByPath[short.toLowerCase()] || {};
  const title = custom.title || t(`pages.${short}.title`, t('defaultTitle'));
  const desc = custom.description || t(`pages.${short}.description`, t('defaultDescription'));

  /* ----- hreflang URLs ---------------------------- */
  const hrefFr = `https://www.electrotech.ca${short}`;
  const hrefEn = `https://www.electrotech.ca/en${short === '/' ? '' : short}`;

  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="fr-CA" href={hrefFr} />
      <link rel="alternate" hrefLang="en-CA" href={hrefEn} />
      <link rel="alternate" hrefLang="x-default" href="https://www.electrotech.ca/" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={i18n.language === 'en' ? 'en_CA' : 'fr_CA'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Électrotech Automatisation Industrielle',
          url: 'https://www.electrotech.ca',
          logo: 'https://www.electrotech.ca/photos/og-thumbnail.jpg',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-450-776-2628',
            contactType: 'Customer Service',
            areaServed: 'CA',
            availableLanguage: ['French', 'English'],
          },
          sameAs: [
            'https://www.facebook.com/ElectrotechAutomatisationIndustrielle',
            'https://ca.linkedin.com/company/electrotech-ca',
          ],
        })}
      </script>

      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: 'https://www.electrotech.ca',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.electrotech.ca/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        })}
      </script>
    </Helmet>
  );
}

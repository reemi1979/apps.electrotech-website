import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


// const seoMap = {
//   '/': {
//     title: 'Électrotech – Panneaux de contrôle et automatisation à Granby',
//     description: 'Fabricant de panneaux électriques industriels depuis 1997. Automatisation, qualité et performance.',
//   },
//   '/news': {
//     title: 'Nouvelles et actualités | Électrotech',
//     description: 'Restez informé des dernières nouvelles, projets et innovations d’Électrotech.',
//   },
//   '/services': {
//     title: 'Nos services industriels | Électrotech',
//     description: 'De la conception électrique à l’assemblage, découvrez l’étendue de nos services en automatisation.',
//   },
//   '/quality': {
//     title: 'Contrôle de qualité | Électrotech',
//     description: 'Nos processus rigoureux de contrôle assurent des produits fiables, sécuritaires et certifiés.',
//   },
//   '/privacy-policy': {
//     title: 'Politique de confidentialité | Électrotech',
//     description: 'Découvrez comment nous protégeons vos données personnelles conformément aux normes.',
//   },
//   '/products-control-panels': {
//     title: 'Panneaux de contrôle industriels | Électrotech',
//     description: 'Panneaux électriques certifiés, conçus pour vos besoins en automatisation industrielle.',
//   },
//   '/products-cables': {
//     title: 'Câbles et harnais | Électrotech',
//     description: 'Fabrication de câbles, harnais et connecteurs pour applications industrielles.',
//   },
//   '/products-lines': {
//     title: 'Lignes automatisées | Électrotech',
//     description: 'Lignes de production optimisées pour l’efficacité et la performance industrielle.',
//   },
//   '/services/assemblage-de-boitiers': {
//     title: 'Assemblage de boîtiers de contrôle | Électrotech',
//     description: 'Assemblage professionnel de boîtiers électriques avec rigueur et précision.',
//   },
//   '/services/programmation': {
//     title: 'Programmation PLC & HMI | Électrotech',
//     description: 'Programmation d’automates et interfaces pour vos processus industriels.',
//   },
//   '/services/percage-cabinet': {
//     title: 'Perçage de cabinets électriques | Électrotech',
//     description: 'Service de perçage précis avec la technologie Rittal Perforex.',
//   },
//   '/services/assemblage-machine': {
//     title: 'Assemblage de machines | Électrotech',
//     description: 'Intégration et assemblage mécanique de vos équipements industriels.',
//   },
//   '/services/conception-électrique': {
//     title: 'Conception électrique industrielle | Électrotech',
//     description: 'Conception de schémas électriques selon vos besoins et normes CSA/UL.',
//   },
//   '/achievements': {
//     title: 'Réalisations | Électrotech',
//     description: 'Découvrez nos projets marquants en automatisation industrielle.',
//   },
//   '/jobs': {
//     title: 'Emplois disponibles | Électrotech',
//     description: 'Joignez une équipe dynamique en ingénierie, production ou automatisation.',
//   },
//   '/boites-a-boutons': {
//   title: 'Boîtes à boutons industrielles | Électrotech',
//   description: 'Boîtes à boutons robustes et ergonomiques pour environnements industriels exigeants.',
//   },
//   '/tracking': {
//     title: 'Suivi de production en temps réel | Électrotech',
//     description: 'Consultez l’état de vos projets de fabrication en direct grâce à notre outil de suivi de production.',
//   },
//   '/products-markers': {
//   title: 'Marqueurs industriels | Électrotech',
//   description: 'Solutions de marquage industriel : fils, plaques gravées, composantes et plus.',
//   },
//   '/contact-us': {
//   title: 'Contactez-nous | Électrotech',
//   description: 'Besoin d’une soumission ou d’un renseignement ? Contactez notre équipe dès maintenant.',
//   },
//   '/quote': {
//     title: 'Demande de soumission | Électrotech',
//     description: 'Soumettez votre projet de panneau de contrôle ou d’automatisation et recevez une évaluation rapidement.',
//   },
// };

const SeoHelmet = () => {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation('seo');

  const canonicalUrl = `https://www.electrotech.ca${pathname.endsWith('/') ? pathname : pathname + '/'}`;
  const lang = i18n.language === 'en' ? 'en_CA' : 'fr_CA';

  const rawPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  const currentPath = rawPath.replace(/^\/(en|fr)/, '') || '/';

  const title = t(`pages.${currentPath}.title`, t('defaultTitle'));
  const description = t(`pages.${currentPath}.description`, t('defaultDescription'));


  return (
    <Helmet htmlAttributes={{ lang: i18n.language }}>

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang} />
      <meta property="fb:app_id" content="4066793063644485" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Électrotech Automatisation Industrielle",
          "url": "https://www.electrotech.ca",
          "logo": "https://www.electrotech.ca/photos/og-thumbnail.jpg",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-450-776-2628",
            "contactType": "Customer Service",
            "areaServed": "CA",
            "availableLanguage": ["French", "English"]
          },
          "sameAs": [
            "https://www.facebook.com/ElectrotechAutomatisationIndustrielle",
            "https://ca.linkedin.com/company/electrotech-ca"
          ]
        }
        `}
      </script>

      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://www.electrotech.ca",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.electrotech.ca/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
        `}
      </script>
    </Helmet>
  );
};

export default SeoHelmet;

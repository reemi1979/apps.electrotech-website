import { Helmet } from 'react-helmet';

const HomeHelmet = () => (
  <Helmet>
    <title>Électrotech – Panneaux de contrôle et automatisation à Granby</title>
    <meta
      name="description"
      content="Électrotech est un leader en fabrication de panneaux de contrôle électrique à Granby. Spécialiste en automatisation industrielle depuis 1997."
    />
    <link rel="canonical" href="https://www.electrotech.ca/" />
    <meta property="og:title" content="Électrotech – Automatisation et panneaux de contrôle industriel" />
    <meta property="og:description" content="Fabricant de panneaux de contrôle électrique à Granby. Solutions complètes en automatisation industrielle depuis plus de 25 ans." />
    <meta property="og:url" content="https://www.electrotech.ca/" />
    <meta property="og:image" content="https://www.electrotech.ca/photos/og-thumbnail.jpg" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_CA" />
    <meta property="fb:app_id" content="4066793063644485" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Électrotech – Automatisation et panneaux de contrôle industriel" />
    <meta name="twitter:description" content="Découvrez nos services d'ingénierie et de fabrication de panneaux électriques sur mesure à Granby." />
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

export default HomeHelmet;

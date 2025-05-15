// src/components/ProductHelmet.js

import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const ProductHelmet = () => {
  const { pathname } = useLocation();

  const map = {
    '/products-control-panels': {
      title: 'Panneaux de contrôle industriels – Fabrication sur mesure à Granby',
      description: "Conception et fabrication de panneaux de contrôle à Granby. Électrotech est votre partenaire en automatisation industrielle depuis 1997.",
      schemaName: "Panneau de contrôle industriel",
      schemaDescription: "Panneaux de contrôle sur mesure conçus à Granby pour l'automatisation industrielle."
    },
    '/products-cables': {
      title: 'Câbles et harnais industriels – Production à la demande à Granby',
      description: "Fabrication de câbles, fils et harnais sur mesure pour l'industrie. Assemblage de qualité par Électrotech à Granby.",
      schemaName: "Câbles industriels",
      schemaDescription: "Câbles et harnais assemblés sur mesure pour applications industrielles."
    },
    '/products-markers': {
      title: 'Marqueurs industriels – Plaques, étiquettes, composantes',
      description: "Étiquetage industriel, gravure, identifications et plaques signalétiques. Électrotech fabrique vos marqueurs techniques à Granby.",
      schemaName: "Marqueurs industriels",
      schemaDescription: "Plaques, gravures et étiquetage industriel pour composants électriques et panneaux."
    },
    '/products-lines': {
      title: 'Lignes de production – Intégration automatisée par Électrotech',
      description: "Intégration de lignes automatisées et cellules robotisées. Solutions clé en main pour l’industrie manufacturière.",
      schemaName: "Ligne de production automatisée",
      schemaDescription: "Conception de lignes automatisées sur mesure pour l'industrie manufacturière."
    }
  };

  const data = map[pathname] || {
    title: 'Produits industriels – Électrotech',
    description: "Découvrez nos produits industriels conçus à Granby : panneaux de contrôle, câblage, étiquetage et lignes de production.",
    schemaName: 'Produits industriels',
    schemaDescription: "Produits industriels sur mesure fabriqués au Québec par Électrotech."
  };

  const url = `https://www.electrotech.ca${pathname}`;
  const image = 'https://www.electrotech.ca/photos/og-thumbnail.jpg';

  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={data.title} />
      <meta property="og:description" content={data.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_CA" />
      <meta property="fb:app_id" content="4066793063644485" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.schemaName,
          brand: 'Électrotech',
          description: data.schemaDescription,
          image,
          url
        })}
      </script>
    </Helmet>
  );
};

export default ProductHelmet;

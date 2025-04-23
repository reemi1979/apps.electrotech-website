// src/pages/PrivacyPolicy.js

import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, color: 'white' }}>
      <Typography variant="h4" gutterBottom>
        Politique de confidentialité
      </Typography>

      <Typography variant="body1" paragraph>
        Ce site Web utilise des fichiers témoins (cookies) pour améliorer votre expérience de navigation, afficher des contenus personnalisés et recueillir des statistiques sur l'utilisation du site.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Types de cookies utilisés
      </Typography>

      <Box component="ul" sx={{ pl: 2 }}>
        <li>
          <Typography variant="body1"><strong>Nécessaires</strong> : Essentiels pour le fonctionnement du site (ex. navigation, sécurité).</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Fonctionnels</strong> : Permettent des fonctionnalités comme le partage sur les réseaux sociaux.</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Analytiques</strong> : Utilisés pour analyser la fréquentation du site et améliorer le contenu.</Typography>
        </li>
        <li>
          <Typography variant="body1"><strong>Publicité</strong> : Servent à afficher des publicités personnalisées en fonction de votre activité.</Typography>
        </li>
      </Box>

      <Typography variant="body1" paragraph>
        Vous pouvez à tout moment modifier vos préférences en matière de cookies en cliquant sur le bouton « Personnaliser les cookies » ou en supprimant les fichiers témoins de votre navigateur.
      </Typography>

      <Typography variant="body1" paragraph>
        Pour toute question concernant la protection des données personnelles, veuillez nous contacter via le formulaire de contact du site.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
        Politique sur la protection des renseignements personnels
      </Typography>

      <Typography variant="body1" paragraph>
        Dans le cadre de nos activités, Électrotech Automatisation Industrielle recueille et utilise des renseignements personnels à différents niveaux et auprès de différents acteurs. En tant qu’organisation privée, Électrotech est assujettie à la Loi sur la protection des renseignements personnels dans le secteur privé. L’entreprise est donc responsable d’assurer sa conformité à l’égard de cette obligation.
      </Typography>

      <Typography variant="body1" paragraph>
        La présente politique a pour but de vous aider à comprendre nos pratiques en matière de cueillette, d’utilisation, de divulgation et de conservation des renseignements personnels.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Quand recueillons-nous des renseignements personnels et quels sont-ils ?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li>
          <Typography variant="body1">Quand vous postulez pour un emploi au sein de notre entreprise : cela implique habituellement de fournir un CV et une lettre de motivation qui peuvent contenir votre nom, adresse, numéro de téléphone, courriel et d’autres renseignements personnels.</Typography>
        </li>
        <li>
          <Typography variant="body1">Lorsque vous nous contactez par courriel : nous recueillons votre adresse courriel et les informations que vous indiquez.</Typography>
        </li>
      </Box>

      <Typography variant="h6" gutterBottom>
        Pour quelle utilisation recueillons-nous des renseignements personnels et à qui les partageons-nous ?
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li><Typography variant="body1">Identifier une personne notamment dans le processus d’embauche (vérifier que le profil correspond, vérifier les antécédents, communiquer et embaucher, le cas échéant);</Typography></li>
        <li><Typography variant="body1">Créer un dossier employé;</Typography></li>
        <li><Typography variant="body1">Se conformer aux exigences légales (impôts, CNESST, etc.);</Typography></li>
      </Box>

      <Typography variant="body1" paragraph>
        Nous limitons la collecte, l'utilisation et la divulgation de vos renseignements personnels uniquement aux fins que nous vous avons indiquées. Vos renseignements personnels ne peuvent être consultés que par nos employés autorisés, et ce, uniquement dans le cadre des tâches qui leur sont attribuées.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Pendant combien de temps conservons-nous les renseignements personnels ?
      </Typography>
      <Typography variant="body1" paragraph>
        Nous conservons vos renseignements personnels que pour la durée nécessaire aux fins pour lesquelles ils ont été recueillis. Une fois les objectifs atteints, nous mettons en œuvre des moyens raisonnables pour détruire vos renseignements personnels et en assurer la confidentialité jusqu'à la fin.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Responsable de la protection des renseignements personnels
      </Typography>
      <Typography variant="body1" paragraph>
        Isabelle Guay, directrice générale<br />
        iguay@electrotech.ca<br />
        450 776-2628<br />
        625, Simonds Sud, Granby, Québec, Canada, J2J 1C2
      </Typography>

      <Typography variant="h6" gutterBottom>
        Vos droits
      </Typography>
      <Box component="ul" sx={{ pl: 2 }}>
        <li><Typography variant="body1">Vous pouvez demander à consulter les informations personnelles que nous détenons sur vous.</Typography></li>
        <li><Typography variant="body1">Nous devons nous assurer que les renseignements que nous détenons sur vous sont exacts et à jour.</Typography></li>
        <li><Typography variant="body1">Vous pouvez demander la correction de vos renseignements personnels s’ils sont erronés ou dépassés.</Typography></li>
      </Box>

      <Typography variant="body1" paragraph>
        Pour toute question ou préoccupation, communiquez avec la personne responsable aux coordonnées ci-dessus.
      </Typography>

      <Typography variant="body2" sx={{ mt: 3 }}>
        Mise à jour : 31 août 2024. Cette politique est révisée annuellement et à chaque modification légale importante.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
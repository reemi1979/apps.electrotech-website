# Formulaires du nouveau site

Le nouveau site peut envoyer les formulaires à l'API Electrotech. Les courriels
seront expédiés par notre compte Mailjet. Aucune clé Mailjet n'est requise.

## Endpoint

```text
POST https://api.example.com/contact
Content-Type: application/json
```

## Contact

```json
{
  "reason": "contact",
  "name": "Marie Tremblay",
  "contact": "marie@example.com",
  "company": "Exemple Inc.",
  "subject": "Question générale",
  "message": "Bonjour, j'aimerais obtenir plus d'information.",
  "recaptcha": "TOKEN_GENERATED_BY_RECAPTCHA"
}
```

## Soumission

```json
{
  "reason": "quotation",
  "name": "Alex Martin",
  "contact": "alex@example.com",
  "company": "Entreprise Démo",
  "subject": "Demande de soumission",
  "message": "Veuillez préparer une estimation.",
  "recaptcha": "TOKEN_GENERATED_BY_RECAPTCHA"
}
```

## CAPTCHA requis

L'API exige un jeton **Google reCAPTCHA v3** dans le champ `recaptcha`. Sans
jeton valide, elle retourne `403` et n'envoie aucun courriel.

Le développeur doit intégrer le reCAPTCHA existant dans le formulaire, générer
un jeton lors de chaque soumission et l'envoyer dans `recaptcha`.

Electrotech fournira seulement la clé de site publique, par exemple :

```js
grecaptcha.execute('PUBLIC_SITE_KEY_PROVIDED_BY_ELECTROTECH', {
  action: 'contact'
});
```

La clé publique peut être transmise par courriel. La clé secrète reste privée
et n'est jamais requise par le développeur du site.

Si des pièces jointes sont nécessaires pour les soumissions, en discuter avec
Electrotech avant l'intégration.


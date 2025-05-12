
POUR POUSSER UN UPDATE DANS AWS :

Optionel (Recommandé):
  1. git add *
  2. git commit -m "update"
  3. git push origin master

Requis: 
  1. deploy-to-s3.bat (Ce scrit fait les commandes suivantes)
    A) npm run build
    B) npm run obfuscate
    C) aws s3 sync build/ s3://electrotech.ca-website/testNewApp --delete --exclude "news/*"
    D) aws cloudfront create-invalidation --distribution-id E37B7WK0QXYY20 --paths "/testNewApp/*"

Fonctionnement;
  1. /contact-us utilise MailJet (Gratuit)
      user: informatique@electrotech.ca

  2. /tracking utilise api.electrotech.ca sur lightsail (Server linux 7$/mois)
      github : api-electrotech-lightsail
      Les données des projets sont push dans api.electrotech.ca par ElectrotechApi sur ERP2. 

  3. /jobs utilise sanity.io (Gratuit)
      Sanity Studio : https://electrotech-jobs.sanity.studio/
      user: informatique@electrotech.ca

  4. /contact-us utilise captcha v3 googles (Gratuit)
      https://cloud.google.com/security/products/recaptcha
      6LdtmzUrAAAAAIfQeyOHcZcCCaE2QrK16MmJcFQZ
      contact us electrotech.ca

  5. Les news sont fetch par ElectrotechApi
      Les news sont traduites avec Open AI et push dans AWS avec CLI sur server ERP2. 

  6. Le React est build standard, et obfuscate, et ensuite push dans AWS S3.

  8. www.electrotech.ca est un AWS Cloudfront connecté au AWS S3. 

  9. Le SSL de electrotech.ca est fait par AWS Certificates. (Gratuit)



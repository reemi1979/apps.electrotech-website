
POUR POUSSER UN UPDATE DANS AWS :

Optionel (Recommandé):
  1. git add *
  2. git commit -m "update"
  3. git push origin master

Requis: 
  1. deploy-to-s3.bat (Ce scrit fait les commandes suivantes)
    A) npm run build
    B) npm run obfuscate
    C) aws s3 sync build/ s3://apps.electrotech.ca-website/ --delete
    D) aws cloudfront create-invalidation --distribution-id E13UKHMOM0TA9U --paths "/*"

Fonctionnement;
  1. /tracking utilise api.electrotech.ca sur lightsail (Server linux 7$/mois)
      github : api-electrotech-lightsail
      Les données des projets sont push dans api.electrotech.ca par ElectrotechApi sur ERP2. 

  6. Le React est build standard, et obfuscate, et ensuite push dans AWS S3.

  8. apps.electrotech.ca est un AWS Cloudfront connecté au AWS S3.

  9. Le SSL de electrotech.ca est fait par AWS Certificates. (Gratuit)



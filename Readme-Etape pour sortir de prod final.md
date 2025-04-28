

🔄 Étapes à faire quand tu vas “sortir du test” :


1. Modifier deploy-to-s3.bat:
    :: === CHEMIN DE DÉPLOIEMENT ===
    :: Pour la racine : set "DEPLOY_PATH="
    :: Pour le sous-dossier testNewApp : set "DEPLOY_PATH=testNewApp"
    set "DEPLOY_PATH="


2. Modifier .env.production :
    REACT_APP_VIDEO_PATH=/video.mp4


3. Modifier package.json :
    "homepage": "/"


4. Modifier env.prodction : 
    REACT_APP_VIDEO_PATH=/video.mp4
    PUBLIC_URL=/


5. Rebuild :
    npm run build


6. Déployer à la racine : ⚠️ Remarque : on ne met plus /testNewApp dans cette commande
    aws s3 sync build/ s3://electrotech.ca-website/ --delete


7. Supprimer le dossier de test :
    aws s3 rm s3://electrotech.ca-website/testNewApp/ --recursive


8. dans Cloudfront Error, remettre 403 et 404 a /index.html a place de /testNewApp/index.html
    pour permettre le open in new tab

9. changer le .bat upload-news-to-s3.bat dans ElectrotechApi/ai
    ACTUEL set "DEPLOY_PATH=testNewApp"
    A METTRE set "DEPLOY_PATH="

✅ Résultat final :
    Ton site sera accessible à :
    https://www.electrotech.ca/

    Et plus besoin de testNewApp/ nulle part, ni en dev, ni en prod.
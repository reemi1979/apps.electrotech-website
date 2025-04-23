


🔄 Étapes à faire quand tu vas “sortir du test” :
1. Modifier .env.production :
REACT_APP_VIDEO_PATH=/video.mp4


2. Modifier package.json :
"homepage": "/"


2. 
Modifier env.prodction : 
REACT_APP_VIDEO_PATH=/video.mp4
PUBLIC_URL=/


3. Rebuild :
npm run build


4. Déployer à la racine :
aws s3 sync build/ s3://electrotech.ca-website/ --delete

⚠️ Remarque : on ne met plus /testNewApp dans cette commande


5. Supprimer le dossier de test :
aws s3 rm s3://electrotech.ca-website/testNewApp/ --recursive


✅ Résultat final :
Ton site sera accessible à :
https://www.electrotech.ca/
Et plus besoin de testNewApp/ nulle part, ni en dev, ni en prod.
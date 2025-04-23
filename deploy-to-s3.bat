@echo off
set DIST_ID=E37B7WK0QXYY20
set BUCKET=electrotech.ca-website
set PATH=testNewApp

echo ======================================
echo 📦 Build de l'application React
echo ======================================
cd client
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erreur dans npm run build
    pause
    exit /b 1
)

echo ======================================
echo ☁️ Déploiement vers S3: %BUCKET%/%PATH%/
echo ======================================
aws s3 sync build/ s3://%BUCKET%/%PATH% --delete
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'envoi à S3
    pause
    exit /b 1
)

echo ======================================
echo 🧹 Invalidation du cache CloudFront
echo ======================================
aws cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/%PATH%/*"
if %errorlevel% neq 0 (
    echo ❌ Erreur lors de l'invalidation CloudFront
    pause
    exit /b 1
)

echo ======================================
echo ✅ Déploiement terminé avec succès !
echo Accès : https://www.electrotech.ca/%PATH%/
pause

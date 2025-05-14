@echo off
setlocal
cls

:: CONFIGURATION
set "NODE_PATH=C:\Program Files (x86)\nodejs"
set "AWS_PATH=C:\Program Files\Amazon\AWSCLIV2"

:: AUTRES INFOS
set "DIST_ID=E37B7WK0QXYY20"
set "BUCKET=electrotech.ca-website"

:: PATHS
set "PATH=%NODE_PATH%;%AWS_PATH%;%PATH%"

echo ======================================
echo 📦 Build de l'application React
echo ======================================

call "%NODE_PATH%\npm.cmd" run build
if errorlevel 1 (
    echo ❌ Erreur dans npm run build
    pause
    exit /b 1
)

echo ======================================
echo 🛡️ Obfuscation de l'application React
echo ======================================

call "%NODE_PATH%\npm.cmd" run obfuscate
if errorlevel 1 (
    echo ❌ Erreur dans npm run obfuscate
    pause
    exit /b 1
)

echo ======================================
echo ☁️ Déploiement vers S3: %BUCKET%/
echo ======================================

call "%AWS_PATH%\aws.exe" s3 sync build/ s3://%BUCKET%/ --delete --exclude "news/*"

if errorlevel 1 (
    echo ❌ Erreur lors de l'envoi à S3
    pause
    exit /b 1
)

echo ======================================
echo 🧹 Invalidation du cache CloudFront
echo ======================================

call "%AWS_PATH%\aws.exe" cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/*"

if errorlevel 1 (
    echo ❌ Erreur lors de l'invalidation CloudFront
    pause
    exit /b 1
)

echo ======================================
echo ✅ Déploiement terminé avec succès !
echo 🌐 Accès : https://www.electrotech.ca/
pause

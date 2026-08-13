@echo off
setlocal

:: CONFIGURATION
set "NODE_PATH=C:\Program Files (x86)\nodejs"
set "AWS_PATH=C:\Program Files\Amazon\AWSCLIV2"

:: DEPLOYMENT TARGET
set "DIST_ID=E13UKHMOM0TA9U"
set "BUCKET=apps.electrotech.ca-website"

:: PATHS
set "PATH=%NODE_PATH%;%AWS_PATH%;%PATH%"

echo ======================================
echo 📦 Build de l'application React
echo ======================================

call "%NODE_PATH%\npm.cmd" run build
if errorlevel 1 (
    echo ❌ Erreur dans npm run build
    if not defined NO_PAUSE pause
    exit /b 1
)

echo ======================================
echo 🛡️ Obfuscation de l'application React
echo ======================================

call "%NODE_PATH%\npm.cmd" run obfuscate
if errorlevel 1 (
    echo ❌ Erreur dans npm run obfuscate
    if not defined NO_PAUSE pause
    exit /b 1
)

echo ======================================
echo ☁️ Déploiement vers S3: %BUCKET%/
echo ======================================

:: Keep S3 identical to build/; do not exclude legacy paths such as news/.
call "%AWS_PATH%\aws.exe" s3 sync build/ s3://%BUCKET%/ --delete

if errorlevel 1 (
    echo ❌ Erreur lors de l'envoi à S3
    if not defined NO_PAUSE pause
    exit /b 1
)

echo ======================================
echo 🧹 Invalidation du cache CloudFront
echo ======================================

call "%AWS_PATH%\aws.exe" cloudfront create-invalidation --distribution-id %DIST_ID% --paths "/*"

if errorlevel 1 (
    echo ❌ Erreur lors de l'invalidation CloudFront
    if not defined NO_PAUSE pause
    exit /b 1
)

echo ======================================
echo ✅ Déploiement terminé avec succès !
echo 🌐 Accès : https://apps.electrotech.ca/
if not defined NO_PAUSE pause

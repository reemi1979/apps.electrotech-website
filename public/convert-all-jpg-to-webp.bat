@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Réglages qualité WebP (0-100)
set quality=85

:: Dossier courant
set root=%CD%

echo.
echo 🔄 Conversion de tous les fichiers .jpg en .webp avec qualité %quality%
echo.

:: Boucle récursive sur tous les fichiers JPG
for /R %%F in (*.jpg) do (
    set "file=%%F"
    set "webp=%%~dpnF.webp"
    echo ➤ Conversion: !file!
    cwebp -q %quality% "!file!" -o "!webp!"
)

echo.
echo ✅ Conversion terminée.
pause
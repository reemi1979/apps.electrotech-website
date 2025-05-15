@echo off
setlocal enabledelayedexpansion

set "quality=80"

echo 🔄 Converting all .png to .webp (including transparency)...

for /R %%F in (*.png) do (
    set "file=%%F"
    set "webp=%%~dpnF.webp"
    echo ➤ Conversion: !file!
    cwebp -q !quality! "!file!" -o "!webp!"
)

echo ✅ Done!
pause

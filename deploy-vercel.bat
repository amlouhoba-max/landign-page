@echo off
title Deploy Hoba Amlou to Vercel
echo ========================================================
echo   Deploying Hoba Amlou to Vercel (Production)
echo ========================================================
echo.
set PATH=C:\Program Files\nodejs;%PATH%
node node_modules\vercel\dist\vc.js --prod
echo.
echo ========================================================
echo   Deployment Finished! Check the link above.
echo ========================================================
pause

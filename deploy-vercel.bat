@echo off
title Deploy Hoba Amlou to Vercel
echo ========================================================
echo   Deploying Hoba Amlou to Vercel (Production)
echo ========================================================
echo.
echo   Building production files...
call npm run build
echo.
echo   Deploying to Vercel (Production)...
node node_modules\vercel\dist\vc.js --prod
echo.
echo ========================================================
echo   Deployment Finished! Check the link above.
echo ========================================================
pause

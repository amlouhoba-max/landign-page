@echo off
title Login to Vercel
echo ========================================================
echo   Logging in to Vercel...
echo   (Follow the instructions in the browser to sign in)
echo ========================================================
echo.
node node_modules\vercel\dist\vc.js login
echo.
echo ========================================================
echo   Login finished! Now you can run deploy-vercel.bat
echo ========================================================
pause

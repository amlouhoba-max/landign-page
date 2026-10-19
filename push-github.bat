@echo off
title Push Hoba Landing Page to GitHub
echo ========================================================
echo   Pushing latest changes to GitHub (origin main)...
echo ========================================================
echo.
git push origin main
echo.
echo ========================================================
if %ERRORLEVEL% EQU 0 (
    echo   [SUCCESS] Push to GitHub completed successfully!
) else (
    echo   [ERROR] Push failed. Please check your GitHub credentials.
)
echo ========================================================
pause

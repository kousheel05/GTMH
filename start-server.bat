@echo off
echo Starting Garage The Mandi House Server...
echo.
echo Killing any existing Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Starting server on port 3002...
node server.js
pause

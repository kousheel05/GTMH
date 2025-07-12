@echo off
title Garage The Mandi House - Website Launcher
color 0A

echo.
echo ========================================
echo   GARAGE THE MANDI HOUSE
echo   Website Launcher
echo ========================================
echo.

echo [1/4] Checking for existing server...
taskkill /F /IM node.exe 2>nul
if %errorlevel% == 0 (
    echo     ✓ Stopped existing server
) else (
    echo     ✓ No existing server found
)

echo.
echo [2/4] Starting reservation server...
start /B node reservation-server.js
timeout /t 3 /nobreak >nul
echo     ✓ Server started on port 5000

echo.
echo [3/4] Waiting for server to initialize...
timeout /t 2 /nobreak >nul
echo     ✓ Server ready

echo.
echo [4/4] Opening website...
start http://localhost:5000
echo     ✓ Website opened in browser

echo.
echo ========================================
echo   SERVER IS RUNNING
echo   Website: http://localhost:5000
echo   Admin Panel: http://localhost:5000/admin.html
echo   
echo   Press any key to stop server and exit
echo ========================================
pause >nul

echo.
echo Stopping server...
taskkill /F /IM node.exe 2>nul
echo Server stopped. Goodbye!
timeout /t 2 /nobreak >nul

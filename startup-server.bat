@echo off
REM Garage The Mandi House - Startup Server
REM This script can be added to Windows startup folder

cd /d "C:\Users\Asus\Desktop\PROJECTS\gtmh"

REM Check if server is already running
curl -s http://localhost:5000/reservations >nul 2>&1
if %errorlevel% == 0 (
    echo Server already running
    exit /b 0
)

REM Start server silently
start /min node reservation-server.js

REM Wait a moment for server to start
timeout /t 5 /nobreak >nul

REM Verify server started
curl -s http://localhost:5000/reservations >nul 2>&1
if %errorlevel% == 0 (
    echo Server started successfully
) else (
    echo Failed to start server
)

exit /b 0

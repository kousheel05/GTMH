@echo off
echo Creating desktop shortcut for Garage The Mandi House...

set "shortcutPath=%USERPROFILE%\Desktop\Garage The Mandi House.lnk"
set "targetPath=%~dp0launch-website.bat"
set "iconPath=%~dp0favicon.ico"

powershell -Command "& {$WshShell = New-Object -comObject WScript.Shell; $Shortcut = $WshShell.CreateShortcut('%shortcutPath%'); $Shortcut.TargetPath = '%targetPath%'; $Shortcut.WorkingDirectory = '%~dp0'; $Shortcut.Description = 'Launch Garage The Mandi House Website'; $Shortcut.Save()}"

echo.
echo ✅ Desktop shortcut created successfully!
echo 📍 Location: %shortcutPath%
echo.
echo You can now double-click the shortcut on your desktop to:
echo   • Automatically start the server
echo   • Open the website in your browser
echo.
pause

@echo off
cd /d "%~dp0"
python -u server.py
echo.
echo Datafield has stopped. Press any key to close this window.
pause >nul

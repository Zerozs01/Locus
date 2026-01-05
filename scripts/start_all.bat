@echo off
echo ======================================
echo  LOCUS - Tactical AI System Launcher
echo ======================================
echo.

echo [1/3] Starting n8n workflow engine...
start /B docker-compose up -d n8n

echo [2/3] Starting Ngrok tunnel...
start /B ngrok http 5678

echo [3/3] Waiting for services to initialize...
timeout /t 5 /nobreak > nul

echo.
echo All services started!
echo - n8n: http://localhost:5678
echo - Check Ngrok dashboard for tunnel URL
echo.
pause

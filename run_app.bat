@echo off
title Home Care Runner

echo Initializing backend dependencies...
start "Dependencies" cmd /k "cd backend && pip install -r requirements.txt && echo Backend Dependencies Installed. Please close this window :)"

pause

echo Starting Backend...
start cmd /k "cd backend && uvicorn main:app --reload"

echo Installing Frontend Dependencies...
start "FrontendSetup" cmd /k "cd frontend && npm install && npm install -D vite && echo Frontend setup complete! Please close this window :)"

pause

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo Launching website...
start "" "http://localhost:3000"

echo All services are ACTIVE!!!
pause

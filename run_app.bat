@echo off
title Home Care Runner

echo Initializing services...
start "Dependencies" cmd /k "cd backend && pip install -r requirements.txt && echo Dependencies Installed. please close this window :)"

pause

echo Starting Backend ...
start cmd /k "cd backend && uvicorn main:app --reload"

echo Starting Frontend ...
start cmd /k "cd frontend && npm run dev"

echo Launching website...
start "" "http://localhost:3000" 

echo All services are ACTIVE!!!
pause

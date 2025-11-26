@echo off
title Home Care Runner

echo Starting Backend ...
start cmd /k "cd backend && uvicorn app.main:app --reload"

echo Starting Frontend ...
start cmd /k "cd frontend && npm run dev"

echo All services started!
pause

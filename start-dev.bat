@echo off
cd /d "%~dp0"
start "" http://127.0.0.1:4321/5000years/
npm run dev -- --host 127.0.0.1 --port 4321

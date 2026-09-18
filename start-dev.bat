@echo off
cd /d "%~dp0"
start "" http://127.0.0.1:4321/shiqiu/
npm run dev -- --host 127.0.0.1 --port 4321

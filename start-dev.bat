@echo off
cd /d "D:\project\git\5000years"
start "" http://127.0.0.1:4321/5000years/
npm run dev -- --host 127.0.0.1 --port 4321

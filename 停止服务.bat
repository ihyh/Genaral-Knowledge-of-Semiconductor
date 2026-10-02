@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 正在停止 半导体教学网站 ...
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":8787" ^| findstr LISTENING') do taskkill /PID %%p /F >nul 2>&1
echo 已停止（若提示未找到进程，说明服务本来就没在运行）。
pause

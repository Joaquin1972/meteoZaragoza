@echo off
chcp 65001 >nul
cd /d "%~dp0"

title Meteorología Zaragoza - AEMET

echo.
echo ======================================
echo  METEOROLOGÍA ZARAGOZA - AEMET
echo ======================================
echo.

if not exist node_modules (
    echo Instalando dependencias...
    call npm install
)

echo Iniciando servidor en puerto 3000...
echo.
start "Servidor AEMET" cmd /k npm start

timeout /t 3 /nobreak

echo Abriendo navegador...
start http://localhost:3000

echo.
echo Aplicación abierta en http://localhost:3000
echo.

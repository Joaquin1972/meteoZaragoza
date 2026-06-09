# Script para iniciar el servidor AEMET
Set-Location $PSScriptRoot

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "  METEOROLOGÍA ZARAGOZA - AEMET" -ForegroundColor Green
Write-Host "======================================`n" -ForegroundColor Green

# 1. Limpiar puerto 3000 si está en uso
Write-Host "⚙️  Limpiando puerto 3000..." -ForegroundColor Yellow
$proceso = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($proceso) {
    Write-Host "  Deteniendo proceso anterior..." -ForegroundColor Yellow
    Stop-Process -Id $proceso.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 1
}

# 2. Verificar Node.js
Write-Host "✓ Node.js $(node --version)" -ForegroundColor Green

# 3. Instalar dependencias si no existen
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Instalando dependencias (primera ejecución)..." -ForegroundColor Yellow
    npm install
    Write-Host "✓ Dependencias instaladas" -ForegroundColor Green
}

# 4. Iniciar servidor
Write-Host "`n✓ Iniciando servidor Express..." -ForegroundColor Green
Write-Host "  Puerto: 3000" -ForegroundColor Cyan
Write-Host "  URL: http://localhost:3000`n" -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location '$PSScriptRoot'; npm start"

# 5. Esperar a que el servidor esté listo
Write-Host "⏳ Esperando que el servidor inicie..." -ForegroundColor Yellow
$contador = 0
$servidor_listo = $false

for ($i = 1; $i -le 15; $i++) {
    Start-Sleep -Seconds 1
    $respuesta = $null
    $respuesta = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 1 -ErrorAction SilentlyContinue

    if ($respuesta) {
        $servidor_listo = $true
        break
    }
    else {
        Write-Host "  Intento $i/15..." -ForegroundColor Gray
    }
}

if ($servidor_listo) {
    Write-Host "✓ Servidor activo en http://localhost:3000" -ForegroundColor Green
}
else {
    Write-Host "⚠️  El servidor tardó en iniciar..." -ForegroundColor Yellow
}

# 6. Abrir navegador
Write-Host "`n✓ Abriendo navegador..." -ForegroundColor Green
Start-Sleep -Seconds 1
Start-Process "http://localhost:3000"

Write-Host "`n======================================" -ForegroundColor Green
Write-Host "✓ Aplicación lista" -ForegroundColor Green
Write-Host "======================================`n" -ForegroundColor Green

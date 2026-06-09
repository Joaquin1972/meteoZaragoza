# Meteorología Zaragoza

Aplicación web (HTML5 + CSS3 + JavaScript vanilla, sin frameworks) que muestra las
condiciones meteorológicas actuales de Zaragoza y la previsión de los próximos 5 días,
con persistencia en `localStorage`.

## Funcionalidades

- Condiciones actuales: temperatura, humedad, presión atmosférica, velocidad del viento y precipitación.
- Extremos del día (últimas 24 h): temperatura máxima y mínima, y racha máxima de viento, con su hora.
- Previsión a 5 días: máxima, mínima, humedad, viento, racha máxima y probabilidad de lluvia.
- Persistencia en `localStorage` con caché de 60 segundos.
- Interfaz responsive (azules, morados y blancos) y modal de avisos unificado.

## Uso rápido (datos de ejemplo, sin dependencias)

La aplicación funciona directamente con datos de ejemplo (`USE_MOCK_DATA: true`):

1. Abre `index.html` en el navegador.
   - O sirve la carpeta con un servidor estático: `python -m http.server 8000` y visita `http://localhost:8000`.

## Datos reales de AEMET (proxy opcional)

La API de AEMET bloquea las llamadas directas desde el navegador (CORS). Para usar datos
reales se incluye un pequeño proxy local en `server.js`:

1. Instala las dependencias: `npm install`
2. Arranca el servidor: `node server.js` (o `npm start`)
3. Abre `http://localhost:3000`
4. En `assets/js/config.js` cambia `USE_MOCK_DATA` a `false`.

Si la API real falla, la aplicación muestra un aviso visual y recurre a los últimos datos
guardados en caché.

## Estructura

```
11-aemet/
├── index.html
├── server.js              (proxy Express opcional)
├── package.json
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/config.js       (API_KEY, estación 9434, USE_MOCK_DATA)
    ├── js/mock-data.js
    ├── js/api.js
    ├── js/ui.js
    ├── js/app.js
    └── img/
```

## Configuración

- **Estación AEMET:** `9434` (Zaragoza Aeropuerto)
- **Municipio (previsión):** `50297` (código INE de Zaragoza)
- **Caché:** 60 segundos (`CACHE_DURATION` en `config.js`)

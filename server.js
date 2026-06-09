// Servidor proxy opcional para obtener datos reales de AEMET sin problemas de CORS.
// Uso: npm install && node server.js  ->  http://localhost:3000
// Después, en assets/js/config.js poner USE_MOCK_DATA: false
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname)));

const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqc2FsdmFkb3I3MkBnbWFpbC5jb20iLCJqdGkiOiI4MDZhMDA5Yy04ZWFlLTQ5ZDQtOWZlYi00MzVhOTRjMmI2YzEiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTc3NTA3Mzk0NSwidXNlcklkIjoiODA2YTAwOWMtOGVhZS00OWQ0LTlmZWItNDM1YTk0YzJiNmMxIiwicm9sZSI6IiJ9.8ZT1eb5eWXrS-qY7L1Q383TOxr4KcmCL1rY__UPycWI";
const AEMET_API_URL = 'https://opendata.aemet.es/opendata/api';

// Proxy para datos de observación de una estación
app.get('/api/station/:stationId', async (req, res) => {
    try {
        const stationId = req.params.stationId;
        const url = `${AEMET_API_URL}/observacion/convencional/datos/estacion/${stationId}?api_key=${API_KEY}`;

        console.log(`Solicitando datos de estación: ${url}`);

        const response = await axios.get(url);
        const data = response.data;

        // AEMET responde con una URL en "datos" que contiene el JSON real
        if (data.datos) {
            const dataResponse = await axios.get(data.datos);
            return res.json(dataResponse.data);
        }

        res.json(data);
    } catch (error) {
        console.error('Error en proxy de estación:', error.message);
        res.status(500).json({ error: `Error al obtener datos de estación: ${error.message}` });
    }
});

// Proxy para previsión diaria por municipio (código INE)
app.get('/api/forecast/:municipioCode', async (req, res) => {
    try {
        const municipioCode = req.params.municipioCode;
        const url = `${AEMET_API_URL}/prediccion/especifica/municipio/diaria/${municipioCode}?api_key=${API_KEY}`;

        console.log(`Solicitando previsión: ${url}`);

        const response = await axios.get(url);
        const data = response.data;

        if (data.datos) {
            const forecastResponse = await axios.get(data.datos);
            return res.json(forecastResponse.data);
        }

        res.json(data);
    } catch (error) {
        console.error('Error en proxy de previsión:', error.message);
        res.status(500).json({ error: `Error al obtener previsión: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor AEMET corriendo en http://localhost:${PORT}`);
    console.log('Abre http://localhost:3000 en tu navegador');
});

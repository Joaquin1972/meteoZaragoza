// Módulo de API para AEMET
const API = {
    // Obtener observación meteorológica actual de la estación
    async getWeatherData() {
        // En modo de datos de ejemplo, devolver el mock con la misma forma que la API real
        if (CONFIG.USE_MOCK_DATA) {
            return new Promise(resolve => {
                setTimeout(() => resolve(MOCK_DATA.current), 600);
            });
        }

        try {
            // Usar el servidor proxy local
            const stationDataUrl = `/api/station/${CONFIG.STATION_ID}`;

            const stationResponse = await fetch(stationDataUrl, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!stationResponse.ok) {
                throw new Error(`Error en petición de estación: ${stationResponse.status}`);
            }

            return await stationResponse.json();
        } catch (error) {
            console.error('Error al obtener datos meteorológicos:', error);
            throw error;
        }
    },

    // Obtener previsión para los próximos 5 días
    async getForecastData() {
        if (CONFIG.USE_MOCK_DATA) {
            return new Promise(resolve => {
                setTimeout(() => resolve(MOCK_DATA.forecast), 600);
            });
        }

        try {
            // Usar el servidor proxy local con el código INE del municipio
            const forecastUrl = `/api/forecast/${CONFIG.MUNICIPIO_ID}`;

            const response = await fetch(forecastUrl, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Error en petición de previsión: ${response.status}`);
            }

            const forecastData = await response.json();
            // La respuesta es un array con un objeto raíz; extraemos el array de días
            return forecastData[0].prediccion.dia;
        } catch (error) {
            console.error('Error al obtener previsión:', error);
            throw error;
        }
    },

    // Guardar datos en localStorage
    saveToCache(data) {
        const timestamp = Date.now();
        localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, JSON.stringify(data));
        localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY_TIMESTAMP, timestamp.toString());
    },

    // Obtener datos del cache si siguen vigentes
    getFromCache() {
        const data = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
        const timestamp = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY_TIMESTAMP);

        if (!data || !timestamp) {
            return null;
        }

        const elapsed = Date.now() - parseInt(timestamp, 10);

        // Si han pasado más de CACHE_DURATION, descartar el cache
        if (elapsed > CONFIG.CACHE_DURATION) {
            return null;
        }

        return JSON.parse(data);
    },

    // Obtener datos del cache aunque hayan expirado (para fallback ante errores)
    getStaleCache() {
        const data = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    },

    // Limpiar cache
    clearCache() {
        localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY);
        localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY_TIMESTAMP);
        localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET);
        localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET_TIMESTAMP);
    },

    // Obtener horario de salida y puesta del sol
    async getSunriseSunsetData() {
        if (CONFIG.USE_MOCK_DATA) {
            return new Promise(resolve => {
                setTimeout(() => resolve(MOCK_DATA.sunriseset), 600);
            });
        }

        try {
            const url = `${CONFIG.SUNRISE_SUNSET_URL}?lat=${CONFIG.ZARAGOZA_LAT}&lng=${CONFIG.ZARAGOZA_LNG}&date=today`;

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Error en petición de salida/puesta del sol: ${response.status}`);
            }

            const data = await response.json();
            if (data.status !== 'OK') {
                throw new Error(`Error en respuesta de salida/puesta del sol: ${data.status}`);
            }

            return data.results;
        } catch (error) {
            console.error('Error al obtener horario de salida/puesta del sol:', error);
            throw error;
        }
    },

    // Guardar datos de salida/puesta del sol en localStorage
    saveSunriseSunsetToCache(data) {
        const timestamp = Date.now();
        localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET, JSON.stringify(data));
        localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET_TIMESTAMP, timestamp.toString());
    },

    // Obtener datos de salida/puesta del sol del cache si siguen vigentes
    getSunriseSunsetFromCache() {
        const data = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET);
        const timestamp = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET_TIMESTAMP);

        if (!data || !timestamp) {
            return null;
        }

        const elapsed = Date.now() - parseInt(timestamp, 10);

        // Si han pasado más de CACHE_DURATION, descartar el cache
        if (elapsed > CONFIG.CACHE_DURATION) {
            return null;
        }

        return JSON.parse(data);
    },

    // Obtener datos de salida/puesta del sol del cache aunque hayan expirado (para fallback ante errores)
    getSunriseSunsetStaleCache() {
        const data = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY_SUNRISESET);
        return data ? JSON.parse(data) : null;
    }
};

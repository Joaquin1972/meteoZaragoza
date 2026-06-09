// Configuración de la aplicación
const CONFIG = {
    API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqc2FsdmFkb3I3MkBnbWFpbC5jb20iLCJqdGkiOiI4MDZhMDA5Yy04ZWFlLTQ5ZDQtOWZlYi00MzVhOTRjMmI2YzEiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTc3NTA3Mzk0NSwidXNlcklkIjoiODA2YTAwOWMtOGVhZS00OWQ0LTlmZWItNDM1YTk0YzJiNmMxIiwicm9sZSI6IiJ9.8ZT1eb5eWXrS-qY7L1Q383TOxr4KcmCL1rY__UPycWI',
    STATION_ID: '9434',
    MUNICIPIO_ID: '50297', // Código INE de Zaragoza para la previsión
    API_URL: 'https://opendata.aemet.es/opendata/api',
    SUNRISE_SUNSET_URL: 'https://api.sunrise-sunset.org/json',
    ZARAGOZA_LAT: 41.6663,
    ZARAGOZA_LNG: -0.8856,
    CACHE_DURATION: 60000, // 1 minuto en milisegundos
    LOCAL_STORAGE_KEY: 'aemet_data',
    LOCAL_STORAGE_KEY_TIMESTAMP: 'aemet_timestamp',
    LOCAL_STORAGE_KEY_SUNRISESET: 'sunriseset_data',
    LOCAL_STORAGE_KEY_SUNRISESET_TIMESTAMP: 'sunriseset_timestamp',
    // true: usa datos de ejemplo (abre index.html directamente, sin servidor).
    // false: usa el proxy local server.js para datos reales de AEMET.
    USE_MOCK_DATA: false
};

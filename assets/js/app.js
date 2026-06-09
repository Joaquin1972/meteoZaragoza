// Aplicación principal: coordina API, UI y persistencia
const APP = {
    isLoading: false,

    // Inicializar la aplicación
    async init() {
        this.setupEventListeners();
        await this.loadData();
    },

    // Configurar listeners de eventos (sin onclick inline)
    setupEventListeners() {
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Forzar recarga: ignorar cache vigente al pulsar Actualizar
            API.clearCache();
            this.loadData();
        });

        const closeBtn = document.getElementById('alertCloseBtn');
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            UI.closeAlert();
        });
    },

    // Cargar datos (cache vigente -> API -> fallback a cache expirado)
    async loadData() {
        if (this.isLoading) {
            return;
        }

        this.isLoading = true;
        UI.setButtonLoading(true);
        UI.showLoadingCurrentWeather();
        UI.showLoadingForecast();

        try {
            // 1) Intentar obtener datos de cache vigente
            const cachedData = API.getFromCache();
            const cachedSunriseSunset = API.getSunriseSunsetFromCache();

            if (cachedData && cachedSunriseSunset) {
                this.displayData(cachedData, cachedSunriseSunset);
                return;
            }

            // 2) Si no hay cache vigente, obtener de la API
            const currentWeather = await API.getWeatherData();
            const forecast = await API.getForecastData();
            const sunriseSunset = await API.getSunriseSunsetData();

            const data = {
                current: currentWeather,
                forecast: forecast,
                timestamp: Date.now()
            };

            // Persistir en localStorage
            API.saveToCache(data);
            API.saveSunriseSunsetToCache(sunriseSunset);

            this.displayData(data, sunriseSunset);
            UI.updateLastUpdate();

        } catch (error) {
            console.error('Error al cargar datos:', error);

            // 3) Fallback: mostrar datos en cache aunque hayan expirado
            const staleData = API.getStaleCache();
            const staleSunriseSunset = API.getSunriseSunsetStaleCache();

            if (staleData) {
                this.displayData(staleData, staleSunriseSunset);
                UI.showAlert('Aviso', `Se muestran datos en caché. No fue posible conectar con la API.\n\nDetalles: ${error.message}`);
            } else {
                UI.showAlert(
                    'Error de conexión',
                    `No fue posible obtener los datos meteorológicos.\n\nDetalles: ${error.message || 'Error desconocido'}\n\nPor favor, verifica tu conexión e inténtalo de nuevo.`
                );
            }
        } finally {
            this.isLoading = false;
            UI.setButtonLoading(false);
        }
    },

    // Mostrar datos en la interfaz
    displayData(data, sunriseSunset) {
        if (data.current) {
            UI.renderCurrentWeather(data.current);
        }
        if (data.forecast) {
            UI.renderForecast(data.forecast);
        }
        if (sunriseSunset) {
            UI.renderSunriseSunset(sunriseSunset);
        }
    }
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    APP.init();
});

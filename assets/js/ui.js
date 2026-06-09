// Módulo de UI para renderizar datos en el DOM
const UI = {
    // Mostrar alerta modal (feedback visual, sin alert/confirm/prompt)
    showAlert(title, message) {
        const modal = document.getElementById('alertModal');
        const titleElement = document.getElementById('alertTitle');
        const messageElement = document.getElementById('alertMessage');

        titleElement.textContent = title;
        messageElement.textContent = message;
        modal.classList.add('active');
    },

    // Cerrar alerta modal
    closeAlert() {
        const modal = document.getElementById('alertModal');
        modal.classList.remove('active');
    },

    // Crear un grupo de esqueletos de carga dentro de un contenedor
    renderSkeletons(container, count) {
        container.replaceChildren();
        for (let i = 0; i < count; i++) {
            const skeleton = document.createElement('div');
            skeleton.className = 'skeleton';
            container.appendChild(skeleton);
        }
    },

    // Mostrar estado de carga en el grid de clima actual
    showLoadingCurrentWeather() {
        this.renderSkeletons(document.getElementById('weatherGrid'), 6);
    },

    // Mostrar estado de carga en la previsión
    showLoadingForecast() {
        this.renderSkeletons(document.getElementById('forecastGrid'), 5);
    },

    // Renderizar datos actuales del clima
    renderCurrentWeather(data) {
        const weatherGrid = document.getElementById('weatherGrid');
        weatherGrid.replaceChildren();

        if (!data || data.length === 0) {
            this.showAlert('Error', 'No se encontraron datos meteorológicos actuales');
            return;
        }

        // El array viene ordenado cronológicamente: el más reciente es el último
        const currentData = data[data.length - 1];

        // Actualizar fecha actual
        this.updateCurrentDate(currentData.fint);

        // Tarjetas de datos actuales
        weatherGrid.appendChild(this.createWeatherItem('Temperatura', currentData.ta, '°C'));
        weatherGrid.appendChild(this.createWeatherItem('Humedad', currentData.hr, '%'));
        weatherGrid.appendChild(this.createWeatherItem('Presión', currentData.pres, 'hPa'));
        // La API da el viento en m/s; convertimos a km/h
        weatherGrid.appendChild(this.createWeatherItem('Velocidad Viento', currentData.vv * 3.6, 'km/h'));
        // Racha máxima de la última lectura tomada (vmax en m/s)
        const rachaActual = this.normalizeDecimal(currentData.vmax);
        weatherGrid.appendChild(this.createWeatherItem('Racha Actual', isNaN(rachaActual) ? null : rachaActual * 3.6, 'km/h'));
        weatherGrid.appendChild(this.createWeatherItem('Precipitación', currentData.prec, 'mm'));

        // Actualizar extremos del día
        this.updateExtremes(data);
    },

    // Mapa de etiquetas a icono y tipo CSS (para bordes de color)
    WEATHER_META: {
        'Temperatura':       { icon: '🌡️', type: 'temperatura' },
        'Humedad':           { icon: '💧', type: 'humedad' },
        'Presión':           { icon: '⏱️', type: 'presion' },
        'Velocidad Viento':  { icon: '💨', type: 'viento' },
        'Racha Actual':      { icon: '🌬️', type: 'viento' },
        'Precipitación':     { icon: '🌧️', type: 'precipitacion' },
    },

    // Crear elemento de datos meteorológicos
    createWeatherItem(label, value, unit) {
        const item = document.createElement('div');
        item.className = 'weather-item';

        const meta = this.WEATHER_META[label];
        if (meta) {
            item.dataset.type = meta.type;

            const iconEl = document.createElement('span');
            iconEl.className = 'weather-icon';
            iconEl.textContent = meta.icon;
            item.appendChild(iconEl);
        }

        const labelElement = document.createElement('span');
        labelElement.className = 'weather-label';
        labelElement.textContent = label;

        const valueContainer = document.createElement('div');
        valueContainer.className = 'weather-value';

        const valueElement = document.createElement('span');
        valueElement.textContent = this.formatValue(value);

        const unitElement = document.createElement('span');
        unitElement.className = 'weather-unit';
        unitElement.textContent = unit;

        valueContainer.appendChild(valueElement);
        valueContainer.appendChild(unitElement);

        item.appendChild(labelElement);
        item.appendChild(valueContainer);

        return item;
    },

    // Obtener la racha máxima (km/h) de un array de periodos de AEMET.
    // El periodo "00-24" suele venir vacío, así que tomamos el mayor valor disponible.
    maxRacha(rachaArray) {
        if (!Array.isArray(rachaArray)) return null;

        const valores = rachaArray
            .map(r => parseFloat(r.value))
            .filter(v => !isNaN(v));

        return valores.length > 0 ? Math.max(...valores) : null;
    },

    // Normalizar un valor a número, aceptando coma decimal (formato AEMET)
    normalizeDecimal(value) {
        if (value === undefined || value === null) return NaN;
        return parseFloat(String(value).replace(',', '.'));
    },

    // Formatear valores numéricos a 1 decimal
    formatValue(value) {
        if (value === null || value === undefined) {
            return '--';
        }

        const numValue = parseFloat(String(value).replace(',', '.'));

        if (isNaN(numValue)) {
            return '--';
        }

        return numValue.toFixed(1);
    },

    // Calcular y mostrar los extremos del día (máx/mín temp y racha máxima)
    updateExtremes(data) {
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        let maxWind = -Infinity;
        let maxTempTime = '--';
        let minTempTime = '--';
        let maxWindTime = '--';

        data.forEach(item => {
            const temp = this.normalizeDecimal(item.ta);
            // vmax es la racha máxima registrada por la estación (m/s)
            const wind = this.normalizeDecimal(item.vmax);

            if (!isNaN(temp) && temp > maxTemp) {
                maxTemp = temp;
                maxTempTime = this.extractTime(item.fint);
            }
            if (!isNaN(temp) && temp < minTemp) {
                minTemp = temp;
                minTempTime = this.extractTime(item.fint);
            }
            if (!isNaN(wind) && wind > maxWind) {
                maxWind = wind;
                maxWindTime = this.extractTime(item.fint);
            }
        });

        const maxTempEl = document.getElementById('maxTemp');
        const minTempEl = document.getElementById('minTemp');
        const maxWindEl = document.getElementById('maxWind');
        const maxTempTimeEl = document.getElementById('maxTempTime');
        const minTempTimeEl = document.getElementById('minTempTime');
        const maxWindTimeEl = document.getElementById('maxWindTime');

        maxTempEl.textContent = maxTemp === -Infinity ? '--' : maxTemp.toFixed(1) + '°C';
        minTempEl.textContent = minTemp === Infinity ? '--' : minTemp.toFixed(1) + '°C';
        maxWindEl.textContent = maxWind === -Infinity ? '--' : (maxWind * 3.6).toFixed(1) + ' km/h';

        maxTempTimeEl.textContent = maxTempTime !== '--' ? `a las ${maxTempTime}` : '';
        minTempTimeEl.textContent = minTempTime !== '--' ? `a las ${minTempTime}` : '';
        maxWindTimeEl.textContent = maxWindTime !== '--' ? `a las ${maxWindTime}` : '';
    },

    // Extraer hora en formato HH:MM de una fecha ISO
    extractTime(dateString) {
        if (!dateString) return '--';
        try {
            const date = new Date(dateString);
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        } catch {
            return '--';
        }
    },

    // Actualizar la fecha mostrada junto a "Condiciones Actuales"
    updateCurrentDate(dateString) {
        const currentDateEl = document.getElementById('currentDate');
        if (!currentDateEl) return;

        const date = dateString ? new Date(dateString) : new Date();

        if (isNaN(date.getTime())) {
            currentDateEl.textContent = new Date().toLocaleDateString('es-ES');
            return;
        }

        currentDateEl.textContent = date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Renderizar previsión de 5 días
    renderForecast(data) {
        const forecastGrid = document.getElementById('forecastGrid');
        forecastGrid.replaceChildren();

        if (!data || data.length === 0) {
            this.showAlert('Error', 'No se encontró información de previsión');
            return;
        }

        const dailyForecasts = data.slice(0, 5);

        dailyForecasts.forEach(dayData => {
            forecastGrid.appendChild(this.createForecastItem(dayData));
        });
    },

    // Crear elemento de previsión para un día
    createForecastItem(dayData) {
        const item = document.createElement('div');
        item.className = 'forecast-item';

        // Fecha real del dato de AEMET
        const dateEl = document.createElement('div');
        dateEl.className = 'forecast-date';

        const forecastDate = dayData.fecha ? new Date(dayData.fecha) : new Date();
        dateEl.textContent = forecastDate.toLocaleDateString('es-ES', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        item.appendChild(dateEl);

        // Extraer datos con la estructura real de AEMET.
        // Para prob. de lluvia y viento usamos el periodo diario "00-24" si existe.
        const precipEntry = dayData.probPrecipitacion?.find(p => p.periodo === '00-24')
            ?? dayData.probPrecipitacion?.[0];
        const vientoEntry = dayData.viento?.find(v => v.periodo === '00-24')
            ?? dayData.viento?.[0];

        const forecast = {
            tempMax: dayData.temperatura?.maxima,
            tempMin: dayData.temperatura?.minima,
            humidity: dayData.humedadRelativa?.maxima,
            // La previsión de AEMET da el viento y la racha ya en km/h (no en m/s)
            windSpeed: vientoEntry?.velocidad,
            // La racha del periodo "00-24" suele venir vacía; tomamos el máximo de los subperiodos
            windGust: this.maxRacha(dayData.rachaMax),
            precipProb: precipEntry?.value
        };

        // Contenedor de datos
        const dataContainer = document.createElement('div');
        dataContainer.className = 'forecast-data';

        const rows = [
            { label: '🔴 Máxima',      value: forecast.tempMax,    unit: '°C' },
            { label: '🔵 Mínima',      value: forecast.tempMin,    unit: '°C' },
            { label: '💨 Viento',      value: forecast.windSpeed,  unit: 'km/h' },
            { label: '🌬️ Racha máx', value: forecast.windGust,   unit: 'km/h' },
            { label: '🌧️ Prob. lluvia', value: forecast.precipProb, unit: '%' }
        ];

        rows.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'forecast-row';

            const labelEl = document.createElement('span');
            labelEl.className = 'forecast-label';
            labelEl.textContent = row.label;

            const valueEl = document.createElement('span');
            valueEl.className = 'forecast-value';
            valueEl.textContent = `${this.formatValue(row.value)} ${row.unit}`;

            rowEl.appendChild(labelEl);
            rowEl.appendChild(valueEl);
            dataContainer.appendChild(rowEl);
        });

        item.appendChild(dataContainer);

        return item;
    },

    // Actualizar timestamp de última actualización
    updateLastUpdate() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES');
        const dateString = now.toLocaleDateString('es-ES');

        const lastUpdateEl = document.getElementById('lastUpdate');
        lastUpdateEl.textContent = `Última actualización: ${dateString} a las ${timeString}`;
    },

    // Mostrar/ocultar estado de carga en el botón de actualizar
    setButtonLoading(loading) {
        const btn = document.getElementById('refreshBtn');

        if (loading) {
            btn.classList.add('loading');
            btn.disabled = true;
        } else {
            btn.classList.remove('loading');
            btn.disabled = false;
        }
    },

    // Renderizar datos de salida y puesta del sol
    renderSunriseSunset(data) {
        const headerSunriseEl = document.getElementById('headerSunriseTime');
        const headerSunsetEl = document.getElementById('headerSunsetTime');
        const headerDawnEl = document.getElementById('headerDawnTime');
        const headerDuskEl = document.getElementById('headerDuskTime');

        if (!data) {
            headerSunriseEl.textContent = '--';
            headerSunsetEl.textContent = '--';
            headerDawnEl.textContent = '--';
            headerDuskEl.textContent = '--';
            return;
        }

        const sunriseTime = this.formatSunTime(data.sunrise);
        const sunsetTime = this.formatSunTime(data.sunset);
        const dawnTime = data.dawn ? this.formatSunTime(data.dawn) : '--';
        const duskTime = data.dusk ? this.formatSunTime(data.dusk) : '--';

        headerSunriseEl.textContent = sunriseTime;
        headerSunsetEl.textContent = sunsetTime;
        headerDawnEl.textContent = dawnTime;
        headerDuskEl.textContent = duskTime;
    },

    // Convertir formato de la API (HH:MM:SS AM/PM) a formato de 24h (HH:MM)
    // Suma 2 horas automáticamente por zona horaria de España (CEST/CET)
    formatSunTime(timeString) {
        if (!timeString) return '--';
        try {
            // Formato esperado: "HH:MM:SS AM" o "HH:MM:SS PM"
            const parts = timeString.trim().split(' ');
            if (parts.length !== 2) return '--';

            const timePart = parts[0]; // HH:MM:SS
            const period = parts[1]; // AM o PM

            const [hours, minutes] = timePart.split(':');
            let hour = parseInt(hours, 10);

            // Convertir a formato 24h
            if (period.toUpperCase() === 'PM' && hour !== 12) {
                hour += 12;
            } else if (period.toUpperCase() === 'AM' && hour === 12) {
                hour = 0;
            }

            // Sumar 2 horas por zona horaria de España
            hour += 2;
            if (hour >= 24) {
                hour -= 24;
            }

            return `${String(hour).padStart(2, '0')}:${minutes}`;
        } catch {
            return '--';
        }
    }
};

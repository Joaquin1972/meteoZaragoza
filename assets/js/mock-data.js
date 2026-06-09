// Datos de ejemplo con la MISMA estructura que devuelve la API real de AEMET.
// Capturados de la estación 9434 (Zaragoza Aeropuerto) y la previsión del municipio
// 50297 el 2026-06-04. Permiten usar la app abriendo index.html sin servidor.
// Para datos reales en vivo: USE_MOCK_DATA: false + node server.js.
const MOCK_DATA = {
    // Observación: array de registros horarios, ordenado cronológicamente.
    // vv y vmax vienen en m/s.
    current: [
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T09:00:00+0000", "ta": 22.3, "tamax": 22.4, "tamin": 21.2, "hr": 58, "pres": 982.7, "vv": 6.5, "vmax": 8.3, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T10:00:00+0000", "ta": 24.6, "tamax": 24.6, "tamin": 22.3, "hr": 51, "pres": 982.5, "vv": 5.2, "vmax": 9.1, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T11:00:00+0000", "ta": 26.5, "tamax": 26.5, "tamin": 24.4, "hr": 43, "pres": 982.2, "vv": 5.8, "vmax": 8.7, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T12:00:00+0000", "ta": 26.6, "tamax": 27.4, "tamin": 26.4, "hr": 43, "pres": 981.8, "vv": 6.3, "vmax": 10.7, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T13:00:00+0000", "ta": 26.9, "tamax": 27.4, "tamin": 26.5, "hr": 39, "pres": 982, "vv": 7.3, "vmax": 13.5, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T14:00:00+0000", "ta": 25.6, "tamax": 27.4, "tamin": 25.6, "hr": 37, "pres": 982.6, "vv": 7.7, "vmax": 14.9, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T15:00:00+0000", "ta": 23.4, "tamax": 25.7, "tamin": 23.3, "hr": 42, "pres": 983.1, "vv": 7.5, "vmax": 14.8, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T16:00:00+0000", "ta": 21.8, "tamax": 23.4, "tamin": 21.8, "hr": 44, "pres": 983.6, "vv": 7.1, "vmax": 11.4, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T17:00:00+0000", "ta": 20.4, "tamax": 21.8, "tamin": 20.3, "hr": 55, "pres": 983.5, "vv": 6.6, "vmax": 12.4, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T18:00:00+0000", "ta": 21.2, "tamax": 21.2, "tamin": 20.3, "hr": 50, "pres": 984, "vv": 6.5, "vmax": 12, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T19:00:00+0000", "ta": 20.7, "tamax": 21.4, "tamin": 20.7, "hr": 49, "pres": 984.4, "vv": 7.3, "vmax": 11, "prec": 0 },
        { "idema": "9434", "ubi": "ZARAGOZA AEROPUERTO", "fint": "2026-06-04T20:00:00+0000", "ta": 18.7, "tamax": 20.7, "tamin": 18.7, "hr": 54, "pres": 985.5, "vv": 6.5, "vmax": 11.6, "prec": 0 }
    ],
    // Previsión diaria: viento.velocidad y rachaMax.value vienen ya en km/h.
    // La racha del periodo "00-24" puede venir vacía; el valor real está en subperiodos.
    forecast: [
        {
            "fecha": "2026-06-05T00:00:00",
            "temperatura": { "maxima": 28, "minima": 13 },
            "humedadRelativa": { "maxima": 75, "minima": 25 },
            "viento": [{ "direccion": "O", "velocidad": 10, "periodo": "00-24" }, { "direccion": "O", "velocidad": 20, "periodo": "00-12" }, { "direccion": "SE", "velocidad": 10, "periodo": "12-24" }],
            "rachaMax": [{ "value": "", "periodo": "00-24" }, { "value": "35", "periodo": "00-12" }, { "value": "", "periodo": "12-24" }],
            "probPrecipitacion": [{ "value": 0, "periodo": "00-24" }]
        },
        {
            "fecha": "2026-06-06T00:00:00",
            "temperatura": { "maxima": 32, "minima": 17 },
            "humedadRelativa": { "maxima": 85, "minima": 25 },
            "viento": [{ "direccion": "SO", "velocidad": 10, "periodo": "00-24" }, { "direccion": "SO", "velocidad": 10, "periodo": "00-12" }, { "direccion": "E", "velocidad": 10, "periodo": "12-24" }],
            "rachaMax": [{ "value": "", "periodo": "00-24" }, { "value": "30", "periodo": "00-12" }, { "value": "", "periodo": "12-24" }],
            "probPrecipitacion": [{ "value": 0, "periodo": "00-24" }]
        },
        {
            "fecha": "2026-06-07T00:00:00",
            "temperatura": { "maxima": 33, "minima": 16 },
            "humedadRelativa": { "maxima": 70, "minima": 25 },
            "viento": [{ "direccion": "SE", "velocidad": 15, "periodo": "00-24" }, { "direccion": "SE", "velocidad": 15, "periodo": "00-12" }, { "direccion": "SE", "velocidad": 20, "periodo": "12-24" }],
            "rachaMax": [{ "value": "", "periodo": "00-24" }, { "value": "40", "periodo": "00-12" }, { "value": "45", "periodo": "12-24" }],
            "probPrecipitacion": [{ "value": 15, "periodo": "00-24" }, { "value": 0, "periodo": "00-12" }, { "value": 15, "periodo": "12-24" }]
        },
        {
            "fecha": "2026-06-08T00:00:00",
            "temperatura": { "maxima": 34, "minima": 17 },
            "humedadRelativa": { "maxima": 60, "minima": 25 },
            "viento": [{ "direccion": "NO", "velocidad": 10, "periodo": "00-24" }],
            "rachaMax": [{ "value": "30", "periodo": "00-24" }],
            "probPrecipitacion": [{ "value": 10, "periodo": "00-24" }]
        },
        {
            "fecha": "2026-06-09T00:00:00",
            "temperatura": { "maxima": 31, "minima": 16 },
            "humedadRelativa": { "maxima": 65, "minima": 28 },
            "viento": [{ "direccion": "O", "velocidad": 15, "periodo": "00-24" }],
            "rachaMax": [{ "value": "35", "periodo": "00-24" }],
            "probPrecipitacion": [{ "value": 5, "periodo": "00-24" }]
        }
    ],
    // Datos de salida y puesta del sol para Zaragoza (formato de API: HH:MM:SS AM/PM)
    // La función formatSunTime suma automáticamente 2 horas por zona horaria de España
    sunriseset: {
        "sunrise": "5:30:00 AM",
        "sunset": "9:45:00 PM",
        "dawn": "5:02:00 AM",
        "dusk": "10:13:00 PM",
        "solar_noon": "1:37:30 PM",
        "day_length": 58500,
        "civil_twilight_begin": "5:02:00 AM",
        "civil_twilight_end": "10:13:00 PM",
        "nautical_twilight_begin": "4:26:00 AM",
        "nautical_twilight_end": "10:49:00 PM",
        "astronomical_twilight_begin": "3:47:00 AM",
        "astronomical_twilight_end": "11:28:00 PM"
    }
};

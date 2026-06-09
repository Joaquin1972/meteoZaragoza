# CLAUDE.md

Proyecto:
Meteorología Zaragoza

Rol del agente:
Desarrollador web con 10 años de experiencia

Objetivo:
Crea una aplicación web que nos permita conocer los valores actuales meteorológicos de Zaragoza y la previsión de los próximos 5 dias


Funcionalidades de la aplicación:
- Ofrecer la temperatura, humedad, presión atmosférica, velocidad del viento, racha máxima actual (la de la última lectura tomada) y precipitación actual de Zaragoza (España)
- Ofrecer la previsión de temperatura, humedad, presión atmosférica, velocidad del viento y precipitación de Zaragoza (España)
- Indicar la temperatura máxima y minima del día actual, así como la velocidad del viento máxima (racha áxima)
- Persistencia de datos en local (localStorage)
- Interfaz de usuario motivacional


Stack de tecnología:
- HTML5
- CSS3
- JAVASCRIPT (Vanilla, sin framework)


Preferencias generales:
- Todos los texto visibles en la aplicación web deben estar en español
  

Preferencias de diseño:
- Diseño simple, usable, accesible y amigable
- Responsive

Preferencias de estilos:
- Colores (azules, morados y blancos)
- Uso de medidas en rem, usando un font-size base de 10px
- Uso de HTML5 y CSS3 nativos
- Uso de buenas prácticas de maquetación CSS y si es necesarios usar Flexbox y CSS Grid layout
- Que la web app sea responsive

Preferencias de código:
- No añadas dependencias externas
- HTML debe ser semántico
- Usa siempre let o const, no uses var nunca
- No uses alert, confirm o prompt, todo el feedback debe ser visual en el dom
- Toda alerta o ventana modal que aparezca debe tener el mismo estilo en la web
- No uses innerHTML, todo el contenido debe ser insertado con appenchild o previamente creando un elemento con document.createElement.
- Cuidado con olvidar prevenir el default en los eventos submit o click
- Prioriza código legile o mantenible
- Prioriza que el código sea sencillo de entender
- Si el agente duda, revisa la espeficiaciones del proyecto o pregunta al usuario.
- Estación 9434
- API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqc2FsdmFkb3I3MkBnbWFpbC5jb20iLCJqdGkiOiI4MDZhMDA5Yy04ZWFlLTQ5ZDQtOWZlYi00MzVhOTRjMmI2YzEiLCJpc3MiOiJBRU1FVCIsImlhdCI6MTc3NTA3Mzk0NSwidXNlcklkIjoiODA2YTAwOWMtOGVhZS00OWQ0LTlmZWItNDM1YTk0YzJiNmMxIiwicm9sZSI6IiJ9.8ZT1eb5eWXrS-qY7L1Q383TOxr4KcmCL1rY__UPycWI"
- El uso va a ser local, no pasa nada por ver la API_KEY

Estructura de archivos:
- Carpeta (assest)
  - Carpeta (css)
  - Carpeta (js)
  - carpera (img)
- index.html
- CLAUDE.md
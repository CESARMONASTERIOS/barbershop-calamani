# BarberShop Calamani

Sistema web de gestión y reservas para BarberShop Calamani. La aplicación
incluye información sobre servicios y barberos, un formulario de reservas y
modelos de análisis del sistema.

**Sitio web publicado:** [Abrir BarberShop Calamani](https://cesarmonasterios.github.io/barbershop-calamani/)

## Estructura

- `web/index.html`: punto de entrada de la aplicación.
- `web/css/styles.css`: estilos adaptables a celulares, tabletas y escritorio.
- `web/js/model.js`: datos, disponibilidad, validaciones y almacenamiento local.
- `web/js/view.js`: componentes, contenido y diagramas.
- `web/js/controller.js`: estado y flujo de las reservas.
- `server/`: API en TypeScript, PostgreSQL y conexión con WhatsApp Business.

La aplicación web usa React y las fuentes de Google mediante CDN.

## Ejecutar el sitio web

Desde la carpeta del proyecto, inicia un servidor estático:

```powershell
cd web
python -m http.server 8000
```

Abre <http://localhost:8000> en el navegador.

## Configurar la API

1. Crea la base de datos y ejecuta `server/schema.sql`.
2. Copia `server/.env.example` a `server/.env` y configura la base de datos y
   las credenciales de WhatsApp Business.
3. En `web/js/model.js`, configura `API` con la URL del servidor.
4. Desde `server/`, instala dependencias con `npm install` e inicia la API con
   `npm start`.

No publiques el archivo `.env` ni credenciales. `.gitignore` excluye estos
archivos; el ejemplo de configuración no contiene credenciales activas.

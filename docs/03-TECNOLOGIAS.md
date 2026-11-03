# 03 · Tecnologías

> ¿Con qué lo construimos?

## Stack elegido

| Capa | Tecnología | Motivo de la elección |
| --- | --- | --- |
| Frontend | **Angular 21** (CSR) con TypeScript | Estructura fija de módulos, servicios y guardas: todos los frontends del ecosistema se organizan igual |
| Instalación en dispositivos | **PWA** (service worker de Angular) | La app se instala en el celular sin pasar por las tiendas |
| Estilos | CSS con variables | Respeta el manual de marca y permite que cada organización cambie los colores en Willa Community Center |
| Backend | **Laravel 12** (PHP) | Un solo backend para todas las apps, con autenticación, validación y límite de peticiones ya incluidos |
| Autenticación | **Laravel Sanctum** con cookies | Sesión por cookie bajo el mismo dominio, sin tokens guardados en el navegador |
| Base de datos | **MySQL** | Relacional, madura y bien integrada con Laravel; ideal para datos con muchas relaciones (empresa, sucursal, plan, app) |
| Repositorio | **Git** en repositorio privado propio | El historial de versiones se conserva sin subir el código a servicios de terceros |
| Publicación | **VPS** propio con HTTPS | Control total del servidor, de los datos y de los costos |
| Tareas programadas | Planificador de Laravel (cron) | Genera las facturas, registra los pagos y actualiza la cotización todos los días |
| Anti-robots | Google reCAPTCHA | Frena registros e inicios de sesión automatizados |
| IA | Asistente de programación guiado por `AGENTS.md` | Genera código respetando estas especificaciones. Todavía no hay IA dentro del producto: es el próximo paso |

## Diferencias con el stack de Ursus

El modelo de clase usa React con Next.js, PostgreSQL, GitHub y Vercel. WillaLogic cambia las cuatro piezas:

| Ursus | WillaLogic | Por qué se cambia |
| --- | --- | --- |
| React + Next.js | Angular 21 + Laravel 12 | El proyecto no es un sitio: es una plataforma con muchas apps. Separar frontend y backend permite que **un** backend atienda a **varios** frontends |
| PostgreSQL (Neon) | MySQL | Es la base con la que Laravel trabaja de forma más directa y se aloja en el mismo VPS |
| GitHub | Git en repositorio privado propio | El código es el principal activo de la empresa y no se aloja en plataformas externas |
| Vercel | VPS propio | Vercel está pensado para Next.js; un VPS aloja a la vez Laravel, MySQL y los frontends bajo un mismo dominio |

## Por qué CSR y no SSR

Casi todas las pantallas están detrás del inicio de sesión, donde el posicionamiento en buscadores no importa. Renderizar en el navegador (CSR) simplifica el servidor: solo entrega archivos estáticos y responde la API. La única página pública es el sitio de presentación, que se trata en `09-SEO.md`.

## Cómo se conecta todo

```text
 Navegador o PWA instalada
          │  HTTPS (mismo dominio)
          ▼
 ┌──────────────── VPS ─────────────────┐
 │  Servidor web                        │
 │   ├── /            sitio público     │
 │   ├── /w           app cliente       │
 │   ├── /WStock ...  una ruta por app  │
 │   └── /api         Laravel 12        │
 │                       │              │
 │                       ▼              │
 │                    MySQL             │
 └──────────────────────────────────────┘
```

Como todo vive bajo el mismo dominio, la cookie de sesión sirve para todos los frontends y no hace falta configurar permisos entre dominios.

## No usar en este proyecto

- React, Vue o jQuery.
- Tailwind o Bootstrap.
- MongoDB o Firebase.
- Tokens JWT guardados en `localStorage`.
- Servicios externos para alojar el código fuente.

Es una decisión del proyecto, no una regla eterna: si algo cambia, primero se edita este archivo y después el código.

## Producto del Trabajo Final Integrador

El sistema de gestión de WillaLogic está en producción con clientes reales y su código es privado. Para el TFI se construye un **producto separado y público**: el sitio comercial de WillaLogic (catálogo de apps, planes y consulta "Quiero mi web").

| Capa | Tecnología | Motivo |
| --- | --- | --- |
| Frontend | **Angular 21** (componentes standalone, CSR) | Es el stack que usa todo el ecosistema WillaLogic: mismas convenciones y mismo estilo de código |
| Tests | Runner de tests por defecto de Angular 21 (`npm test`) | Viene integrado con el CLI, sin dependencias extra |
| Estilos | CSS con las variables de `IDENTIDAD-MARCA.md` | Ningún color escrito a mano |
| Datos | Instantánea JSON pública en `public/data/` | Evita depender de CORS y de la disponibilidad de la API en la demo (ver clarificación de `001`) |
| Repositorio | **GitHub público** `iest-tfi_willalogic` | Lo exige el TFI. Solo contiene este sitio: el núcleo sigue privado |
| Publicación | Subdominio en el VPS propio o Vercel | Cualquiera sirve un sitio estático con HTTPS |

No hay backend ni base de datos en este producto: no guarda datos personales. El formulario de consulta no envía nada a un servidor, solo abre WhatsApp.

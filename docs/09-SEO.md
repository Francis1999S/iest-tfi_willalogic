# 09 · SEO

> ¿Cómo nos encuentran en Google?

## Qué se posiciona y qué no

WillaLogic es una aplicación que se renderiza en el navegador (CSR) y casi todas sus pantallas están detrás del inicio de sesión. Por eso el SEO se concentra en **una sola página**: el sitio público.

| Página | ¿Se indexa? | Motivo |
| --- | --- | --- |
| `/` sitio público | Sí | Es la vidriera de la marca |
| `/w` iniciar sesión | No | No tiene contenido para buscadores |
| `/w/registro` crear cuenta | Sí | Es el destino de quien busca "crear cuenta" |
| `/w/empresas` y el resto del panel | No | Contenido privado |
| `/WStock`, `/WPos` y demás apps | No | Contenido privado |

Las páginas que no se indexan llevan:

```html
<meta name="robots" content="noindex, nofollow" />
```

## Título y descripción de cada página

| Página | Título (hasta 60 caracteres) | Descripción (hasta 155 caracteres) |
| --- | --- | --- |
| `/` | WillaLogic — Arquitectura digital para empresas que escalan | Software SaaS, aplicaciones a medida y automatización para empresas y organizaciones. Hecho en Tinogasta, Catamarca. |
| `/w/registro` | Crear cuenta gratis · WillaLogic | Creá tu cuenta, registrá tu empresa y probá las aplicaciones Willa gratis durante una semana. Sin permanencia mínima. |
| `/w` | Iniciar sesión · WillaLogic | Ingresá a tu panel para administrar tus empresas, sucursales y aplicaciones. |

## Etiquetas del sitio público

```html
<html lang="es">
<head>
  <title>WillaLogic — Arquitectura digital para empresas que escalan</title>
  <meta name="description"
        content="Software SaaS, aplicaciones a medida y automatización para empresas y organizaciones. Hecho en Tinogasta, Catamarca." />
  <link rel="canonical" href="https://willalogic.com.ar/" />

  <!-- Vista previa al compartir en WhatsApp y redes -->
  <meta property="og:type"        content="website" />
  <meta property="og:title"       content="WillaLogic — Arquitectura digital para empresas que escalan" />
  <meta property="og:description" content="Soluciones de software SaaS para empresas que buscan crecer." />
  <meta property="og:image"       content="https://willalogic.com.ar/preview.png" />
  <meta property="og:url"         content="https://willalogic.com.ar" />
</head>
```

Como el contenido se arma en el navegador, estas etiquetas van escritas **directamente en el `index.html`**, para que estén disponibles aunque el buscador o WhatsApp no ejecuten JavaScript.

## Palabras clave

| Tipo | Palabras |
| --- | --- |
| Principales | software SaaS, sistema de gestión para empresas, aplicaciones a medida |
| Por producto | control de stock, punto de venta, gestión de turnos, gestión de trámites, fidelización por puntos |
| Locales | software Catamarca, desarrollo de software Tinogasta, sistema de gestión Argentina |
| De marca | WillaLogic, Willa Stock, Willa POS, Willa Finance |

Se usan de forma natural en títulos y párrafos. No se repiten de manera forzada.

## Texto alternativo de imágenes

| Imagen | Texto alternativo |
| --- | --- |
| Logo del encabezado | "WillaLogic" |
| Imagen de Willa Stock | "Pantalla de Willa Stock con el listado de productos e inventario" |
| Imagen de Willa POS | "Pantalla de Willa POS con una venta en curso" |
| Imagen de Willa Finance | "Pantalla de Willa Finance con el resumen de ingresos y gastos" |
| Ilustración de un servicio | "Ilustración de desarrollo de software a medida" |
| Imagen decorativa de fondo | `alt=""` (vacío, para que el lector de pantalla la saltee) |

Reglas:

- Describir lo que se ve, no escribir "imagen de".
- No superar los 125 caracteres.
- No rellenar el texto alternativo con palabras clave.

## Lista de control

- [ ] Título y descripción únicos en cada página pública
- [ ] Un solo `<h1>` por página
- [ ] Atributo `lang="es"` en la etiqueta `<html>`
- [ ] Etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- [ ] Todas las imágenes con texto alternativo
- [ ] Imagen para compartir de 1200 × 630 px
- [ ] Archivos `robots.txt` y `sitemap.xml` publicados
- [ ] Páginas privadas con `noindex`
- [ ] Puntaje de 90 o más en PageSpeed para celular

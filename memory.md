# Memoria del proyecto

> Lo que el agente tiene que recordar entre conversaciones. Se actualiza al terminar cada tarea. Una conversación por tarea: lo importante viene acá, no queda en el chat.

## Decisiones tomadas

| Fecha | Decisión | Motivo |
| --- | --- | --- |
| 2026-11-03 | El TFI es un sitio público separado; el núcleo SaaS no se sube | Seguridad: el núcleo está en producción con clientes reales |
| 2026-11-03 | Los datos de apps y planes se leen de instantáneas JSON en `public/data/` | La API pública podría no permitir CORS desde otro dominio y la demo no debe depender de ella |
| 2026-11-03 | El precio en pesos se calcula con la cotización guardada en la instantánea, y se muestra como "aproximado" | Los planes están dolarizados; la cotización cambia todos los días |
| 2026-11-03 | El formulario no tiene backend: arma el mensaje y abre WhatsApp | No guardar datos personales; menos superficie de ataque |
| 2026-11-03 | Sin cursivas en toda la interfaz | Decisión de marca posterior al TP 3 |
| 2026-11-03 | Proyecto Angular 21.2 generado con `ng new` (standalone, CSS, sin SSR, zoneless, runner Vitest); prefijo de componentes `wl` en `angular.json` | T0 de 001 |
| 2026-11-03 | `vitest` fijado en `~4.0.8` (no `^4.0.8`) | Con vitest 4.1 `npm install` (npm 10.9) se rompe con `Cannot read properties of null (reading 'edgesOut')` por sus peers opcionales |
| 2026-11-03 | Inter se carga desde Google Fonts en `index.html` (400, 600, 800); la pila tipográfica vive en `--font-base` de `tokens.css` | Sin dependencias nuevas; la fuente sale de los tokens |
| 2026-11-03 | `AppWilla` tipa solo los 6 campos de C2 (uuid, nombre, descripcion, color, logo, version); los extras de `apps.json` se ignoran | Independiente de la decisión pendiente C9 |
| 2026-11-03 | `normalizar()` quita diacríticos con NFD, así que también "ñ" → "n" | Aceptado: buscar "pena" también encuentra "peña"; con 11 apps no molesta |
| 2026-11-03 | `siglasApp()` sale del `nombre`, no del `slug`, y no limita la cantidad de letras | Así lo fija el plan; los 11 nombres actuales tienen como máximo 3 palabras ("WCC") |
| 2026-11-03 | `AppsService` copia solo los 6 campos de C2 y convierte `logo` en URL completa (`base_iconos` + archivo) | La tarjeta recibe la URL lista; los campos internos del JSON no llegan a la vista |
| 2026-11-03 | `AppsService` carga en el constructor (`providedIn: 'root'`, una sola petición); JSON sin `apps` como lista → `error`; lista vacía → `listo` | Caso límite de la spec: lista vacía es "sin resultados", no error |
| 2026-11-03 | El nombre de la app en la tarjeta es `<h2>` (la página `/apps` lleva el único `<h1>`) | Encabezados en orden |
| 2026-11-03 | La insignia de respaldo es `role="img"` con `aria-label="Ícono de …"` y fondo `color-mix(--color-app 70 %, --bg-primary)` con siglas en `--text-white` | Colores claros como `#5fa800` no dan contraste AA con texto blanco si se usan puros |
| 2026-11-03 | Bordes "dorado al 20 %" con `color-mix(in srgb, var(--gold-brand) 20%, transparent)` | El ejemplo de 06-DISENO-UI usa `rgba(...)` a mano, que viola el principio 2 |
| 2026-11-03 | Ruta `/apps` con carga diferida (`loadComponent`) y título «Aplicaciones Willa · WillaLogic» | 09-SEO no define título para `/apps`; a confirmar por el autor |
| 2026-11-03 | Lista vacía con el buscador vacío muestra «Todavía no hay apps para mostrar.»; el mensaje de RF-001-05 se usa solo si hay texto buscado | Evita mostrar `con ""` en el caso límite de la lista vacía |
| 2026-11-03 | Encabezado con navegación «Apps» (`routerLinkActive` + `aria-current="page"`) | Sin enlace, `/apps` solo se alcanzaba escribiendo la URL |
| 2026-11-03 | Verificación de 001: 9 ✅, 0 ❌, 1 🖐 (RF-001-09, grilla responsiva). Pendientes: prueba a 360/600/1024 px, Tab + foco, Lighthouse, C9/C10 y `docs/PROMPTS.md` | Ver `specs/001-catalogo-apps/verificacion.md` |
| 2026-11-03 | El encabezado usa `marca/logo-willalogic.png`, que es la versión **vertical** | No hay archivo del logo horizontal; reemplazarlo cuando exista (no componer el logotipo con otra fuente) |

## Convenciones que la IA tiende a olvidar

- Selectores con prefijo `wl-`; archivos en kebab-case.
- Textos en español rioplatense ("Probá", "Escribinos"), no neutro.
- Los precios en pesos se formatean con `toLocaleString('es-AR')`: punto para miles.
- Los tests que renderizan `App` necesitan `provideRouter([])` porque el encabezado usa `routerLink`.
- Las imágenes de `public/` se referencian sin `/public`: `marca/logo-willalogic.png`.
- Tests de servicios con HTTP: `provideHttpClient()` + `provideHttpClientTesting()` y `HttpTestingController.verify()` en `afterEach`.
- Componentes: archivos con sufijo `.component.*` y clase `…Component` (07-CONVENCIONES), aunque Angular 21 genere sin sufijo. Inputs con `input.required<…>()` y en tests `fixture.componentRef.setInput(…)`.
- Tests de páginas: reemplazar el servicio con `{ provide: AppsService, useValue: { apps, estado } }` usando señales, sin HTTP.
- Leer el valor de un `<input>` con referencia de plantilla (`#campo` → `campo.value`), nunca con `$any($event.target)`.
- La región `aria-live` tiene que existir siempre en el DOM; solo cambia su contenido, si no el lector de pantalla no anuncia.
- jsdom no aplica media queries: la grilla responsiva (y cualquier corte por ancho) queda como prueba manual en la verificación.
- Los `.spec.ts` pueden tener colores como dato de prueba (`'#244A85'`); el chequeo de colores a mano aplica a estilos y plantillas.

## Errores ya resueltos

<!-- Completar a medida que aparezcan. Copiar también a docs/PROMPTS.md -->

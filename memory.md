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
| 2026-11-03 | 002: `precioEnPesos()` devuelve `null` con cotización ausente, 0 o negativa; `formatoUsd` muestra decimales con coma solo si existen ("USD 13,5") | Caso límite de 002: sin cotización solo se muestra USD |
| 2026-11-03 | 002: `appsDePlan()` respeta el orden de uuids del plan (no el del catálogo) y omite los que faltan | RF-002-07 |
| 2026-11-03 | 002: `PlanesService` convierte `precio_usd` a número, marca `recomendado` con la constante `PLAN_RECOMENDADO = 'Plan Escala'` y descarta campos no mostrados (`chatbot`) | C2, C3 y C5 de 002; el JSON no trae "recomendado" |
| 2026-11-03 | `<wl-icono-app>` (compartido) encapsula ícono + insignia de siglas; lo usan la tarjeta de app y la de plan. Con `[decorativo]="true"` el ícono lleva `alt=""` porque el nombre ya está escrito al lado. Tamaño con `--tamano-icono` | El plan de 002 pide reutilizar la insignia de 001 |
| 2026-11-03 | En `/planes` el único botón primario es el del plan recomendado; los otros «Quiero este plan» son secundarios | 06-DISENO-UI: un solo botón primario por pantalla |
| 2026-11-03 | Texto negro del botón primario = `var(--bg-primary)` | No hay token "negro"; Noche Profunda es casi negro |
| 2026-11-03 | `/planes`: fecha de cotización en `DD/MM/AAAA` con `formatoFecha()` (sin `Date`, para no correr el día por zona horaria); sin cotización se oculta el aviso; grilla 1 → 3 columnas desde 1024 px; título «Planes y precios · WillaLogic» | RF-002-04 no fija el formato de fecha; 09-SEO no define título |
| 2026-11-03 | Verificación de 002: 9 ✅, 0 ❌, 1 🖐 (RF-002-09, depende de `/consulta`). D1 y D2 de 002 siguen sin decidir | Ver `specs/002-planes/verificacion.md` |
| 2026-11-03 | 003-D2 aplicada: el paréntesis (rubro, localidad) se arma solo con los datos presentes, sin comas sueltas | RF-003-08 dice "omitiendo"; la propuesta de la clarificación lo cumple en todos los casos |
| 2026-11-03 | 003-D1 con opción (a): `INTERESES` repite los 3 nombres de plan con un comentario que obliga a mantenerlos iguales a `planes.json` | Opción conservadora; la (b) cambia la arquitectura y queda a criterio del autor |
| 2026-11-03 | `limpiar()` colapsa espacios repetidos y recorta cada línea, pero conserva los saltos de línea del mensaje | RF-003-09 |
| 2026-11-03 | `interesDesdeUrl()`: coincidencia exacta (distingue mayúsculas) tras recortar espacios; cualquier otro valor → vacío | Lista blanca estricta (C3 de 003) |
| 2026-11-03 | Validación de 003 en funciones puras (`errorDeCampo`, `erroresConsulta`) sin Angular; el formulario las envuelve como `ValidatorFn`. Largos medidos después de `limpiar()` y en caracteres visibles (`Array.from`: un emoji = 1) | Principio 3; RF-003-04 y 09 |
| 2026-11-03 | `/consulta`: errores visibles solo con el campo `touched` (al salir o al enviar); al enviar con errores se enfoca el primer campo inválido; el contador del mensaje va en `aria-describedby`; `abrirWhatsApp()` es público para espiarlo en tests | RF-003-05, C6 de 003 |
| 2026-11-03 | Navegación: Apps · Planes · Quiero mi web, con `flex-wrap` para 360 px | Acceso a las tres páginas |
| 2026-11-03 | Producción en `willalogic.com.ar/TFI/`: `baseHref: "/TFI/"` solo en la configuración `production` de `angular.json` (`npm start` sigue en `/`) | Pedido del autor |
| 2026-11-03 | El encabezado usa `marca/logo-willalogic.png`, que es la versión **vertical** | No hay archivo del logo horizontal; reemplazarlo cuando exista (no componer el logotipo con otra fuente) |

## Convenciones que la IA tiende a olvidar

- Selectores con prefijo `wl-`; archivos en kebab-case.
- Textos en español rioplatense ("Probá", "Escribinos"), no neutro.
- Los precios en pesos se formatean con `toLocaleString('es-AR')`: punto para miles.
- Los tests que renderizan `App` necesitan `provideRouter([])` porque el encabezado usa `routerLink`.
- Las imágenes de `public/` se referencian sin `/public`: `marca/logo-willalogic.png`.
- **Nunca rutas absolutas** a recursos (`/data/...`, `/marca/...`): el sitio vive en `/TFI/`. Usar rutas relativas (`data/apps.json`), que se resuelven contra `<base href>`.
- El servidor de `/TFI/` tiene que devolver `/TFI/index.html` para rutas desconocidas (`/TFI/planes` al recargar), si no da 404.
- Tests de servicios con HTTP: `provideHttpClient()` + `provideHttpClientTesting()` y `HttpTestingController.verify()` en `afterEach`.
- Componentes: archivos con sufijo `.component.*` y clase `…Component` (07-CONVENCIONES), aunque Angular 21 genere sin sufijo. Inputs con `input.required<…>()` y en tests `fixture.componentRef.setInput(…)`.
- Tests de páginas: reemplazar el servicio con `{ provide: AppsService, useValue: { apps, estado } }` usando señales, sin HTTP.
- Leer el valor de un `<input>` con referencia de plantilla (`#campo` → `campo.value`), nunca con `$any($event.target)`.
- La región `aria-live` tiene que existir siempre en el DOM; solo cambia su contenido, si no el lector de pantalla no anuncia.
- jsdom no aplica media queries: la grilla responsiva (y cualquier corte por ancho) queda como prueba manual en la verificación.
- Los `.spec.ts` pueden tener colores como dato de prueba (`'#244A85'`); el chequeo de colores a mano aplica a estilos y plantillas.

## Errores ya resueltos

<!-- Completar a medida que aparezcan. Copiar también a docs/PROMPTS.md -->
- **Windows: no usar `python` en comandos.** Sin Python instalado abre el instalador de la Store y el comando queda colgado. Para editar archivos desde la terminal usar `node -e` o las herramientas de edición.

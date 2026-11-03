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
| 2026-11-03 | El encabezado usa `marca/logo-willalogic.png`, que es la versión **vertical** | No hay archivo del logo horizontal; reemplazarlo cuando exista (no componer el logotipo con otra fuente) |

## Convenciones que la IA tiende a olvidar

- Selectores con prefijo `wl-`; archivos en kebab-case.
- Textos en español rioplatense ("Probá", "Escribinos"), no neutro.
- Los precios en pesos se formatean con `toLocaleString('es-AR')`: punto para miles.
- Los tests que renderizan `App` necesitan `provideRouter([])` porque el encabezado usa `routerLink`.
- Las imágenes de `public/` se referencian sin `/public`: `marca/logo-willalogic.png`.
- Tests de servicios con HTTP: `provideHttpClient()` + `provideHttpClientTesting()` y `HttpTestingController.verify()` en `afterEach`.
- Los `.spec.ts` pueden tener colores como dato de prueba (`'#244A85'`); el chequeo de colores a mano aplica a estilos y plantillas.

## Errores ya resueltos

<!-- Completar a medida que aparezcan. Copiar también a docs/PROMPTS.md -->

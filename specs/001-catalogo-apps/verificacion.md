# Verificación · 001-catalogo-apps

Fecha: 2026-11-03 · Tests: 32/32 en verde (6 archivos) · Build: OK, sin errores ni advertencias

> Fase 6 · Generada con `/verificar 001-catalogo-apps` (skill `verificar-criterios`). Último commit verificado: `3a04369`.

## Requisitos

| Requisito | Estado | Evidencia | Origen de la falla |
| --- | --- | --- | --- |
| RF-001-01 | ✅ Cumple | `catalogo-apps.component.spec.ts` › «muestra las 11 tarjetas»; `tarjeta-app.component.spec.ts` › «muestra el ícono con su texto alternativo» y «muestra el nombre y la descripción»; ruta `apps` en `src/app/app.routes.ts` | — |
| RF-001-02 | ✅ Cumple | `tarjeta-app.component.spec.ts` › «pasa el color de la app como variable --color-app»; `tarjeta-app.component.css` usa `border-left: 4px solid var(--color-app)`; búsqueda de `#hex`/`rgb(` sin resultados en estilos | — |
| RF-001-03 | ✅ Cumple | `filtrar-apps.spec.ts` › «no distingue mayúsculas», «no distingue tildes en ninguno de los dos sentidos», «busca también en la descripción»; `catalogo-apps.component.spec.ts` › «filtra al escribir…» | — |
| RF-001-04 | ✅ Cumple | `catalogo-apps.component.spec.ts` › «filtra al escribir y vuelve a mostrar todas al vaciar el buscador»; `filtrar-apps.spec.ts` › «devuelve todas las apps si el texto está vacío» | — |
| RF-001-05 | ✅ Cumple | `catalogo-apps.component.spec.ts` › «muestra y anuncia el mensaje sin resultados» (texto exacto dentro de `aria-live="polite"`) | — |
| RF-001-06 | ✅ Cumple | `catalogo-apps.component.spec.ts` › «muestra un indicador mientras carga» (`role="status"`); `apps.service.spec.ts` › «arranca en estado "cargando"…» | — |
| RF-001-07 | ✅ Cumple | `catalogo-apps.component.spec.ts` › «muestra el error en lugar de la grilla si no se pudo cargar»; `apps.service.spec.ts` › «si la carga falla pasa a "error"» | — |
| RF-001-08 | ✅ Cumple | `tarjeta-app.component.spec.ts` › «si el ícono no carga muestra una insignia con las siglas»; `siglas-app.spec.ts` (4 tests) | — |
| RF-001-09 | 🖐 Prueba manual pendiente | CSS en `catalogo-apps.component.css` (cortes 600 y 1024 px); sin test automático porque jsdom no aplica media queries | — |
| RF-001-10 | ✅ Cumple | `tarjeta-app.component.spec.ts` › «muestra el ícono con su texto alternativo» (`alt="Ícono de Willa Stock"`) | — |

### Pasos de la prueba manual (RF-001-09)

1. Correr `npm start` y abrir `http://localhost:4200/apps` en Chrome.
2. Abrir las herramientas de desarrollo (F12) → modo dispositivo (Ctrl + Shift + M) → ancho **360 px**: tiene que haber **1 columna** y la tarjeta «Willa Community Center» no tiene que desbordar.
3. Ancho **600 px**: **2 columnas**.
4. Ancho **1024 px**: **4 columnas**.
5. Anotar el resultado acá, cambiando 🖐 por «🖐 verificada (fecha)».

## Casos límite de la spec

| Caso | Estado | Evidencia |
| --- | --- | --- |
| Espacios al principio o al final | ✅ | `filtrar-apps.spec.ts` › «ignora los espacios al principio y al final» |
| Tildes («trámites» / «tramites») | ✅ | `filtrar-apps.spec.ts` › «no distingue tildes en ninguno de los dos sentidos» |
| Descripción muy larga → 3 líneas | 🖐 | `line-clamp: 3` en `tarjeta-app.component.css`; comprobar a ojo en el paso 2 de arriba |
| «Willa Community Center» en 360 px | 🖐 | `overflow-wrap: anywhere` en `tarjeta-app.component.css`; se comprueba en el paso 2 de arriba |
| JSON con lista vacía → sin resultados, no error | ✅ | `apps.service.spec.ts` › «con una lista vacía queda "listo" sin apps, no en error» |

## Constitución

- [x] **1. Stack fijo.** `package.json` solo tiene paquetes del CLI de Angular (incluye `vitest` y `jsdom`, runner por defecto de Angular 21); `"strict": true`; sin `any`.
- [x] **2. Marca desde tokens.** Sin `#hex` ni `rgb()` en estilos ni plantillas fuera de `src/styles/tokens.css` (solo aparecen como datos de prueba en `*.spec.ts`); sin cursivas (`em`, `i` y similares forzados a `font-style: normal`).
- [x] **3. Capas separadas.** `HttpClient` solo en `servicios/apps.service.ts` (y `provideHttpClient` en `app.config.ts`); `filtrarApps`, `normalizar` y `siglasApp` en `logica/`, sin Angular y con tests.
- [x] **4. Tests primero.** Cada tarea con lógica empezó por su test en rojo; 32/32 en verde y build OK en cada commit.
- [x] **5. Seguridad.** `.gitignore` incluye `.env*`; sin `innerHTML` ni `bypassSecurityTrust*`; el servicio descarta los campos no públicos del JSON. (El `encodeURIComponent` de WhatsApp corresponde a 003.)
- [ ] **6. Accesible y mobile first.** Pendiente manual: Lighthouse (≥ 80 en las cuatro categorías) y navegación con teclado. El código tiene `alt` en todas las imágenes, `label` visible, `aria-live`, foco visible global y `prefers-reduced-motion`.
- [x] **7. Español rioplatense.** Textos de la interfaz («Buscá una app», «Probá con otra palabra», «Recargá la página») y commits en español.
- [ ] **8. Uso responsable de la IA.** `docs/PROMPTS.md` no registra todavía los prompts de implementación de T0–T6 ni errores de la IA en esta funcionalidad.

## Criterios de finalización de la spec

- [ ] Los 10 requisitos marcados como ✅ o 🖐 verificada → 9 ✅ y 1 🖐 **pendiente** (RF-001-09).
- [x] Tests de la función de filtrado y del servicio en verde.
- [x] `npm run build` sin errores.
- [x] Sin colores a mano ni cursivas (skill `verificar-criterios`).
- [ ] Navegable con Tab y foco visible en el buscador → 🖐 pendiente: en `/apps`, apretar Tab desde la barra de direcciones; el foco tiene que pasar por el logo, el enlace «Apps» y el buscador, con contorno dorado visible en cada uno.

## Tareas

T0 a T5 en `[x]`, cada una con su commit (`21a1c32`, `497fef3`, `135e195`, `88460ed`, `8955ffd`, `3a04369`). T6 se cierra con este archivo.

## Observaciones (no son fallas de un RF)

1. **Clarificación C9 y C10 sin decidir.** `public/data/apps.json` conserva `slug`, `ruta`, `precio_individual` y `cotizacion_usd`. El sitio no los muestra (el servicio los descarta), pero el archivo publicado no cumple todavía la decisión C2. Origen: **spec / datos**.
2. **Ejemplo de 06-DISENO-UI.** Usa `rgba(201, 168, 76, 0.2)` escrito a mano, que contradice el principio 2 y ni siquiera es el Dorado Willa (`#caa97a`). El código usa `color-mix` con `--gold-brand`. Origen: **documentación**.
3. **Logo del encabezado.** Se usa la versión vertical porque no existe el archivo horizontal que pide T0. Origen: **recursos de marca**.
4. **Decisiones fuera de la spec** tomadas durante la implementación (título «Aplicaciones Willa · WillaLogic», mensaje para lista vacía sin búsqueda, enlace «Apps» en el encabezado): anotadas en `memory.md`, a confirmar por el autor.

## Resumen

Cumplen: 9 · No cumplen: 0 · Pendientes manuales: 1 (RF-001-09)

Además quedan pendientes manuales de criterios generales: navegación con teclado y Lighthouse (principio 6).

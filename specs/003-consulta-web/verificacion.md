# Verificación · 003-consulta-web

Fecha: 2026-11-03 · Tests: 103/103 en verde (16 archivos) · Build: OK, sin errores ni advertencias

> Fase 6 · Generada con `/verificar 003-consulta-web` (skill `verificar-criterios`). Último commit verificado: `db1952c`.

## Requisitos

| Requisito | Estado | Evidencia | Origen de la falla |
| --- | --- | --- | --- |
| RF-003-01 | ✅ Cumple | `consulta.component.spec.ts` › «muestra los seis campos, cada uno con su etiqueta visible»; ruta `consulta` en `app.routes.ts` | — |
| RF-003-02 | ✅ Cumple | `consulta.component.spec.ts` › «ofrece las cinco opciones de interés»; `consulta.spec.ts` › «ofrece las cinco opciones de la spec» | — |
| RF-003-03 | ✅ Cumple | `consulta.component.spec.ts` › «deja elegido el plan que llega en la URL» e «ignora un plan de la URL que no está en la lista»; `consulta.spec.ts` › `interesDesdeUrl` (4 tests) | — |
| RF-003-04 | ✅ Cumple | `consulta-validacion.spec.ts` › tests por campo (largos mínimos y máximos, obligatorios y opcionales) | — |
| RF-003-05 | ✅ Cumple | `consulta.component.spec.ts` › «muestra el error al salir de un campo inválido, no antes» y «con errores no abre WhatsApp y muestra todos los mensajes» (texto leído a través de `aria-describedby`; `aria-invalid="true"`) | — |
| RF-003-06 | ✅ Cumple | `consulta.component.spec.ts` › «con errores no abre WhatsApp…» | — |
| RF-003-07 | ✅ Cumple | `consulta.component.spec.ts` › «con datos válidos abre WhatsApp con el mensaje codificado»; `consulta.spec.ts` › `enlaceWhatsApp` (3 tests: número, `&`/`#`/`?`/salto de línea, emojis) | — |
| RF-003-08 | ✅ Cumple | `consulta.spec.ts` › «arma el mensaje completo», «omite el paréntesis si no hay rubro ni localidad», «con solo rubro o solo localidad no deja comas sueltas» | — |
| RF-003-09 | ✅ Cumple | `consulta.spec.ts` › `limpiar` (2 tests) y «limpia los espacios de todos los campos»; `consulta-validacion.spec.ts` › «cuenta los largos después de quitar espacios sobrantes» | — |
| RF-003-10 | ✅ Cumple | `consulta.component.spec.ts` › «avisa que no guarda los datos»; la página no usa `HttpClient`, `fetch`, `localStorage` ni cookies (búsqueda sin resultados fuera de `servicios/`) | — |

## Casos límite de la spec

| Caso | Estado | Evidencia |
| --- | --- | --- |
| `&`, `?`, `#` o saltos de línea | ✅ | `consulta.spec.ts` › «codifica &, #, ? y los saltos de línea…»; `consulta.component.spec.ts` (mensaje con `&` y `#`) |
| Emojis | ✅ | `consulta.spec.ts` › «conserva los emojis»; `consulta-validacion.spec.ts` › «cuenta un emoji como un solo carácter» |
| `?plan=` inexistente o con código | ✅ | `consulta.spec.ts` › «ignora código y valores desconocidos» |
| Mensaje de 501 caracteres | ✅ | `consulta-validacion.spec.ts` (error «tiene 501»); `consulta.component.spec.ts` › «muestra el contador del mensaje y lo marca al pasarse de 500» |
| App en celular / WhatsApp Web en escritorio | 🖐 | Depende del sistema operativo; ver prueba manual |

## Pruebas manuales pendientes

1. **Celular (criterio de finalización):** abrir el sitio publicado o `npm start -- --host 0.0.0.0` desde el celular en la misma red → «Quiero mi web» → completar con un mensaje que tenga `&`, `#` y un emoji → «Enviar por WhatsApp». Tiene que abrirse la app de WhatsApp con el número de WillaLogic y el texto completo, sin cortes.
2. **Escritorio:** lo mismo; tiene que abrirse WhatsApp Web.
3. **Teclado:** recorrer `/consulta` solo con Tab, Shift + Tab, flechas (en «Interés») y Enter. Con el formulario vacío, Enter sobre «Enviar por WhatsApp» lleva el foco al primer campo con error.
4. **Desde planes (RF-002-09):** `/planes` → «Quiero este plan» en Plan Escala → `/consulta` con «Plan Escala» elegido.

## Constitución

- [x] **1. Stack fijo.** Reactive Forms es parte de Angular (`@angular/forms`); sin dependencias nuevas.
- [x] **2. Marca desde tokens.** Sin `#hex` ni `rgb()` fuera de `tokens.css`; sin cursivas. Se quitó `theme-color` de `index.html` por esta regla.
- [x] **3. Capas separadas.** `consulta.ts` y `consulta-validacion.ts` son funciones puras con tests; el componente las envuelve como `ValidatorFn`.
- [x] **4. Tests primero.** Cada tarea empezó por su test en rojo.
- [x] **5. Seguridad y datos.** El mensaje pasa por `encodeURIComponent` (`consulta.ts:58`); `?plan=` se valida con lista blanca; sin `innerHTML`; no se piden teléfono ni email (C1); no se guarda nada.
- [x] **6. Accesible y mobile first.** Lighthouse local (perfil móvil) en las cuatro páginas: Rendimiento 84–87, Accesibilidad 100, Buenas prácticas 100, SEO 100. Etiquetas visibles, `aria-invalid`, `aria-describedby`, foco visible. Falta la prueba manual con teclado.
- [x] **7. Español rioplatense.** «Escribí tu nombre», «Contanos qué necesitás», «Elegí qué te interesa».
- [ ] **8. Uso responsable de la IA.** `docs/PROMPTS.md` pendiente de actualizar. No hay imágenes generadas con IA en el sitio todavía, así que la leyenda «Generado con IA» de 003-T5 queda pendiente hasta que se agreguen.

## Criterios de finalización de la spec

- [x] Los 10 requisitos ✅ o 🖐 verificada → 10 ✅.
- [x] Tests de validación y de armado del mensaje (incluido `&` y `#`) en verde.
- [ ] Probado a mano en celular: abre WhatsApp con el texto correcto → 🖐 pendiente (paso 1).
- [ ] Navegable entero con teclado → 🖐 pendiente (paso 3).

## Tareas

T1 a T5 en `[x]`, con sus commits (`bd80465`, `b0790ad`, `8431d33`, `99537a5`, `db1952c`). Además, `bce84a6` (base href `/TFI/`, pedido del autor). T6 se cierra con este archivo.

## Observaciones (no son fallas de un RF)

1. **Clarificación D1 y D2 de 003.** Se implementaron las propuestas conservadoras sin confirmación explícita del autor: D2 tal cual la propuesta (paréntesis sin comas sueltas, con test); D1 con la opción (a) (lista duplicada con nota de sincronización en `consulta.ts`). Origen: **spec**, a confirmar.
2. **003-T5 sin imágenes.** `multimedia/` está vacía: no hay imágenes con la leyenda «Generado con IA» ni imagen para compartir de 1200 × 630 (`og:image` usa el logo por ahora). Origen: **recursos**.
3. **`robots.txt` en `/TFI/`.** Los buscadores solo leen `robots.txt` en la raíz del dominio (`willalogic.com.ar/robots.txt`); el de `/TFI/` sirve como referencia, pero la línea `Sitemap:` tiene que agregarse al `robots.txt` raíz o enviarse en Search Console. Origen: **despliegue**.
4. **Servidor.** `willalogic.com.ar/TFI/` tiene que devolver `/TFI/index.html` para rutas como `/TFI/planes`; si no, recargar da 404. Origen: **despliegue**.

## Resumen

Cumplen: 10 · No cumplen: 0 · Pendientes manuales: 0 de requisitos (4 pruebas manuales de criterios: celular, escritorio, teclado y flujo desde planes)

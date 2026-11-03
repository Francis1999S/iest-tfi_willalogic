# Verificación · 002-planes

Fecha: 2026-11-03 · Tests: 65/65 en verde (12 archivos) · Build: OK, sin errores ni advertencias

> Fase 6 · Generada con `/verificar 002-planes` (skill `verificar-criterios`). Último commit verificado: `974665d`.

## Requisitos

| Requisito | Estado | Evidencia | Origen de la falla |
| --- | --- | --- | --- |
| RF-002-01 | ✅ Cumple | `planes.component.spec.ts` › «tiene un único h1 y muestra los 3 planes»; `tarjeta-plan.component.spec.ts` › «muestra nombre, tipo y descripción»; ruta `planes` en `app.routes.ts` | — |
| RF-002-02 | ✅ Cumple | `tarjeta-plan.component.spec.ts` › «muestra el precio en dólares y el aproximado en pesos» («USD 25 / mes»); `precios.spec.ts` › «no muestra decimales cuando el precio es entero» | — |
| RF-002-03 | ✅ Cumple | `precios.spec.ts` › «multiplica…», «redondea al peso entero», «usa punto como separador de miles…»; `tarjeta-plan.component.spec.ts` («≈ $39.125 / mes») | — |
| RF-002-04 | ✅ Cumple | `planes.component.spec.ts` › «avisa la fecha de la cotización»; `fechas.spec.ts` (3 tests) | — |
| RF-002-05 | ✅ Cumple | `tarjeta-plan.component.spec.ts` › «muestra sucursales, usuarios y soporte» | — |
| RF-002-06 | ✅ Cumple | `tarjeta-plan.component.spec.ts` › «lista las apps incluidas en orden…»; `apps-de-plan.spec.ts` › «devuelve las apps en el orden en que las lista el plan» | — |
| RF-002-07 | ✅ Cumple | `apps-de-plan.spec.ts` › «omite los uuids que no existen en apps.json»; `tarjeta-plan.component.spec.ts` (uuid `no-existe` omitido) | — |
| RF-002-08 | ✅ Cumple | `tarjeta-plan.component.spec.ts` › «destaca el plan recomendado y no los demás»; `planes.service.spec.ts` › «marca Plan Escala como recomendado» | — |
| RF-002-09 | 🖐 Prueba manual pendiente | `tarjeta-plan.component.spec.ts` › «el botón lleva a la consulta con el plan elegido» (`href="/consulta?plan=Plan%20Escala"`). La página de destino se construye en 003-T4 y la preselección es RF-003-03 | — |
| RF-002-10 | ✅ Cumple | `planes.component.spec.ts` › «muestra el error en lugar de los planes si no se pudo cargar»; `planes.service.spec.ts` › «si la carga falla pasa a "error"» | — |

### Pasos de las pruebas manuales

**RF-002-09** (después de 003-T4):
1. `npm start` → `http://localhost:4200/planes`.
2. En «Plan Escala», hacer clic en «Quiero este plan».
3. Tiene que abrirse `/consulta?plan=Plan%20Escala` con «Plan Escala» ya elegido en «Interés».

**Grilla (caso límite)**: a 360 px las tarjetas se apilan; a 1024 px o más, 3 columnas. La tarjeta de Plan E-Gov (40 sucursales, 200 usuarios) no se rompe.

## Casos límite de la spec

| Caso | Estado | Evidencia |
| --- | --- | --- |
| «13.00» → «USD 13» | ✅ | `planes.service.spec.ts` › «convierte el precio de texto a número»; `precios.spec.ts` › «no muestra decimales…» |
| E-Gov con 40 sucursales y 200 usuarios | 🖐 | `overflow-wrap: anywhere` en los límites; comprobar a 360 px |
| Cotización ausente o cero | ✅ | `precios.spec.ts` › «devuelve null si la cotización es cero…»; `tarjeta-plan.component.spec.ts` › «sin cotización muestra solo el precio en dólares»; `planes.component.spec.ts` › «sin cotización no muestra el aviso» |
| 360 px apiladas / 3 columnas en escritorio | 🖐 | CSS en `planes.component.css`; jsdom no aplica media queries |

## Cuenta manual del precio en pesos (cotización 1565)

| Plan | USD | Cuenta | Se muestra |
| --- | --- | --- | --- |
| Plan Crecimiento | 13 | 13 × 1565 = 20.345 | ≈ $20.345 / mes |
| Plan Escala | 25 | 25 × 1565 = 39.125 | ≈ $39.125 / mes |
| Plan E-Gov | 360 | 360 × 1565 = 563.400 | ≈ $563.400 / mes |

## Constitución

- [x] **1. Stack fijo.** Sin dependencias nuevas.
- [x] **2. Marca desde tokens.** Sin `#hex` ni `rgb()` fuera de `tokens.css` (solo datos de prueba en `*.spec.ts`); sin cursivas.
- [x] **3. Capas separadas.** `HttpClient` solo en servicios; `precios.ts`, `apps-de-plan.ts` y `fechas.ts` son funciones puras con tests.
- [x] **4. Tests primero.** Cada tarea con lógica empezó por su test en rojo.
- [x] **5. Seguridad.** El servicio no copia `chatbot` ni otros campos no mostrados; sin `innerHTML`.
- [ ] **6. Accesible y mobile first.** Pendiente manual: Lighthouse y teclado. Los íconos de apps dentro del plan usan `alt=""` porque el nombre está escrito al lado.
- [x] **7. Español rioplatense.** «Quiero este plan», «Recargá la página».
- [ ] **8. Uso responsable de la IA.** `docs/PROMPTS.md` pendiente de actualizar.

## Criterios de finalización de la spec

- [ ] Los 10 requisitos ✅ o 🖐 verificada → 9 ✅ y 1 🖐 pendiente (RF-002-09).
- [x] Tests de `precioEnPesos()` y de formato en verde.
- [x] El precio en pesos de cada plan coincide con la cuenta manual (tabla de arriba).
- [x] Build sin errores; sin colores a mano.

## Tareas

T1 a T5 en `[x]`, con sus commits (`1eab20c`, `f51ee25`, `349971e`, `7b2dc61`, `974665d`). T6 se cierra con este archivo.

## Observaciones (no son fallas de un RF)

1. **Clarificación D1 y D2 sin decidir** (instantánea congelada frente a la API actual con `tipo_precio`, `caracteristicas` e imágenes; indicador de asistente). La implementación sigue la spec aprobada (modelo solo dolarizado, sin `chatbot`). Origen: **spec**.
2. **Formato de fecha** no definido en RF-002-04: se usó `DD/MM/AAAA`. Origen: **spec** (a confirmar).
3. Se extrajo `<wl-icono-app>` para reutilizar la insignia de 001; los tests de 001 siguen en verde.

## Resumen

Cumplen: 9 · No cumplen: 0 · Pendientes manuales: 1 (RF-002-09)

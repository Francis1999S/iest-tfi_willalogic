# Plan 002 · Planes y precios

| Pieza | Archivo | Responsabilidad | RF |
| --- | --- | --- | --- |
| Modelo | `src/app/modelos/plan.ts` | Tipo `Plan` (precio como número) | 002-01 |
| Lógica pura | `src/app/logica/precios.ts` | `precioEnPesos(usd, cotizacion)`, `formatoPesos(n)`, `formatoUsd(n)` | 002-02, 002-03 |
| Lógica pura | `src/app/logica/apps-de-plan.ts` | Cruza uuids del plan con `apps.json` y omite los que faltan | 002-06, 002-07 |
| Servicio | `src/app/servicios/planes.service.ts` | Lee `/data/planes.json`; convierte `precio_usd` a número; expone `planes`, `cotizacion`, `fecha`, `estado` | 002-04, 002-10 |
| Componente | `src/app/compartido/tarjeta-plan/` | Nombre, etiqueta «Recomendado», precios, límites, apps, botón | 002-01 a 002-09 |
| Página | `src/app/paginas/planes/` | Título, aviso de cotización, grilla de tarjetas | 002-04, 002-10 |
| Ruta | `/planes` | Con título SEO | 002-01 |

Reutiliza `AppsService` y la insignia de siglas de la spec 001.

El botón «Quiero este plan» navega a `/consulta?plan=<nombre>` (lo consume la spec 003).

## Tests
- `precios.spec.ts`: 25 × 1565 = 39.125 → «$39.125»; cotización 0 → `null`; «USD 13» sin decimales.
- `apps-de-plan.spec.ts`: uuid inexistente se omite.
- `planes.service.spec.ts`: convierte "25.00" a 25; estado de error.

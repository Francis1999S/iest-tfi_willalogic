# Plan 001 · Catálogo de aplicaciones

> Fase 3 · Cómo se construye, sin código.

## Piezas

| Pieza | Archivo | Responsabilidad | RF |
| --- | --- | --- | --- |
| Modelo | `src/app/modelos/app-willa.ts` | Tipo `AppWilla` con los campos de la instantánea | 001-01 |
| Lógica pura | `src/app/logica/filtrar-apps.ts` | `normalizar(texto)` y `filtrarApps(apps, texto)` | 001-03, 001-04 |
| Lógica pura | `src/app/logica/siglas-app.ts` | Siglas para la insignia de respaldo | 001-08 |
| Servicio | `src/app/servicios/apps.service.ts` | Lee `/data/apps.json`; expone señales `apps`, `estado` (`cargando` / `listo` / `error`) | 001-06, 001-07 |
| Componente | `src/app/compartido/tarjeta-app/` | Una tarjeta: ícono (o insignia), nombre, descripción, `--color-app` | 001-01, 001-02, 001-08, 001-10 |
| Página | `src/app/paginas/catalogo-apps/` | Título, buscador, grilla, mensajes de carga / error / sin resultados | 001-03 a 001-07, 001-09 |
| Ruta | `app.routes.ts` | `/apps` con título SEO | 001-01 |

## Flujo de datos

```text
apps.json ──► AppsService (signal apps, estado)
                   │
CatalogoAppsComponent ── texto del buscador (signal)
                   │
            computed: filtrarApps(apps, texto)
                   │
            @for → <wl-tarjeta-app>
```

## Decisiones técnicas

- **Señales** (`signal`, `computed`) en lugar de RxJS en el componente: menos código y más fácil de testear.
- El buscador actualiza el texto en cada tecla; con 11 elementos no hace falta demorar la búsqueda.
- El mensaje "sin resultados" vive en una región `aria-live="polite"`.
- La grilla usa CSS Grid con tres cortes (360 / 600 / 1024 px).

## Tests

- `filtrar-apps.spec.ts`: vacío, mayúsculas, tildes, espacios, sin resultados.
- `siglas-app.spec.ts`: "Willa Stock" → "WS", "Willa Community Center" → "WCC".
- `apps.service.spec.ts`: estado `listo` con datos y `error` cuando falla la carga.
- `catalogo-apps.component.spec.ts`: muestra 11 tarjetas; muestra el mensaje sin resultados.

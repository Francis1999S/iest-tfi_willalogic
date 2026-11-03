# Spec 001 · Catálogo de aplicaciones Willa

> Fase 1 del ciclo SDD · Cubre **RF22** de `docs/02-REQUERIMIENTOS.md` · Estado: aprobada tras clarificación (2026-11-03)

## Contexto

Un comerciante que entra al sitio no sabe qué hace cada app Willa. El catálogo muestra las 11 aplicaciones del ecosistema con su ícono, color, nombre y descripción, y permite buscar por texto para llegar rápido a lo que necesita ("stock", "turnos", "trámites"). Los datos salen de la instantánea pública `public/data/apps.json`, capturada de `willalogic.com.ar/api/apps`.

## Historias de usuario

- **HU-001-1.** Como dueña de un almacén, quiero ver todas las apps de WillaLogic con una descripción corta, para entender qué me puede servir.
- **HU-001-2.** Como responsable de un club, quiero buscar "turnos" o "deporte", para encontrar la app indicada sin recorrer toda la lista.
- **HU-001-3.** Como persona que navega con teclado o lector de pantalla, quiero recorrer el catálogo y entender cada tarjeta sin usar el mouse.

## Requisitos (EARS)

| ID | Requisito |
| --- | --- |
| RF-001-01 | El sistema deberá mostrar, en la ruta `/apps`, una tarjeta por cada aplicación de `apps.json`, con ícono, nombre y descripción. |
| RF-001-02 | El sistema deberá aplicar el color propio de cada aplicación al borde de su tarjeta, sin escribir colores a mano en las hojas de estilo. |
| RF-001-03 | Cuando el usuario escribe en el buscador, el sistema deberá mostrar solo las aplicaciones cuyo nombre o descripción contengan el texto, sin distinguir mayúsculas ni tildes. |
| RF-001-04 | Cuando el buscador queda vacío, el sistema deberá volver a mostrar las 11 aplicaciones. |
| RF-001-05 | Si la búsqueda no tiene resultados, entonces el sistema deberá mostrar el mensaje «No encontramos apps con "…". Probá con otra palabra.» y anunciarlo a lectores de pantalla. |
| RF-001-06 | Mientras los datos se están cargando, el sistema deberá mostrar un indicador de carga. |
| RF-001-07 | Si los datos no se pueden cargar, entonces el sistema deberá mostrar «No pudimos cargar las apps. Recargá la página.» en lugar de la grilla. |
| RF-001-08 | Si el ícono de una aplicación no carga, entonces el sistema deberá mostrar en su lugar una insignia con las siglas de la app sobre su color. |
| RF-001-09 | El sistema deberá mostrar la grilla en 1 columna desde 360 px, 2 desde 600 px y 4 desde 1024 px. |
| RF-001-10 | El sistema deberá dar a cada ícono un texto alternativo «Ícono de [nombre de la app]». |

## Casos límite

- Búsqueda con espacios al principio o al final → se ignoran.
- Búsqueda con tildes ("trámites" / "tramites") → mismo resultado.
- Descripción muy larga → se recorta visualmente a 3 líneas sin romper la tarjeta.
- Nombre "Willa Community Center" en 360 px → no desborda la tarjeta.
- JSON con lista vacía → se trata como "sin resultados", no como error.

## Fuera de alcance

- Página de detalle de cada app.
- Contratar o probar una app desde el catálogo (eso vive en el panel privado).
- Filtros por categoría (las apps no tienen categoría en la API).
- Leer la API en vivo (ver clarificación C1).

## Criterios de finalización

- [ ] Los 10 requisitos marcados como ✅ o 🖐 verificada en `verificacion.md`.
- [ ] Tests de la función de filtrado y del servicio en verde.
- [ ] `npm run build` sin errores.
- [ ] Sin colores a mano ni cursivas (skill `verificar-criterios`).
- [ ] Navegable con Tab y foco visible en el buscador.

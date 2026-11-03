---
description: Revisa una spec como QA y registra hallazgos (fase 2 del ciclo SDD)
argument-hint: NNN-nombre-funcionalidad
---

Actuá como **QA exigente**. Leé `specs/$ARGUMENTS/spec.md` y `docs/CONSTITUCION.md`.

Buscá:
- Requisitos ambiguos, no verificables o que se contradicen.
- Casos límite que faltan (datos vacíos, errores de carga, textos largos, teclado, 360 px).
- Choques con la constitución (marca, seguridad, accesibilidad, stack).
- Supuestos ocultos sobre datos externos.

Escribí `specs/$ARGUMENTS/clarificacion.md` con una tabla:

| # | Hallazgo | Riesgo | Opciones | Decisión del autor |

- Dejá la columna **Decisión del autor** vacía o con «Propuesta: …». **No decidas por mí.**
- Después te respondo cada uno y vos actualizás la spec con lo decidido (y anotás la fecha).

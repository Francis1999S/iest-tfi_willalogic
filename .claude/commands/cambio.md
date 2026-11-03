---
description: Incorpora un requisito nuevo o modificado (fase 7 del ciclo SDD)
argument-hint: NNN-nombre-funcionalidad · descripción del cambio
---

Cambio pedido: $ARGUMENTS

Orden obligatorio:

1. **Primero la spec.** Agregá o modificá el requisito en `specs/NNN/spec.md` en notación EARS, con un nuevo número (no reutilices números), y dejá una nota «Cambio (fecha): motivo».
2. Agregá las tareas necesarias en `tasks.md`, cada una con su «Listo cuando».
3. Mostrame los cambios de la spec y esperá mi aprobación.
4. Recién después implementá: test primero, código, `npm test`, `npm run build`.
5. Un commit para la spec (`docs(NNN): …`) y uno por cada tarea de código.
6. Actualizá `verificacion.md` con el nuevo requisito.

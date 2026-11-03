---
description: Redacta o completa la spec de una funcionalidad (fase 1 del ciclo SDD)
argument-hint: NNN-nombre-funcionalidad
---

Vas a redactar `specs/$ARGUMENTS/spec.md`.

1. Leé `docs/CONSTITUCION.md`, `docs/01-CONTEXTO.md`, `docs/02-REQUERIMIENTOS.md` e `docs/IDENTIDAD-MARCA.md`.
2. **Entrevistame antes de escribir**: hacé de 3 a 6 preguntas cortas sobre el objetivo, el usuario, los datos y los casos límite. No supongas respuestas.
3. Con mis respuestas, escribí la spec con estas secciones:
   - **Contexto** (2 a 4 líneas, a qué RF de `02-REQUERIMIENTOS.md` corresponde).
   - **Historias de usuario** (Como… quiero… para…).
   - **Requisitos en notación EARS**, numerados `RF-NNN-01`, `RF-NNN-02`… usando solo estas formas:
     - Ubicuo: «El sistema deberá…»
     - Por evento: «Cuando …, el sistema deberá…»
     - Por estado: «Mientras …, el sistema deberá…»
     - No deseado: «Si …, entonces el sistema deberá…»
     - Opcional: «Donde …, el sistema deberá…»
   - **Casos límite**.
   - **Fuera de alcance**.
   - **Criterios de finalización** (casillas `- [ ]` comprobables).
4. Cada requisito debe poder verificarse con un test o una prueba manual concreta. Si no se puede, reescribilo.
5. No escribas código.

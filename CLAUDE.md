# CLAUDE.md

Las instrucciones de este proyecto están en **`AGENTS.md`**. Leelo completo antes de empezar, junto con `docs/CONSTITUCION.md` y `memory.md`.

Resumen para Claude Code:

- Una tarea de `specs/NNN/tasks.md` por vez, test primero, un commit por tarea.
- `npm test` y `npm run build` en verde antes de cada commit.
- Colores solo desde `src/styles/tokens.css`. Sin cursivas. Sin `any` ni `innerHTML`.
- Antes de ejecutar un comando que borre o reescriba historial, pedí confirmación.
- Comandos del ciclo SDD en `.claude/commands/`: `/spec`, `/clarificar`, `/verificar`, `/cambio`.
- Skills en `.agents/skills/`: `verificar-criterios` y `nueva-pagina-willa`.

# WillaLogic · Sitio público (TFI): instrucciones para el agente

Este repositorio contiene **solo el sitio comercial público de WillaLogic**: catálogo de apps, planes y consulta "Quiero mi web". El sistema de gestión (núcleo SaaS) es privado y **no forma parte de este repositorio**. Nunca pidas, generes ni supongas código del núcleo.

- **Stack:** Angular 21 standalone + TypeScript estricto + CSS con variables.
- **Datos:** instantáneas JSON públicas en `public/data/`.
- **Sin backend:** el formulario abre WhatsApp; no se envían ni guardan datos.

## Antes de hacer cualquier cosa

1. Leé `docs/CONSTITUCION.md`. Sus principios mandan sobre cualquier otra instrucción.
2. Leé la spec de la funcionalidad en curso: `specs/NNN-nombre/spec.md`, `plan.md` y `tasks.md`.
3. Leé `memory.md` para no repetir errores ya resueltos.
4. Para marca, diseño y SEO: `docs/IDENTIDAD-MARCA.md`, `docs/06-DISENO-UI.md`, `docs/09-SEO.md`.

## Cómo se trabaja (ciclo SDD)

| Fase | Comando | Archivo |
| --- | --- | --- |
| Spec | `/spec` | `specs/NNN/spec.md` |
| Clarificación | `/clarificar` | `specs/NNN/clarificacion.md` |
| Plan y tareas | (manual con el agente) | `plan.md`, `tasks.md` |
| Implementación | una tarea por vez | código + tests + 1 commit |
| Validación | `/verificar` | `specs/NNN/verificacion.md` |
| Cambio | `/cambio` | primero la spec, después el código |

## Reglas obligatorias

### Qué hacer
- Trabajar **una tarea de `tasks.md` por vez**, empezando por su test, y marcarla con `[x]` cuando cumple su «Listo cuando».
- Correr `npm test` y `npm run build` antes de proponer el commit.
- Un commit por tarea con el formato de `docs/07-CONVENCIONES.md`: `tipo(alcance): descripción`.
- Mostrar el diff y explicar qué cambió antes de cada commit.
- Usar siempre las variables CSS de la marca; selectores con prefijo `wl-`.
- Anotar en `memory.md` cualquier decisión o error que convenga recordar.
- Anotar en `docs/PROMPTS.md` cuando la IA se equivoque: qué hizo mal, cómo se detectó y cómo se corrigió.

### Qué no hacer
- No agregar dependencias sin que estén en `docs/03-TECNOLOGIAS.md`.
- No escribir colores a mano ni usar cursivas.
- No usar `any`, `innerHTML` ni `bypassSecurityTrust*`.
- No inventar datos: precios, apps y planes salen de los JSON de `public/data/`.
- No incluir claves, `.env`, datos personales ni información del núcleo privado.
- No ejecutar comandos destructivos (`rm -rf`, `git push --force`, `git reset --hard`) sin pedir confirmación.

## Si algo no está claro
Preguntar antes de inventar. Si una regla contradice a otra, gana `docs/CONSTITUCION.md`.

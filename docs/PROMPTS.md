# Registro de prompts y errores de la IA

> Los pedidos más importantes hechos al agente y, como mínimo, **tres casos en los que la IA se equivocó**. Completar a medida que se trabaja: no reconstruir de memoria al final.

## Prompts principales

| Fecha | Fase | Prompt (resumido) | Resultado |
| --- | --- | --- | --- |
| 2026-11-03 | Arnés | Generar constitución, AGENTS.md, comandos y skills a partir de las convenciones reales de WillaLogic, sin datos privados | Archivos de la raíz, `.claude/` y `.agents/` revisados y ajustados por el autor |
| 2026-11-03 | Clarificación | `/clarificar 001-catalogo-apps` | 8 hallazgos; ver `specs/001-catalogo-apps/clarificacion.md` |
| 2026-11-03 | Repositorio | Inicializar git, primer commit «docs: kit de especificación y arnés del agente» y conectar con GitHub, mostrando cada comando antes de correrlo | El repo ya estaba inicializado; la IA detectó un error de tipeo en el email de git y pidió confirmación antes de corregirlo; commit `0f7883b` y push a `main` |
| 2026-11-03 | Implementación | Empezar `specs/001-catalogo-apps/tasks.md` por T0: test primero, mostrar el diff, `npm test` y `npm run build`, un commit por tarea, marcar `[x]`, actualizar `memory.md` y esperar «seguí» | T0–T5 de 001, cada una con su commit, revisada por el autor antes de commitear |
| 2026-11-03 | Validación | `/verificar 001-catalogo-apps` | 9 ✅, 0 ❌, 1 🖐; ver `specs/001-catalogo-apps/verificacion.md` |
| 2026-11-03 | Implementación | «Commiteá y seguí (no vuelvas a preguntar y terminá todo)» | 002 y 003 completas (T1–T6 de cada una) sin pausas; las decisiones pendientes del autor quedaron anotadas, no decididas |
| 2026-11-03 | Cambio | Publicar en `willalogic.com.ar/TFI`: modificar el base href | `baseHref: "/TFI/"` en producción; la IA detectó que las rutas absolutas `/data/*.json` se rompían y las pasó a relativas (`bce84a6`) |
| 2026-11-03 | Validación | `/verificar 002-planes` y `/verificar 003-consulta-web` | 002: 9 ✅, 1 🖐 · 003: 10 ✅; Lighthouse local ≥ 84 en todas las categorías |

## Errores de la IA

### Error 1
- **Tarea:** 003-T5 (inicio, navegación y SEO).
- **Qué hizo mal la IA:** agregó `<meta name="theme-color" content="#0b0e14">` en `index.html`, un color escrito a mano fuera de `tokens.css` (viola el principio 2).
- **Cómo se detectó:** la búsqueda de `#hex` de la skill `verificar-criterios`, corrida antes de commitear.
- **Cómo se corrigió:** se quitó la etiqueta; un `<meta>` no puede usar variables CSS, así que no hay forma de cumplir la regla con ella.
- **Qué regla se agregó:** en `memory.md`: «Sin `<meta name="theme-color">`: obligaría a escribir un hex fuera de `tokens.css`».

### Error 2
- **Tarea:** 003-T5, al medir Lighthouse en local.
- **Qué hizo mal la IA:** corrió `ng build --base-href /` desde Git Bash. Git Bash convirtió `/` en `C:/Program Files/Git/`, el sitio quedó con un `<base href>` roto y Lighthouse devolvió 0 en todo (`NO_FCP`). La IA podría haber atribuido el 0 al sitio.
- **Cómo se detectó:** en lugar de aceptar el resultado, se volcó el DOM con Chrome headless (`--dump-dom`) y se vio el `<base href>` equivocado.
- **Cómo se corrigió:** se repitió el build con `MSYS_NO_PATHCONV=1`; Lighthouse dio 84–87 / 100 / 100 / 100.
- **Qué regla se agregó:** en `memory.md` («Errores ya resueltos»): anteponer `MSYS_NO_PATHCONV=1` a comandos con argumentos que empiezan con `/`.

### Error 3
- **Tarea:** 003-T4 (página `/consulta`).
- **Qué hizo mal la IA:** en el test, la función auxiliar `errorDe()` partía `aria-describedby` con `split(' ')` sin filtrar vacíos; con el atributo vacío armaba el selector inválido `#.wl-consulta__error` y el test fallaba por un error del propio test, no del componente.
- **Cómo se detectó:** test en rojo con `SyntaxError: Invalid selector` en lugar de una aserción fallida.
- **Cómo se corrigió:** `.filter(Boolean)` después del `split`.
- **Qué regla se agregó:** distinguir siempre si el rojo es una aserción (esperado) o una excepción del test (bug del test) antes de tocar el código de producción.

### Error 4
- **Tarea:** 002-T1, al marcar la tarea y actualizar `memory.md`.
- **Qué hizo mal la IA:** usó `python` en un comando de terminal. En Windows sin Python instalado eso abre el instalador de la Microsoft Store y el comando quedó colgado hasta el tiempo límite; la memoria no se actualizó.
- **Cómo se detectó:** el comando superó los 120 s y `memory.md` seguía igual.
- **Cómo se corrigió:** se detuvo el proceso y se editó el archivo con `node -e` y con la herramienta de edición.
- **Qué regla se agregó:** en `memory.md`: «Windows: no usar `python` en comandos».

> Nota: los cuatro errores los detectó el propio ciclo (chequeos de la constitución, tests y medición), no una revisión posterior. Conviene que el autor los revise y los complete con su propia lectura del diff.

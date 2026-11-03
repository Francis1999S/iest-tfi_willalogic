# WillaLogic · Sitio público

Sitio comercial de **WillaLogic**, plataforma SaaS de gestión hecha en Tinogasta, Catamarca. Trabajo Final Integrador de Inteligencia Artificial (IEST, 2026), desarrollado con el ciclo de **Desarrollo Guiado por Especificaciones** y agentes de IA.

- **Sitio publicado:** www.willalogic.com.ar/TFI/
- **Video promocional:** https://youtu.be/SCc0Tm5Ud_o
- **Video demo:** https://youtu.be/Qai3TrpdoUI

## Qué incluye

| Funcionalidad | Spec | Ruta |
| --- | --- | --- |
| Catálogo de las 11 apps Willa con buscador | `specs/001-catalogo-apps` | `/apps` |
| Planes con precio en USD y en pesos | `specs/002-planes` | `/planes` |
| Consulta «Quiero mi web» por WhatsApp | `specs/003-consulta-web` | `/consulta` |

> El sistema de gestión de WillaLogic está en producción con clientes reales y **no forma parte de este repositorio** por seguridad. Este sitio usa solo datos públicos.

## Cómo correrlo

```bash
npm install
npm start        # http://localhost:4200
npm test         # tests
npm run build    # versión de producción en dist/
```

## Estructura

```text
AGENTS.md · CLAUDE.md · memory.md     ← arnés del agente
docs/       ← constitución, kit de especificación, prompts y declaración de IA
specs/      ← una carpeta por funcionalidad: spec, clarificación, plan, tareas, verificación
.claude/commands/   ← /spec, /clarificar, /verificar, /cambio
.agents/skills/     ← verificar-criterios, nueva-pagina-willa
public/     ← marca, imágenes y datos (instantáneas JSON)
multimedia/ ← piezas generadas con IA y FICHAS-IA.md
src/        ← código Angular
```

## Uso de IA

Desarrollado con Claude Code siguiendo `docs/CONSTITUCION.md`. Ver `docs/DECLARACION-IA.md` y `multimedia/FICHAS-IA.md`. Todo el código fue revisado por el autor.

© 2026 WillaLogic · Francis Seura

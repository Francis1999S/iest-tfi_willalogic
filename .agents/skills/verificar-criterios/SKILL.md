---
name: verificar-criterios
description: Verifica que una funcionalidad cumple cada requisito EARS de su spec y los principios de la constitución. Usar al cerrar una funcionalidad o cuando se pide /verificar.
---

# Verificar criterios

## Entrada
Una carpeta `specs/NNN-nombre/` con `spec.md` y `tasks.md`.

## Pasos

1. **Estado técnico**
   - `npm test` → anotar cantidad de tests y si pasan.
   - `npm run build` → anotar si compila sin errores ni advertencias nuevas.

2. **Requisitos**
   Para cada `RF-NNN-xx`:
   - Buscar el test que lo cubre (`*.spec.ts`). Si existe y pasa → ✅ Cumple, citando el archivo y el nombre del test.
   - Si es visual o de interacción y no tiene test → 🖐 Prueba manual pendiente, con el paso exacto a hacer.
   - Si el comportamiento no coincide → ❌ No cumple, indicando si la falla es del **código** o de la **spec**.

3. **Constitución** (`docs/CONSTITUCION.md`)
   Comprobar con búsquedas en el código:
   - Colores a mano fuera de `src/styles/tokens.css`: buscar `#[0-9a-fA-F]{3,6}` y `rgb(`.
   - `any`, `innerHTML`, `bypassSecurityTrust`.
   - `font-style: italic` o `<em>`/`<i>` con fines visuales.
   - Imágenes sin `alt`.
   - Textos en español neutro en lugar de rioplatense.

4. **Tareas**
   Confirmar que todas las tareas de `tasks.md` están en `[x]` y que cada una tiene su commit (`git log --oneline`).

## Salida
Escribir `specs/NNN-nombre/verificacion.md`:

```markdown
# Verificación · NNN-nombre
Fecha: AAAA-MM-DD · Tests: X/X en verde · Build: OK

| Requisito | Estado | Evidencia | Origen de la falla |
| --- | --- | --- | --- |
| RF-NNN-01 | ✅ Cumple | archivo.spec.ts › «nombre del test» | — |

## Constitución
- [x] Principio 1 …

## Resumen
Cumplen: N · No cumplen: N · Pendientes manuales: N
```

## Reglas
- No corregir nada durante la verificación.
- No marcar ✅ sin evidencia concreta.

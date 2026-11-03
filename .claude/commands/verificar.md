---
description: Valida una funcionalidad contra su spec (fase 6 del ciclo SDD)
argument-hint: NNN-nombre-funcionalidad
---

Usá la skill `.agents/skills/verificar-criterios/SKILL.md` sobre `specs/$ARGUMENTS/`.

1. Corré `npm test` y `npm run build` y anotá el resultado.
2. Para **cada** requisito `RF-NNN-xx` de `spec.md`, determiná su estado:
   - ✅ **Cumple**: indicá el test o el archivo que lo demuestra.
   - ❌ **No cumple**: indicá si la falla es **del código** o **de la spec**.
   - 🖐 **Prueba manual pendiente**: describí el paso exacto que tengo que hacer yo.
3. Revisá los **criterios de finalización** de la spec.
4. Escribí `specs/$ARGUMENTS/verificacion.md` con la tabla de resultados, fecha, y un resumen final (cuántos cumplen / no cumplen / pendientes).
5. No corrijas nada en este paso: solo informá.

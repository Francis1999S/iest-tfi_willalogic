# Plan 003 · Consulta «Quiero mi web»

| Pieza | Archivo | Responsabilidad | RF |
| --- | --- | --- | --- |
| Lógica pura | `src/app/logica/consulta.ts` | Constantes (`WHATSAPP`, `INTERESES`), `limpiar()`, `armarMensaje()`, `enlaceWhatsApp()`, `interesDesdeUrl()` | 003-02, 03, 07, 08, 09 |
| Validadores | `src/app/logica/consulta-validacion.ts` | Reglas de largo y obligatoriedad; mensajes de error en rioplatense | 003-04, 003-05 |
| Página | `src/app/paginas/consulta/` | Formulario reactivo (Reactive Forms de Angular), errores con `aria-describedby`, botón, aviso de privacidad | 003-01, 05, 06, 10 |
| Ruta | `/consulta` | Lee `plan` de la URL | 003-03 |

## Flujo

```text
?plan=Plan Escala ─► interesDesdeUrl() ─► (lista blanca) ─► valor inicial
Formulario ─► limpiar() ─► validar ─► armarMensaje() ─► enlaceWhatsApp() ─► window.open
```

- Reactive Forms es parte de Angular: no suma dependencias.
- `window.open` se encapsula en un método para poder testearlo sin abrir nada.

## Tests
- `consulta.spec.ts`: mensaje completo; sin rubro ni localidad; con `&` y `#` codificados; plan válido e inválido desde la URL.
- `consulta-validacion.spec.ts`: largos mínimos y máximos; obligatorios.
- `consulta.component.spec.ts`: no abre WhatsApp si hay errores; sí lo abre con datos válidos.

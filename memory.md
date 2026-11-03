# Memoria del proyecto

> Lo que el agente tiene que recordar entre conversaciones. Se actualiza al terminar cada tarea. Una conversación por tarea: lo importante viene acá, no queda en el chat.

## Decisiones tomadas

| Fecha | Decisión | Motivo |
| --- | --- | --- |
| 2026-11-03 | El TFI es un sitio público separado; el núcleo SaaS no se sube | Seguridad: el núcleo está en producción con clientes reales |
| 2026-11-03 | Los datos de apps y planes se leen de instantáneas JSON en `public/data/` | La API pública podría no permitir CORS desde otro dominio y la demo no debe depender de ella |
| 2026-11-03 | El precio en pesos se calcula con la cotización guardada en la instantánea, y se muestra como "aproximado" | Los planes están dolarizados; la cotización cambia todos los días |
| 2026-11-03 | El formulario no tiene backend: arma el mensaje y abre WhatsApp | No guardar datos personales; menos superficie de ataque |
| 2026-11-03 | Sin cursivas en toda la interfaz | Decisión de marca posterior al TP 3 |

## Convenciones que la IA tiende a olvidar

- Selectores con prefijo `wl-`; archivos en kebab-case.
- Textos en español rioplatense ("Probá", "Escribinos"), no neutro.
- Los precios en pesos se formatean con `toLocaleString('es-AR')`: punto para miles.

## Errores ya resueltos

<!-- Completar a medida que aparezcan. Copiar también a docs/PROMPTS.md -->

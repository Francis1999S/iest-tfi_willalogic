---
name: nueva-pagina-willa
description: Crea una página o sección nueva del sitio con las convenciones de WillaLogic (componente standalone, servicio de datos, función pura testeada, tokens de marca y accesibilidad). Usar cuando una tarea pide una pantalla o sección nueva.
---

# Nueva página Willa

Patrón que usa todo el ecosistema WillaLogic, adaptado al sitio público.

## Estructura de archivos

```text
src/app/
├── paginas/<nombre>/
│   ├── <nombre>.component.ts      ← standalone, solo muestra
│   ├── <nombre>.component.html
│   ├── <nombre>.component.css     ← solo variables de tokens.css
│   └── <nombre>.component.spec.ts
├── servicios/<nombre>.service.ts  ← obtiene datos (HttpClient) y los entrega como señales
├── logica/<nombre>.ts             ← funciones puras: filtrar, calcular, validar
└── logica/<nombre>.spec.ts        ← test de las funciones puras (primero)
```

## Reglas

1. **Test primero** sobre la función pura de `logica/`.
2. El **componente** no usa `HttpClient`: inyecta el servicio con `inject()`.
3. El **servicio** maneja tres estados: cargando, con datos y error. Expone señales (`signal`, `computed`).
4. Selector con prefijo `wl-` (por ejemplo, `wl-catalogo-apps`).
5. Estilos: solo `var(--…)`; el color propio de una app se pasa como `[style.--color-app]`.
6. Accesibilidad:
   - Un solo `<h1>` por página y encabezados en orden.
   - `alt` descriptivo en imágenes; `alt=""` si es decorativa.
   - Controles alcanzables con Tab y con foco visible.
   - Mensajes de error y de "sin resultados" con `aria-live="polite"`.
7. Mobile first: diseñar a 360 px y ampliar con `@media (min-width: …)`.
8. Textos en español rioplatense, sin cursivas.
9. Registrar la ruta en `app.routes.ts` con `title` según `docs/09-SEO.md`.

## Ejemplo mínimo

```ts
// logica/filtrar-apps.ts
export function filtrarApps(apps: AppWilla[], texto: string): AppWilla[] {
  const q = normalizar(texto);
  return q ? apps.filter(a => normalizar(a.nombre + ' ' + a.descripcion).includes(q)) : apps;
}
```

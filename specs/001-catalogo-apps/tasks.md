# Tareas 001 · Catálogo de aplicaciones

> Fase 4 · Cada tarea dura menos de 30 minutos. Una tarea = una conversación = un commit.

- [x] **T0 · Crear el proyecto Angular 21** en la raíz del repo (standalone, CSS, sin SSR), con TypeScript estricto. Copiar los tokens de `docs/IDENTIDAD-MARCA.md` a `src/styles/tokens.css` e importarlos en `styles.css`. Cargar Inter. Encabezado con el logo horizontal y pie con «© 2026 WillaLogic · Tinogasta, Catamarca».
  *Listo cuando:* `npm test` y `npm run build` pasan; la página de inicio se ve con fondo Noche Profunda y el logo.
  *Commit:* `agrega(sitio): proyecto base con tokens de marca`

- [x] **T1 · Modelo y función de filtrado (test primero).** `AppWilla`, `normalizar()` y `filtrarApps()`.
  *Listo cuando:* los tests de vacío, mayúsculas, tildes, espacios y sin resultados pasan.
  *Commit:* `agrega(catalogo): filtro de apps sin tildes ni mayúsculas`

- [x] **T2 · Siglas de respaldo (test primero).** `siglasApp()`.
  *Listo cuando:* "Willa Stock" → "WS", "Willa Community Center" → "WCC", texto vacío → "W".
  *Commit:* `agrega(catalogo): siglas para íconos que no cargan`

- [x] **T3 · Servicio de apps.** `AppsService` lee `/data/apps.json` y expone `apps` y `estado`.
  *Listo cuando:* test con respuesta simulada → `listo` y 11 apps; con error → `error`.
  *Commit:* `agrega(catalogo): servicio que lee la instantánea de apps`

- [x] **T4 · Componente tarjeta.** `<wl-tarjeta-app>` con ícono, `alt`, nombre, descripción (máx. 3 líneas), borde con `--color-app` e insignia si el ícono falla.
  *Listo cuando:* test que verifica `alt="Ícono de Willa Stock"`; sin colores a mano en el CSS.
  *Commit:* `agrega(catalogo): tarjeta de aplicación`

- [x] **T5 · Página `/apps`.** Título, buscador con etiqueta visible, grilla responsiva, estados de carga, error y sin resultados (`aria-live`).
  *Listo cuando:* test que muestra 11 tarjetas y el mensaje de sin resultados; se ve bien a 360 px.
  *Commit:* `agrega(catalogo): página de catálogo con buscador`

- [ ] **T6 · Verificación.** Correr `/verificar 001-catalogo-apps`.
  *Listo cuando:* existe `verificacion.md` sin requisitos ❌.
  *Commit:* `docs(001): verificación del catálogo`

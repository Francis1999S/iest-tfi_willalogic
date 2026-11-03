# 08 · Tareas

> ¿En qué orden lo hacemos?

La IA trabaja **de a una tarea**, en orden, y la marca con `[x]` al terminar. Cada tarea indica entre paréntesis el requerimiento de `02-REQUERIMIENTOS.md` que cubre.

## Etapa 1 · Preparación

- [x] Definir la identidad de marca y cargar `marca/`
- [x] Redactar el kit de especificación (`AGENTS.md` y `docs/`)
- [ ] Crear el proyecto Laravel 12 en `backend/`
- [ ] Crear los proyectos Angular 21 `sitio` y `cliente` en `frontends/`
- [ ] Cargar las variables CSS de la marca en la hoja de estilos global
- [ ] Configurar el archivo `.env` y verificar que no se versiona

## Etapa 2 · Base de datos

- [ ] Crear las migraciones de `usuarios`, `planes` y `apps`
- [ ] Crear las migraciones de `empresas`, `sucursales` y `accesos_compartidos`
- [ ] Crear las migraciones de `plan_app`, `complementos` y `codigos_verificacion`
- [ ] Cargar los datos iniciales de planes y aplicaciones
- [ ] Implementar el filtro automático por empresa y sucursal (RF12)

## Etapa 3 · Cuentas y sesión

- [ ] Registro de cuenta (RF02)
- [ ] Envío y validación del código por email (RF02)
- [ ] Inicio de sesión con verificación anti-robots (RF03)
- [ ] Vencimiento de la sesión a los 2 días (RF04)
- [ ] Recuperación de contraseña (RF16)
- [ ] Límite de peticiones en todas las rutas (RNF04)

## Etapa 4 · Empresas y sucursales

- [ ] Pantalla "Mis empresas" con tarjetas (RF05)
- [ ] Alta de empresa con elección de plan (RF05, RF06)
- [ ] Alta y edición de sucursales (RF07)
- [ ] Estado del plan y fecha de vencimiento (RF17)

## Etapa 5 · Planes, complementos y accesos

- [ ] Pantalla de comparación de planes (RF06)
- [ ] Sumar complementos: aplicación, sucursal o usuario (RF08)
- [ ] Compartir una empresa con un operador (RF09)
- [ ] Sección "Empresas compartidas" en el panel del operador (RF09)

## Etapa 6 · Facturación automática

- [ ] Tarea diaria que actualiza la cotización del dólar (RF20)
- [ ] Tarea mensual que genera las facturas (RF18)
- [ ] Registro del pago y habilitación del período (RF19)
- [ ] Pantalla de facturas de cada empresa (RF18)

## Etapa 7 · Acceso a las aplicaciones

- [ ] Grilla de aplicaciones habilitadas por sucursal (RF10)
- [ ] Pase de acceso de un solo uso entre la app cliente y cada aplicación (RF11)
- [ ] Carga de los datos dinámicos de la aplicación por su identificador (RF11)
- [ ] Encabezado con empresa y sucursal activas (RF12)
- [ ] Plantilla base que toma el color de la app en tema claro y oscuro (RF21)

## Etapa 8 · Willa Community Center

- [ ] Personalización de nombre, logo, ícono y colores (RF13)
- [ ] Registro e inicio de sesión de clientes finales (RF13)
- [ ] Vinculación de aplicaciones para clientes finales (RF14)

## Etapa 9 · Sitio público y PWA

- [ ] Sitio público con servicios, aplicaciones y planes (RF01)
- [ ] Etiquetas de título, descripción e imagen para compartir (ver `09-SEO.md`)
- [ ] Manifiesto, service worker e íconos de la PWA (RF15)

## Etapa 10 · Calidad y publicación

- [ ] Probar en celular, tableta y computadora (RNF01)
- [ ] Revisar contraste y navegación con teclado (RNF06)
- [ ] Repasar la lista de control de `10-SEGURIDAD.md`
- [ ] Publicar en el VPS con HTTPS
- [ ] Verificar que una empresa no ve datos de otra (RNF05)
- [ ] Verificar que ningún `id` interno llega al navegador (RNF09)
- [ ] Comprobar que la copia de seguridad se puede restaurar (RNF10)

## Resumen de avance

| Etapa | Tareas | Hechas |
| --- | --- | --- |
| 1 · Preparación | 6 | 2 |
| 2 · Base de datos | 5 | 0 |
| 3 · Cuentas y sesión | 6 | 0 |
| 4 · Empresas y sucursales | 4 | 0 |
| 5 · Planes, complementos y accesos | 4 | 0 |
| 6 · Facturación automática | 4 | 0 |
| 7 · Acceso a las aplicaciones | 5 | 0 |
| 8 · Willa Community Center | 3 | 0 |
| 9 · Sitio público y PWA | 3 | 0 |
| 10 · Calidad y publicación | 7 | 0 |

## Trabajo Final Integrador · Sitio público

Las tareas detalladas de cada funcionalidad están en `specs/NNN/tasks.md`.

- [ ] `001-catalogo-apps` (RF22)
- [ ] `002-planes` (RF23)
- [ ] `003-consulta-web` (RF24)
- [ ] Publicar el sitio con HTTPS y medir Lighthouse (80+ en las cuatro categorías)

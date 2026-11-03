# 04 · Arquitectura

> ¿Cómo se organiza el código?

> El árbol es **representativo**: muestra cómo se ordena el proyecto, no reproduce el repositorio real.

## Idea general

WillaLogic tiene **un solo backend** (Laravel) y **varios frontends** (Angular), todos publicados bajo el mismo dominio. Cada frontend es un proyecto independiente que se compila por separado.

## Árbol de carpetas

```text
willalogic/
├── backend/                      ← Laravel 12: única API del sistema
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/      ← reciben la petición y responden JSON
│   │   │   ├── Middleware/       ← sesión, contexto empresa-sucursal, límites
│   │   │   └── Requests/         ← validación de cada formulario
│   │   ├── Models/               ← Empresa, Sucursal, Plan, App, Usuario
│   │   ├── Scopes/               ← filtro automático por empresa y sucursal
│   │   ├── Services/             ← reglas de negocio (planes, complementos)
│   │   └── Console/              ← tareas programadas (facturas, cotización)
│   ├── database/
│   │   ├── migrations/           ← estructura de las tablas
│   │   └── seeders/              ← datos iniciales: planes y apps
│   ├── routes/
│   │   └── api.php               ← todas las rutas /api
│   └── .env                      ← secretos: no se versiona
│
├── frontends/
│   ├── sitio/                    ← sitio público (/)
│   ├── cliente/                  ← app cliente PWA (/w)
│   │   └── src/app/
│   │       ├── nucleo/           ← servicios, guardas e interceptores
│   │       ├── compartido/       ← componentes reutilizables
│   │       └── paginas/
│   │           ├── ingreso/      ← iniciar sesión, registro, verificación
│   │           ├── empresas/     ← listado, alta, detalle, compartidas
│   │           ├── sucursales/   ← sucursales y sus apps
│   │           └── planes/       ← planes y complementos
│   ├── wstock/                   ← Willa Stock (/WStock)
│   ├── wpos/                     ← Willa POS (/WPos)
│   ├── wfinance/                 ← Willa Finance (/WFinance)
│   ├── wcc/                      ← Willa Community Center (/WCC)
│   ├── plantilla-app/            ← base común: interfaz, tema claro/oscuro y color de app
│   └── ...                       ← una carpeta por aplicación
│
└── docs/                         ← este kit de especificación
```

## Función de cada parte

| Parte | Función |
| --- | --- |
| `backend/` | Única fuente de verdad: guarda los datos, aplica las reglas y decide los permisos |
| `Middleware/` | Revisa cada petición antes de que llegue al controlador |
| `Scopes/` | Agrega solo el filtro de empresa y sucursal a todas las consultas |
| `frontends/sitio/` | Presenta la marca y lleva al registro |
| `frontends/cliente/` | Panel del dueño: empresas, sucursales, planes y accesos |
| `frontends/w.../` | Cada aplicación del ecosistema, con su propia interfaz |
| `plantilla-app/` | Punto de partida de toda app nueva: ya trae la interfaz y toma el color de la app |
| `Console/` | Tareas que corren solas todos los días, sin que nadie las dispare |
| `nucleo/` | Código que se usa una sola vez por app: sesión, interceptores, guardas |
| `compartido/` | Botones, tarjetas y formularios reutilizables |

## Flujo: abrir una aplicación con contexto

```text
1. En la app cliente, la usuaria elige empresa → sucursal → aplicación.
2. La app cliente pide al backend un pase de acceso para ese contexto.
3. El backend verifica permisos y devuelve un pase de un solo uso
   que vence a los pocos segundos.
4. El navegador abre la aplicación con ese pase.
5. La aplicación lo canjea en el backend y recibe el contexto
   (empresa y sucursal) junto con sus textos y configuración.
6. Desde ahí, todas las consultas llegan filtradas por ese contexto.
```

Cada aplicación conoce su propio identificador público. Con él le pide al backend sus datos dinámicos (nombre, color, etiquetas), de modo que cambiar un texto no obliga a compilar la app de nuevo.

## Reglas de arquitectura

- Los frontends **nunca** hablan entre sí: todo pasa por `/api`.
- Ningún frontend decide permisos: solo muestra u oculta. El backend siempre vuelve a verificar.
- Una aplicación nueva es una carpeta nueva en `frontends/` y un registro nuevo en la tabla `apps`.
- La lógica de negocio va en `Services/`, no en los controladores ni en los componentes.
- Hacia el frontend solo viajan identificadores públicos (UUID). Los `id` numéricos no salen del backend.

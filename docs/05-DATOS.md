# 05 · Datos

> ¿Qué información guarda?

> Modelo **simplificado** con fines académicos. Los nombres, campos y datos son de ejemplo.

## Entidades

| Entidad | Qué representa | Se relaciona con |
| --- | --- | --- |
| `usuarios` | Cada persona con cuenta | Es dueña de empresas o accede a empresas compartidas |
| `empresas` | Una organización pública o privada | Pertenece a un usuario, tiene un plan y sucursales |
| `sucursales` | Un espacio interno de la empresa | Pertenece a una empresa |
| `planes` | Conjunto de apps a un precio | Incluye varias apps |
| `apps` | Cada aplicación Willa | Está incluida en planes o se suma como complemento |
| `complementos` | Extras contratados por una empresa | App, sucursal o usuario adicional |
| `accesos_compartidos` | Permiso de un operador sobre una empresa | Une usuario, empresa y rol |
| `codigos_verificacion` | Código enviado por email | Pertenece a un usuario |
| `facturas` | Cobro mensual de una empresa | Pertenece a una empresa |
| `cotizaciones` | Valor del dólar de cada día | La usan las facturas |

## Relaciones

```text
usuarios 1 ─── N empresas 1 ─── N sucursales
                   │
                   ├── N ─── 1 planes N ─── N apps
                   ├── 1 ─── N complementos
                   └── 1 ─── N accesos_compartidos N ─── 1 usuarios
```

## Tablas

```sql
-- Esquema de ejemplo (MySQL)

CREATE TABLE usuarios (
  id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- interno
  uuid             CHAR(36)     NOT NULL UNIQUE,               -- público
  nombre           VARCHAR(120) NOT NULL,
  email            VARCHAR(160) NOT NULL UNIQUE,
  clave            VARCHAR(255) NOT NULL,      -- siempre cifrada
  email_verificado TINYINT(1)   NOT NULL DEFAULT 0,
  creado_en        TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE planes (
  id             BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre         VARCHAR(60)   NOT NULL,
  precio         DECIMAL(12,2) NOT NULL DEFAULT 0,
  max_sucursales INT           NOT NULL DEFAULT 1,
  max_usuarios   INT           NOT NULL DEFAULT 1
);

CREATE TABLE apps (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid        CHAR(36)      NOT NULL UNIQUE,  -- identificador público
  nombre      VARCHAR(80)   NOT NULL,
  ruta        VARCHAR(40)   NOT NULL UNIQUE,
  descripcion VARCHAR(255),
  color       CHAR(7)       NOT NULL,
  version     VARCHAR(12)   NOT NULL DEFAULT '0.0.1',
  precio      DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE empresas (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid       CHAR(36)        NOT NULL UNIQUE,
  usuario_id BIGINT UNSIGNED NOT NULL,        -- dueño
  plan_id    BIGINT UNSIGNED NOT NULL,
  nombre     VARCHAR(120) NOT NULL,
  tipo       ENUM('privada','publica') NOT NULL DEFAULT 'privada',
  vence_el   DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (plan_id)    REFERENCES planes(id)
);

CREATE TABLE sucursales (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid       CHAR(36)        NOT NULL UNIQUE,
  empresa_id BIGINT UNSIGNED NOT NULL,
  nombre     VARCHAR(120) NOT NULL,
  direccion  VARCHAR(160),
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

CREATE TABLE accesos_compartidos (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  empresa_id BIGINT UNSIGNED NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,        -- operador
  rol        ENUM('administrador','operador','lectura') NOT NULL,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  UNIQUE (empresa_id, usuario_id)
);

CREATE TABLE facturas (
  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  uuid        CHAR(36)        NOT NULL UNIQUE,
  empresa_id  BIGINT UNSIGNED NOT NULL,
  periodo     CHAR(7)         NOT NULL,       -- '2026-10'
  importe_usd DECIMAL(12,2)   NOT NULL DEFAULT 0,
  cotizacion  DECIMAL(12,2)   NOT NULL DEFAULT 0,
  importe_ars DECIMAL(14,2)   NOT NULL DEFAULT 0,
  estado      ENUM('pendiente','pagada','vencida') NOT NULL DEFAULT 'pendiente',
  FOREIGN KEY (empresa_id) REFERENCES empresas(id),
  UNIQUE (empresa_id, periodo)
);

-- también: plan_app, complementos, codigos_verificacion y cotizaciones
```

## Datos de ejemplo

### Aplicaciones

Los nombres, rutas y colores corresponden al catálogo público. Los precios quedan en `$ 0` como marcador.

| nombre | ruta | color | precio |
| --- | --- | --- | --- |
| Willa Finance | `WFinance` | `#C62828` | $ 0 |
| Willa Stock | `WStock` | `#244A85` | $ 0 |
| Willa POS | `WPos` | `#5FA800` | $ 0 |
| Willa Sessions | `WAgenda` | `#832171` | $ 0 |
| Willa Community Center | `WCC` | `#F00054` | $ 0 |
| Willa Personas | `WPersonas` | `#00489C` | $ 0 |
| Willa Sport | `WSport` | `#95FF00` | $ 0 |
| Willa Trámites | `WTramites` | `#00B2D6` | $ 0 |
| Willa Catálogo | `WCatalogo` | `#8300CF` | $ 0 |
| Willa Puntos | `WPuntos` | `#FFB300` | $ 0 |
| Willa Stream | `WStream` | `#D44200` | $ 0 |

### Una empresa ficticia

```sql
INSERT INTO planes (nombre, precio, max_sucursales, max_usuarios)
VALUES ('Comercio', 0, 2, 3);

INSERT INTO empresas (uuid, usuario_id, plan_id, nombre, tipo, vence_el)
VALUES (UUID(), 1, 1, 'Almacén El Algarrobo', 'privada', '2026-12-31');

INSERT INTO sucursales (uuid, empresa_id, nombre, direccion)
VALUES (UUID(), 1, 'Centro', 'Calle Ejemplo 123'),
       (UUID(), 1, 'Barrio Norte', 'Calle Ejemplo 456');

INSERT INTO accesos_compartidos (empresa_id, usuario_id, rol)
VALUES (1, 2, 'operador');
```

## Reglas sobre los datos

- Cada registro tiene dos identificadores: un `id` numérico, que se usa **solo dentro del backend**, y un `uuid`, que es el único que viaja al frontend.
- Toda tabla de una aplicación lleva `empresa_id` y `sucursal_id`.
- Los precios se guardan en dólares. El importe en pesos se calcula con la cotización del día y queda registrado en la factura.
- Además de estas tablas, Laravel crea las suyas para sesiones y tokens, tareas en cola y caché. No se modifican a mano.
- Ninguna consulta se escribe sin ese filtro: lo aplica el backend de forma automática.
- Las contraseñas se guardan cifradas con un algoritmo de una sola vía; nunca en texto plano.
- Los códigos de verificación vencen a los pocos minutos y sirven una sola vez.
- Nada se borra de forma definitiva: las bajas son lógicas, para poder auditar.

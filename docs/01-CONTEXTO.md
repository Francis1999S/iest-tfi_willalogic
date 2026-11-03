# 01 · Contexto

> ¿Por qué existe y para quién es?

## Problema

En Tinogasta y en buena parte del interior, los comercios y las organizaciones llevan su gestión con cuadernos, planillas sueltas y mensajes de WhatsApp. Cuando quieren ordenarse se encuentran con dos caminos malos:

- Programas distintos para cada tarea (uno para stock, otro para caja, otro para turnos), que no se conectan entre sí y obligan a cargar todo dos veces.
- Un desarrollo a medida, que resulta caro y lento para un negocio chico.

Además, quien tiene más de un local o más de un negocio no puede ver todo desde un mismo lugar.

## Objetivo

Ofrecer una única plataforma en la que una persona:

1. Crea su cuenta y registra sus empresas.
2. Asocia cada empresa a un plan que habilita un conjunto de aplicaciones.
3. Abre esas aplicaciones desde cada sucursal, con sus datos separados y conectados entre sí.

## Público

| Público | Qué necesita | Ejemplo |
| --- | --- | --- |
| Dueño de comercio o pyme | Controlar stock, ventas y caja sin saber de sistemas | Un kiosco con dos locales |
| Organización pública o social | Ordenar trámites, turnos y atención a vecinos | Un municipio, un club |
| Operador | Usar solo la app y la sucursal que le asignaron | Un cajero, un empleado de mesa de entradas |
| Cliente final | Acceder a "la app" de la organización desde su celular | Un socio que reserva una cancha |

## Productos y servicios

### La plataforma

- **Sitio público:** presenta servicios, aplicaciones y planes.
- **App cliente (PWA):** el panel donde el dueño administra empresas, sucursales, planes, complementos y accesos.
- **Empresas compartidas:** el dueño da acceso a otras personas como operadores, con rol y permisos limitados.
- **Facturación automática:** cada mes el sistema genera la factura, registra el pago y habilita el período sin intervención manual.
- **Precios en dólares:** todos los costos están dolarizados y se convierten a pesos con la cotización del día.

### Las aplicaciones Willa

| Aplicación | Para qué sirve | Quién la usa |
| --- | --- | --- |
| Willa Stock | Gestión de inventario | La organización |
| Willa POS | Punto de venta para negocios | La organización |
| Willa Finance | Finanzas de la empresa | La organización |
| Willa Sessions | Gestión de turnos | La organización |
| Willa Personas | Gestión básica de recursos humanos | La organización |
| Willa Catálogo | Publicación de productos en un catálogo público | La organización y sus clientes |
| Willa Trámites | Gestión general de trámites | La organización y sus clientes |
| Willa Puntos | Fidelización por puntos para comercios | La organización y sus clientes |
| Willa Sport | Gestión de complejos deportivos | La organización y sus clientes |
| Willa Stream | Transmisiones en vivo y generación de videos cortos | La organización y sus clientes |
| Willa Community Center | La "app propia" de cada organización | Los clientes de la organización |

Willa Stock, Willa POS y Willa Finance se relacionan entre sí: una venta en el punto de venta descuenta stock y se registra en finanzas.

### Willa Community Center (WCC)

Es la aplicación que conecta todo el ecosistema. Permite que cada organización tenga su propia app instalable, con su nombre, logo, ícono y colores. Sus clientes se registran, inician sesión y usan desde ahí las aplicaciones que la organización decidió vincular (trámites, puntos, deportes, transmisiones).

### Servicios

Desarrollo de software a medida e integraciones por API. La automatización con inteligencia artificial y los chatbots con datos de cada empresa son el próximo paso (ver "No incluye").

## Propuesta de valor

- **Todo en un lugar:** una cuenta, varias empresas, varias sucursales.
- **Ágil como una liebre:** *Willa* significa "liebre" en kakán; la plataforma busca ser rápida y precisa.
- **Pagás lo que usás:** un plan base y complementos que se suman cuando hacen falta.
- **Hecho acá:** soporte cercano, en el mismo idioma y huso horario que el cliente.
- **Sin ataduras:** prueba gratis de una semana y sin permanencia mínima.

## No incluye (por ahora)

- El funcionamiento interno de cada aplicación: cada una tiene su propio kit de especificación.
- Aplicaciones nativas publicadas en tiendas (App Store, Google Play): se usa PWA instalable.
- Facturación electrónica ante ARCA.
- Inteligencia artificial integrada a las aplicaciones (por ejemplo, chatbots que respondan con datos de la empresa): es el próximo paso.
- El panel de administración interno: es privado y no se documenta en este kit.
- Interfaz en otros idiomas además del español.
- Modo sin conexión con sincronización de datos.

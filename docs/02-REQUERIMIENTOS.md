# 02 · Requerimientos

> ¿Qué tiene que hacer?

## Requerimientos funcionales

| ID | Requerimiento funcional | Prioridad |
| --- | --- | --- |
| RF01 | Mostrar el sitio público con servicios, aplicaciones y planes | Alta |
| RF02 | Registrar una cuenta y verificarla con un código enviado por email | Alta |
| RF03 | Iniciar sesión con email y contraseña, con verificación anti-robots | Alta |
| RF04 | Cerrar la sesión de forma automática a los 2 días | Alta |
| RF05 | Crear, editar y dar de baja empresas | Alta |
| RF06 | Asociar cada empresa a un plan | Alta |
| RF07 | Crear sucursales dentro de una empresa | Alta |
| RF08 | Sumar complementos a una empresa: aplicaciones, sucursales o usuarios extra | Media |
| RF09 | Compartir una empresa con otro usuario como operador, con rol y accesos limitados | Alta |
| RF10 | Listar las aplicaciones habilitadas para la sucursal elegida | Alta |
| RF11 | Abrir una aplicación con la empresa y la sucursal como contexto, sin volver a iniciar sesión | Alta |
| RF12 | Mostrar en cada aplicación solo los datos de la empresa y sucursal activas | Alta |
| RF13 | Personalizar Willa Community Center: nombre, logo, ícono y colores | Media |
| RF14 | Vincular aplicaciones a Willa Community Center para que las usen los clientes finales | Media |
| RF15 | Instalar la app cliente y Willa Community Center en el celular como PWA | Media |
| RF16 | Recuperar la contraseña mediante un código enviado por email | Media |
| RF17 | Ver el estado del plan y la fecha de vencimiento de cada empresa | Baja |
| RF18 | Generar cada mes la factura de cada empresa de forma automática | Alta |
| RF19 | Registrar el pago y habilitar el período sin intervención manual | Alta |
| RF20 | Convertir los precios de dólares a pesos con la cotización del día | Media |
| RF21 | Identificar cada aplicación con su color e ícono, en tema claro y oscuro | Media |
| RF22 | Mostrar el catálogo de aplicaciones Willa con buscador por nombre o descripción | Alta |
| RF23 | Mostrar los planes con su precio en dólares y su equivalente en pesos | Alta |
| RF24 | Enviar una consulta "Quiero mi web" validada que abre WhatsApp con el mensaje armado | Alta |

> RF22, RF23 y RF24 son las funcionalidades del Trabajo Final Integrador (sitio público `iest-tfi_willalogic`). Se especifican en `specs/`.

## Historias de usuario

### Abrir una aplicación (RF10, RF11, RF12)

Como **dueña de un comercio con dos locales**, quiero **abrir Willa Stock desde la sucursal Centro** para **ver solamente el inventario de ese local**.

Criterios de aceptación:

- [ ] Al elegir la sucursal se muestran solo las aplicaciones que el plan y los complementos habilitan.
- [ ] La aplicación se abre sin pedir usuario y contraseña otra vez.
- [ ] El encabezado de la aplicación muestra el nombre de la empresa y de la sucursal.
- [ ] Ningún dato de la otra sucursal aparece en pantalla.
- [ ] Si el enlace de acceso se reutiliza o tarda demasiado, se rechaza y se vuelve al panel.

### Compartir una empresa (RF09)

Como **dueño**, quiero **darle acceso a mi empleado solo al punto de venta** para **que cobre sin ver las finanzas**.

Criterios de aceptación:

- [ ] El dueño ingresa el email del operador y elige rol, sucursales y aplicaciones.
- [ ] El operador ve la empresa en su panel, dentro de "Empresas compartidas".
- [ ] El operador no puede cambiar el plan, sumar complementos ni invitar a otros.
- [ ] El dueño puede quitar el acceso en cualquier momento.

### Tener una app propia (RF13, RF14)

Como **responsable de un club**, quiero **que mis socios instalen una app con el nombre y los colores del club** para **que reserven canchas y hagan trámites desde el celular**.

Criterios de aceptación:

- [ ] El club carga nombre, logo, ícono y colores, y ve una vista previa.
- [ ] Los socios se registran e inician sesión dentro de la app del club.
- [ ] Los socios ven solo las aplicaciones que el club vinculó.

## Requerimientos no funcionales

- **RNF01 · Adaptable:** se usa bien en celular, tableta y computadora, desde 360 px de ancho.
- **RNF02 · Rápido:** la pantalla inicial carga en menos de 3 segundos con conexión 4G.
- **RNF03 · Disponible:** el servicio está en línea el 99,9 % del tiempo.
- **RNF04 · Seguro:** todas las peticiones viajan por HTTPS y tienen límite de frecuencia (ver `10-SEGURIDAD.md`).
- **RNF05 · Aislado:** los datos de una empresa nunca son visibles para otra.
- **RNF06 · Accesible:** contraste mínimo AA, navegación completa con teclado y textos alternativos en las imágenes.
- **RNF07 · Instalable:** cumple los requisitos de una PWA (manifiesto, service worker e íconos).
- **RNF08 · Mantenible:** una aplicación nueva se suma sin modificar las existentes.
- **RNF09 · Reservado:** los identificadores internos nunca salen del backend; hacia afuera solo viajan identificadores públicos (UUID).
- **RNF10 · Respaldado:** la base de datos tiene copias de seguridad automáticas.

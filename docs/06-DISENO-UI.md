# 06 · Diseño de interfaz

> ¿Cómo se ven las pantallas?

Todos los colores, fuentes y radios salen de `IDENTIDAD-MARCA.md`. Acá se explica **cómo se aplican**.

## Pantallas

| Ruta | Pantalla | Qué muestra |
| --- | --- | --- |
| `/` | Sitio público | Portada, servicios, aplicaciones estrella, planes, nosotros |
| `/w` | Iniciar sesión | Logo, email, contraseña y verificación anti-robots |
| `/w/registro` | Crear cuenta | Datos básicos y aceptación de términos |
| `/w/verificar` | Verificar email | Campo para el código de 6 dígitos |
| `/w/empresas` | Mis empresas | Tarjetas de empresas propias y compartidas |
| `/w/empresas/nueva` | Nueva empresa | Nombre, tipo y elección de plan |
| `/w/empresas/:id` | Detalle de empresa | Plan, vencimiento, sucursales, complementos y accesos |
| `/w/empresas/:id/sucursales/:id` | Sucursal | Grilla de aplicaciones habilitadas |
| `/w/empresas/:id/compartir` | Compartir empresa | Email del operador, rol, sucursales y aplicaciones |
| `/w/planes` | Planes y complementos | Comparación de planes y extras disponibles |
| `/w/facturas` | Facturación | Facturas de cada empresa, con importe y estado |
| `/WCC/personalizar` | Personalizar Community Center | Nombre, logo, ícono, colores y vista previa |

## Estructura general

- **Tema oscuro:** fondo `--bg-primary` en toda la aplicación.
- **Encabezado:** logo horizontal a la izquierda, usuario y menú a la derecha, con una línea inferior fina.
- **Contenido:** ancho máximo de 1200 px, centrado.
- **Grillas:** 4 columnas en computadora, 2 en tableta y 1 en celular.

## Componentes

### Botones

| Tipo | Fondo | Texto | Uso |
| --- | --- | --- | --- |
| Primario | Degradado de Dorado Willa a Bronce Lógica | Negro | La acción principal de la pantalla: "Crear empresa" |
| Secundario | Transparente con borde `--gold-brand` de 2 px | `--text-muted` | Acciones alternativas: "Ya tengo cuenta" |
| Peligro | Transparente con borde `--color-error` | `--color-error` | Acciones que no se deshacen: "Quitar acceso" |

- Radio de borde: 16 px. Relleno interno: 10 px.
- Al pasar el cursor, el botón primario se aclara y suma un resplandor dorado suave.
- Solo **un** botón primario por pantalla.

### Tarjetas

- Fondo `--bg-card`, borde dorado al 20 % de opacidad y radio `--radius`.
- Al pasar el cursor, el fondo se aclara apenas.
- **Tarjeta de empresa:** nombre, plan, cantidad de sucursales y una etiqueta "Propia" o "Compartida".
- **Tarjeta de aplicación:** ícono, nombre y descripción corta. El borde izquierdo lleva el color propio de la app.
- **Tarjeta de factura:** período, importe en dólares, importe en pesos y estado (pendiente, pagada o vencida).

### Formularios

- Etiqueta arriba del campo, alineada a la izquierda.
- Campo con fondo transparente, borde `--gold-brand` de 2 px y radio de 16 px.
- El mensaje de error aparece debajo del campo, en `--color-error`, y explica cómo corregirlo.
- El código de verificación se ingresa en 6 casillas separadas.

### Títulos

- H1 en Inter 800, color `--text-white`.
- La palabra clave del título va en `--gold`, sin cursiva.
- Un solo H1 por pantalla.

## Uso del color

| Color | Se usa para | No se usa para |
| --- | --- | --- |
| Noche Profunda | Fondo general | Textos |
| Azul Pizarra | Tarjetas y paneles | Botones |
| Dorado Willa | Bordes, botones y logo | Párrafos largos |
| Oro Claro | Palabras destacadas y enlaces | Fondos grandes |
| Blanco Niebla | Títulos y textos | Fondos |
| Gris Bruma | Descripciones y ayudas | Títulos |

## Ejemplo: tarjeta de aplicación

```html
<article class="tarjeta-app" style="--color-app: #244A85">
  <img src="/apps/willastock.jpg" alt="Ícono de Willa Stock" />
  <h3>Willa Stock</h3>
  <p>Gestión de inventario</p>
  <button class="boton-primario">Abrir</button>
</article>
```

```css
.tarjeta-app {
  background: var(--bg-card);
  border: 1px solid rgba(201, 168, 76, 0.2);
  border-left: 4px solid var(--color-app);
  border-radius: var(--radius);
  color: var(--text-white);
}
```

## El color de cada aplicación

Todas las aplicaciones nacen de una misma plantilla Angular. La plantilla recibe **un solo dato**, el color de la app, y con él arma sola el resto: variantes más claras y más oscuras, color del texto que va encima y versiones para tema claro y tema oscuro.

```css
:root {
  --color-app: #244A85;                                   /* llega del backend */
  --color-app-suave:  color-mix(in srgb, var(--color-app) 15%, transparent);
  --color-app-fuerte: color-mix(in srgb, var(--color-app) 80%, black);
}
```

Así, una aplicación nueva no necesita diseño propio: alcanza con elegir su color y su ícono.

## Willa Community Center: marca blanca

Es la única pantalla en la que **no** manda la paleta de WillaLogic. Cada organización define sus colores y la interfaz los toma de variables propias:

```css
:root {
  --marca-principal: #1B5E20;  /* lo elige la organización */
  --marca-acento:    #FFC107;
  --marca-fondo:     #FFFFFF;
}
```

La estructura, los tamaños y los componentes siguen siendo los de este documento.

## Accesibilidad

- Contraste mínimo de 4,5 a 1 entre texto y fondo.
- Todo control se alcanza con la tecla Tab y muestra un foco visible.
- Los íconos que son botones llevan un texto alternativo.
- Las animaciones se desactivan si el sistema pide movimiento reducido.

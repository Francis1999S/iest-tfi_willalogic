# Manual de identidad: WillaLogic

> ¿Cómo nos vemos y cómo hablamos?

## Esencia

- **Nombre:** WillaLogic (se escribe junto, con W y L mayúsculas).
- **Significado:** *Willa* significa "liebre" en kakán, la lengua de los pueblos diaguitas del noroeste argentino. *Logic* es "lógica" en inglés. La marca toma de la liebre sus cualidades: velocidad, agilidad, precisión, reflejos y destreza.
- **Eslogan:** "Arquitectura digital para empresas que escalan."
- **Misión:** crear tecnología que trabaje por las organizaciones, para que su gente pueda enfocarse en lo que importa.
- **Visión:** ser la plataforma de gestión elegida por las empresas y organismos del interior argentino, demostrando que desde Tinogasta se puede construir software de primer nivel.
- **Personalidad:** ágil, precisa, cercana, ambiciosa.
- **Público:** dueños de comercios y pymes, y responsables de organizaciones públicas y privadas que necesitan ordenar su gestión sin contratar un desarrollo a medida.
- **Origen:** Tinogasta, Catamarca, Argentina. Fundada en 2025.

## Logo

![Logo de WillaLogic](../marca/logo-willalogic.png)

El logo combina un **isotipo** y un **logotipo**. El isotipo es la letra W con las dos **orejas de una liebre** asomando por encima y una línea de base. El logotipo es la palabra "WILLALOGIC" en mayúsculas geométricas.

| Versión | Composición | Dónde se usa |
| --- | --- | --- |
| Vertical | Isotipo arriba y logotipo abajo | Portadas, pantalla de inicio de sesión, documentos |
| Horizontal | Isotipo a la izquierda y logotipo a la derecha | Encabezado del sitio y de las apps |
| Isotipo | Solo la W con las orejas | Favicon, ícono de la PWA, avatar en redes |

Reglas de uso:

- Área de seguridad: dejar libre alrededor del logo un espacio igual a la altura de la línea de base del isotipo.
- Tamaño mínimo digital: 32 px de alto para el isotipo y 120 px de ancho para la versión horizontal.
- En el logotipo, "WILLA" va en Dorado Willa y "LOGIC" en Bronce Lógica.
- El logo se usa sobre fondos oscuros (Noche Profunda) o sobre blanco.

La IA nunca debe:

- Deformar, rotar ni recolorear el logo.
- Agregarle sombras, brillos o contornos nuevos.
- Ubicarlo sobre fondos dorados o marrones, donde pierde contraste.
- Reescribir "WILLALOGIC" con otra tipografía: siempre se usa el archivo de `marca/`.

## Colores

La interfaz es de **tema oscuro**: fondos azul noche y acentos dorados. Los dorados y marrones salen del logo y representan el pelaje de la liebre y el paisaje árido del oeste de Catamarca. La lámina completa está en `marca/paleta.png`.

| Nombre | HEX | RGB | Uso | Proporción |
| --- | --- | --- | --- | --- |
| Noche Profunda | `#0B0E14` | 11, 14, 20 | Fondo dominante | 60 % |
| Azul Pizarra | `#131926` | 19, 25, 38 | Tarjetas, paneles y formularios | 30 % |
| Dorado Willa | `#CAA97A` | 202, 169, 122 | Logo, bordes de campos y botones | 5 % |
| Oro Claro | `#F4DD9E` | 244, 221, 158 | Palabras destacadas y llamados a la acción | 3 % |
| Bronce Lógica | `#80623B` | 128, 98, 59 | Logo ("LOGIC") y degradados | 2 % |

Se aplica la regla 60-30-10: 60 % de fondo, 30 % de superficies y 10 % de dorados.

Colores de texto:

| Nombre | HEX | Uso |
| --- | --- | --- |
| Blanco Niebla | `#F0F0F0` | Títulos y textos principales |
| Gris Bruma | `#8A94A8` | Textos de apoyo y descripciones |

Colores de estado (solo avisan, no decoran):

| Estado | HEX | Ejemplo |
| --- | --- | --- |
| Correcto | `#4CAF50` | "Empresa creada" |
| Atención | `#FFB300` | "Tu plan vence en 3 días" |
| Error | `#EF5350` | "El código no es válido" |

Cada aplicación del ecosistema tiene además un color y un ícono propios que la distinguen (ver `05-DATOS.md`). En el panel de WillaLogic ese color se usa solo en el ícono y el borde de la tarjeta. Dentro de cada aplicación, la plantilla Angular toma ese color y calcula sola sus variantes para tema claro y tema oscuro.

## Tipografía

| Uso | Fuente | Peso | Motivo |
| --- | --- | --- | --- |
| Títulos, botones y textos | **Inter** | 400, 600 y 800 | Diseñada para pantallas: muy legible en tamaños chicos y con números claros para tablas |
| Respaldo | **Roboto** | 400 y 700 | Viene instalada en Android; mantiene el aspecto si Inter no carga |

Ambas tienen licencia abierta, así que se pueden usar en la web sin restricciones. La jerarquía se marca con **peso y tamaño**, no cambiando de familia. Las palabras clave de un título van en Oro Claro, sin cursiva.

Orden de carga completo:

```css
font-family: Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;
```

## Tono de voz

Hablamos de **vos**, en español rioplatense, con frases cortas.

| Somos | No somos |
| --- | --- |
| Claros: "Creá tu empresa en dos pasos." | Técnicos de más: "Instancie un tenant." |
| Cercanos: "¿Te ayudamos?" | Distantes: "Estimado usuario:" |
| Seguros: "Tus datos están protegidos." | Exagerados: "¡¡La mejor app del mundo!!" |
| Concretos: "Sin permanencia mínima." | Vagos: "Soluciones integrales." |

Frases propias de la marca:

- "Tecnología que trabaja por vos."
- "Sin compromisos, sin tecnicismos. Solo resultados."

## Variables para el código

Copiar tal cual en la hoja de estilos global. La IA usa **siempre** estas variables.

```css
:root {
  --bg-primary:   #0b0e14;  /* Noche Profunda */
  --bg-secondary: #0f1520;
  --bg-card:      #131926;  /* Azul Pizarra */
  --gold:         #f4dd9e;  /* Oro Claro */
  --gold-brand:   #caa97a;  /* Dorado Willa */
  --bronze:       #80623b;  /* Bronce Lógica */
  --text-white:   #f0f0f0;  /* Blanco Niebla */
  --text-muted:   #8a94a8;  /* Gris Bruma */

  --color-correcto: #4caf50;
  --color-atencion: #ffb300;
  --color-error:    #ef5350;

  --radius:    14px;
  --radius-sm: 8px;
}
```

Si la marca cambia un color, se edita una sola línea y se actualiza todo el sistema.

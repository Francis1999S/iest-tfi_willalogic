# Constitución del proyecto

> El agente lee este archivo antes de cada spec, plan o tarea. Cada principio se puede comprobar.

1. **Stack fijo.** El sitio se construye con Angular 21 (componentes standalone) y TypeScript estricto. No se agregan librerías que no figuren en `docs/03-TECNOLOGIAS.md`.
   *Se comprueba:* `package.json` no tiene dependencias fuera de las del CLI de Angular; `tsconfig.json` tiene `"strict": true`; no hay `any`.

2. **La marca sale de los tokens.** Todo color, fuente y radio se toma de las variables CSS de `docs/IDENTIDAD-MARCA.md`. Sin cursivas.
   *Se comprueba:* no hay códigos `#hex` ni `rgb()` fuera de `src/styles/tokens.css` (salvo el color propio de cada app, que llega como dato).

3. **Capas separadas.** Los componentes muestran; los servicios obtienen y transforman datos; las funciones puras (filtros, cálculos, validaciones) viven en archivos propios y no dependen de Angular.
   *Se comprueba:* ningún componente usa `HttpClient` directamente; las funciones puras tienen tests.

4. **Tests primero.** Cada tarea que agrega lógica empieza por su test. Ninguna tarea se cierra con tests en rojo ni con el build roto.
   *Se comprueba:* `npm test` y `npm run build` pasan en cada commit.

5. **Seguridad y datos.** No hay secretos en el repositorio. Toda entrada del usuario se valida y se codifica antes de usarse en una URL. No se usa `innerHTML` con datos externos. El sitio no guarda datos personales.
   *Se comprueba:* `.gitignore` incluye `.env*`; el mensaje de WhatsApp pasa por `encodeURIComponent`; búsqueda de `innerHTML` sin resultados.

6. **Accesible y mobile first.** Se diseña desde 360 px. Contraste AA, navegación completa con teclado, foco visible y texto alternativo en todas las imágenes.
   *Se comprueba:* Lighthouse con 80 o más en Rendimiento, Accesibilidad, Buenas prácticas y SEO.

7. **Español rioplatense.** Textos de la interfaz, comentarios y commits en español, con el tono de la marca. Términos técnicos del framework en inglés.
   *Se comprueba:* revisión de los textos y del historial de commits.

8. **Uso responsable de la IA.** La IA propone; el autor decide. Ningún código se acepta sin leerlo y entenderlo, ningún comando se ejecuta sin revisarlo, y en los prompts nunca se pegan datos personales, claves ni código privado del núcleo de WillaLogic. Toda pieza generada con IA se identifica como tal en el sitio.
   *Se comprueba:* `docs/PROMPTS.md` y `docs/DECLARACION-IA.md` al día; leyenda «Generado con IA» en cada imagen generada.

# Tareas 003 · Consulta «Quiero mi web»

- [x] **T1 · Armado del mensaje y enlace (test primero).** `limpiar`, `armarMensaje`, `enlaceWhatsApp`, constantes.
  *Listo cuando:* tests de mensaje completo, sin opcionales y con `&`/`#` pasan.
  *Commit:* `agrega(consulta): armado del mensaje de WhatsApp`

- [x] **T2 · Interés desde la URL (test primero).** `interesDesdeUrl` con lista blanca.
  *Listo cuando:* «Plan Escala» se acepta; `<script>` y valores desconocidos se ignoran.
  *Commit:* `agrega(consulta): plan elegido desde la página de planes`

- [x] **T3 · Validaciones (test primero).** Reglas y mensajes de error.
  *Listo cuando:* tests de largos y obligatorios pasan.
  *Commit:* `agrega(consulta): validación del formulario`

- [ ] **T4 · Página `/consulta`.** Formulario con etiquetas visibles, errores con `aria-describedby`, contador del mensaje, aviso «No guardamos tus datos…», botón «Enviar por WhatsApp».
  *Listo cuando:* test que no abre WhatsApp con errores y sí con datos válidos; navegable con Tab.
  *Commit:* `agrega(consulta): página de consulta`

- [ ] **T5 · Inicio y navegación.** Página de inicio (`/`) con hero, accesos a Apps, Planes y Consulta, imágenes con leyenda «Generado con IA», metadatos SEO (`09-SEO.md`), `robots.txt` y `sitemap.xml`.
  *Listo cuando:* Lighthouse ≥ 80 en las cuatro categorías en local.
  *Commit:* `agrega(sitio): inicio, navegación y SEO`

- [ ] **T6 · Verificación.** `/verificar 003-consulta-web`.
  *Commit:* `docs(003): verificación de la consulta`

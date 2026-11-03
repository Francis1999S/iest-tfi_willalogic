# Spec 003 · Consulta «Quiero mi web»

> Fase 1 · Cubre **RF24** · Estado: aprobada tras clarificación (2026-11-03) · Cambio: RF-003-11 y 12 (2026-11-03)

## Contexto

Los comerciantes contactan a WillaLogic por WhatsApp. El formulario los ayuda a enviar una consulta completa (quién es, qué negocio tiene, qué necesita) en un solo mensaje, sin que el sitio guarde ningún dato: valida los campos, arma el texto y abre WhatsApp con el mensaje listo para enviar.

## Historias de usuario

- **HU-003-1.** Como dueño de una despensa, quiero dejar mis datos y lo que necesito en un formulario corto, para que me respondan sin tener que explicar todo de nuevo.
- **HU-003-2.** Como interesada que viene de la página de planes, quiero que el plan elegido ya aparezca seleccionado.
- **HU-003-3.** Como usuario que se equivoca al completar, quiero saber exactamente qué corregir.

## Requisitos (EARS)

| ID | Requisito |
| --- | --- |
| RF-003-01 | El sistema deberá mostrar, en la ruta `/consulta`, un formulario con: nombre, nombre del negocio, rubro, localidad, interés y mensaje. |
| RF-003-02 | El sistema deberá ofrecer como «interés»: «Página web ($34.999 el primer año)», «Plan Crecimiento», «Plan Escala», «Plan E-Gov» y «Soporte técnico». |
| RF-003-03 | Cuando la ruta trae `?plan=<nombre>` y el plan existe en la lista, el sistema deberá dejarlo elegido como interés. |
| RF-003-04 | El sistema deberá exigir nombre (2 a 60 caracteres), nombre del negocio (2 a 80), interés elegido y mensaje (hasta 500). Rubro y localidad son opcionales (hasta 60). |
| RF-003-05 | Si un campo no es válido al salir de él o al enviar, entonces el sistema deberá mostrar debajo un mensaje que explique cómo corregirlo y asociarlo al campo para lectores de pantalla. |
| RF-003-06 | Mientras haya campos inválidos, el sistema no deberá abrir WhatsApp. |
| RF-003-07 | Cuando el formulario es válido y el usuario elige «Enviar por WhatsApp», el sistema deberá abrir `https://wa.me/5493837693573` con el mensaje armado y codificado. |
| RF-003-08 | El sistema deberá armar el mensaje con el formato: «Hola WillaLogic, soy [nombre] de [negocio] ([rubro], [localidad]). Me interesa: [interés]. [mensaje]», omitiendo rubro y localidad si están vacíos. |
| RF-003-09 | El sistema deberá quitar espacios sobrantes de todos los campos antes de validar y de armar el mensaje. |
| RF-003-10 | El sistema no deberá guardar ni enviar los datos a ningún servidor, y deberá informarlo con el texto «No guardamos tus datos: la consulta se envía directamente desde tu WhatsApp.». |
| RF-003-11 | El sistema deberá mostrar en la página de inicio el video promocional de WillaLogic (`https://youtu.be/SCc0Tm5Ud_o`) con un título accesible, un enlace para verlo en YouTube y la leyenda «Generado con IA: clips de VidoGrid (Veo 3.1) y voz de ElevenLabs, editado por el autor.». |
| RF-003-12 | Si el reproductor del video no carga, entonces el sistema deberá seguir ofreciendo el enlace al video en YouTube. |

> **Cambio (2026-11-03):** se agregan RF-003-11 y RF-003-12 a pedido de la cátedra: el video promocional tiene que estar en el sitio. El inicio se construyó en la T5 de esta spec, por eso el requisito vive acá. La leyenda cumple el principio 8 de la constitución (toda pieza generada con IA se identifica en el sitio). El reproductor usa `youtube-nocookie.com` con la URL fija en la plantilla, sin `bypassSecurityTrust*` (principio 5), y carga diferida para no afectar el rendimiento.

## Casos límite

- Texto con `&`, `?`, `#` o saltos de línea → el enlace de WhatsApp no se rompe.
- Emojis en el mensaje → se envían bien.
- `?plan=` con un valor inexistente o con código → se ignora.
- Mensaje de 501 caracteres → error y contador visible.
- En celular, WhatsApp se abre en la app; en escritorio, en WhatsApp Web.

## Fuera de alcance

- Envío por email o guardado en base de datos.
- reCAPTCHA (no hay servidor que atacar).
- Adjuntar archivos o fotos.

## Criterios de finalización

- [ ] Los 10 requisitos ✅ o 🖐 verificada.
- [ ] Tests de validación y de armado del mensaje (incluido `&` y `#`) en verde.
- [ ] Probado a mano en celular: abre WhatsApp con el texto correcto.
- [ ] Navegable entero con teclado.

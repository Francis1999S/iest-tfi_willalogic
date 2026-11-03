/** Número público de WhatsApp de WillaLogic (no es un secreto: clarificación C7 de 003). */
export const WHATSAPP = '5493837693573';

/** Precio de la página web; se actualiza solo acá (clarificación C5 de 003). */
export const PRECIO_PAGINA_WEB = '$34.999';

/** Opciones de «Interés». Los tres planes tienen que coincidir con los `nombre` de
 *  `public/data/planes.json`: si se renombra un plan, actualizar también esta lista
 *  (clarificación D1 de 003). */
export const INTERESES: readonly string[] = [
  `Página web (${PRECIO_PAGINA_WEB} el primer año)`,
  'Plan Crecimiento',
  'Plan Escala',
  'Plan E-Gov',
  'Soporte técnico',
];

export interface DatosConsulta {
  nombre: string;
  negocio: string;
  rubro: string;
  localidad: string;
  interes: string;
  mensaje: string;
}

/** Quita espacios de los extremos y los repetidos; conserva los saltos de línea. */
export function limpiar(texto: string): string {
  return texto
    .split('\n')
    .map((linea) => linea.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .trim();
}

/** «Hola WillaLogic, soy [nombre] de [negocio] ([rubro], [localidad]). Me interesa: [interés].
 *  [mensaje]». El paréntesis se arma solo con los datos presentes (clarificación D2 de 003). */
export function armarMensaje(datos: DatosConsulta): string {
  const detalle = [limpiar(datos.rubro), limpiar(datos.localidad)].filter(Boolean).join(', ');
  const negocio = detalle ? `${limpiar(datos.negocio)} (${detalle})` : limpiar(datos.negocio);
  const partes = [
    `Hola WillaLogic, soy ${limpiar(datos.nombre)} de ${negocio}.`,
    `Me interesa: ${limpiar(datos.interes)}.`,
    limpiar(datos.mensaje),
  ];
  return partes.filter(Boolean).join(' ');
}

/** Valor de `?plan=` validado contra la lista blanca `INTERESES` (clarificación C3 de 003).
 *  Cualquier otro texto se descarta y devuelve vacío. */
export function interesDesdeUrl(valor: string | null | undefined): string {
  const limpio = limpiar(valor ?? '');
  return INTERESES.includes(limpio) ? limpio : '';
}

/** Enlace de WhatsApp con el mensaje codificado (`&`, `#`, `?` y saltos de línea incluidos). */
export function enlaceWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}

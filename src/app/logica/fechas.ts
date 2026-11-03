/** "2026-11-03" → "03/11/2026". Trabaja sobre el texto para no depender de la zona horaria. */
export function formatoFecha(iso: string): string {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!partes) {
    return iso;
  }
  const [, anio, mes, dia] = partes;
  return `${dia}/${mes}/${anio}`;
}

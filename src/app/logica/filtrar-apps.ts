import { AppWilla } from '../modelos/app-willa';

/** Pasa a minúsculas, quita tildes y recorta espacios: "  Trámites " → "tramites". */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/** Apps cuyo nombre o descripción contienen el texto, sin distinguir mayúsculas ni tildes.
 *  Con el texto vacío devuelve todas. */
export function filtrarApps(apps: AppWilla[], texto: string): AppWilla[] {
  const busqueda = normalizar(texto);
  if (!busqueda) {
    return apps;
  }
  return apps.filter((a) => normalizar(`${a.nombre} ${a.descripcion}`).includes(busqueda));
}

/** Siglas para la insignia que reemplaza al ícono si no carga:
 *  "Willa Community Center" → "WCC". Sin nombre devuelve "W". */
export function siglasApp(nombre: string): string {
  const siglas = nombre
    .trim()
    .split(/\s+/)
    .map((palabra) => palabra.charAt(0))
    .join('')
    .toUpperCase();
  return siglas || 'W';
}

/** Aplicación del ecosistema tal como llega en `public/data/apps.json`.
 *  Solo los campos públicos aprobados en la clarificación C2. */
export interface AppWilla {
  uuid: string;
  nombre: string;
  descripcion: string;
  /** Color propio de la app: es un dato, se aplica como `--color-app`. */
  color: string;
  /** En el JSON es el nombre del archivo; `AppsService` lo convierte en URL completa
   *  anteponiendo `base_iconos`. */
  logo: string;
  version: string;
}

/** Plan de WillaLogic listo para mostrar. El precio ya es número (clarificación C2 de 002). */
export interface Plan {
  uuid: string;
  nombre: string;
  tipo: string;
  descripcion: string;
  precioUsd: number;
  maxSucursales: number;
  maxUsuarios: number;
  soporte: string;
  /** uuids de las apps incluidas; se cruzan con `apps.json`. */
  apps: string[];
  /** Destacado con la etiqueta «Recomendado» (decisión comercial C3 de 002). */
  recomendado: boolean;
}

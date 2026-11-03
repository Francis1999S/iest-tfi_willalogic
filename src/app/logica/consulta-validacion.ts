import { DatosConsulta, INTERESES, limpiar } from './consulta';

export type CampoConsulta = keyof DatosConsulta;

interface Regla {
  obligatorio: boolean;
  min: number;
  max: number;
  /** Mensaje si falta, si es corto y si es largo. */
  falta: string;
  corto: string;
  largo: string;
}

/** Reglas de RF-003-04, con mensajes que explican cómo corregir (RF-003-05). */
export const LIMITES: Record<Exclude<CampoConsulta, 'interes'>, Regla> = {
  nombre: {
    obligatorio: true,
    min: 2,
    max: 60,
    falta: 'Escribí tu nombre.',
    corto: 'El nombre tiene que tener al menos 2 caracteres.',
    largo: 'El nombre puede tener hasta 60 caracteres.',
  },
  negocio: {
    obligatorio: true,
    min: 2,
    max: 80,
    falta: 'Escribí el nombre de tu negocio.',
    corto: 'El nombre del negocio tiene que tener al menos 2 caracteres.',
    largo: 'El nombre del negocio puede tener hasta 80 caracteres.',
  },
  rubro: {
    obligatorio: false,
    min: 0,
    max: 60,
    falta: '',
    corto: '',
    largo: 'El rubro puede tener hasta 60 caracteres.',
  },
  localidad: {
    obligatorio: false,
    min: 0,
    max: 60,
    falta: '',
    corto: '',
    largo: 'La localidad puede tener hasta 60 caracteres.',
  },
  mensaje: {
    obligatorio: true,
    min: 1,
    max: 500,
    falta: 'Contanos qué necesitás.',
    corto: 'Contanos qué necesitás.',
    largo: 'El mensaje puede tener hasta 500 caracteres',
  },
};

/** Cuenta caracteres visibles: un emoji vale uno, no dos. */
export function contarCaracteres(texto: string): number {
  return Array.from(texto).length;
}

/** Error del campo ya limpio de espacios sobrantes, o null si es válido. */
export function errorDeCampo(campo: CampoConsulta, valor: string): string | null {
  const limpio = limpiar(valor);
  if (campo === 'interes') {
    return INTERESES.includes(limpio) ? null : 'Elegí qué te interesa.';
  }
  const regla = LIMITES[campo];
  const largo = contarCaracteres(limpio);
  if (largo === 0) {
    return regla.obligatorio ? regla.falta : null;
  }
  if (largo < regla.min) {
    return regla.corto;
  }
  if (largo > regla.max) {
    return campo === 'mensaje' ? `${regla.largo} (tiene ${largo}).` : regla.largo;
  }
  return null;
}

/** Todos los errores del formulario; objeto vacío si es válido. */
export function erroresConsulta(datos: DatosConsulta): Partial<Record<CampoConsulta, string>> {
  const errores: Partial<Record<CampoConsulta, string>> = {};
  for (const campo of Object.keys(datos) as CampoConsulta[]) {
    const error = errorDeCampo(campo, datos[campo]);
    if (error) {
      errores[campo] = error;
    }
  }
  return errores;
}

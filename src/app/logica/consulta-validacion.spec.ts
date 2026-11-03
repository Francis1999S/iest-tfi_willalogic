import { DatosConsulta } from './consulta';
import { LIMITES, contarCaracteres, errorDeCampo, erroresConsulta } from './consulta-validacion';

const VALIDOS: DatosConsulta = {
  nombre: 'Ana',
  negocio: 'Despensa',
  rubro: '',
  localidad: '',
  interes: 'Plan Escala',
  mensaje: 'Quiero mi web.',
};

const letras = (n: number) => 'a'.repeat(n);

describe('errorDeCampo', () => {
  it('nombre: obligatorio, de 2 a 60 caracteres', () => {
    expect(errorDeCampo('nombre', '')).toBe('Escribí tu nombre.');
    expect(errorDeCampo('nombre', '   ')).toBe('Escribí tu nombre.');
    expect(errorDeCampo('nombre', 'A')).toBe('El nombre tiene que tener al menos 2 caracteres.');
    expect(errorDeCampo('nombre', letras(2))).toBeNull();
    expect(errorDeCampo('nombre', letras(60))).toBeNull();
    expect(errorDeCampo('nombre', letras(61))).toBe('El nombre puede tener hasta 60 caracteres.');
  });

  it('negocio: obligatorio, de 2 a 80 caracteres', () => {
    expect(errorDeCampo('negocio', '')).toBe('Escribí el nombre de tu negocio.');
    expect(errorDeCampo('negocio', 'B')).toBe(
      'El nombre del negocio tiene que tener al menos 2 caracteres.',
    );
    expect(errorDeCampo('negocio', letras(80))).toBeNull();
    expect(errorDeCampo('negocio', letras(81))).toBe(
      'El nombre del negocio puede tener hasta 80 caracteres.',
    );
  });

  it('rubro y localidad: opcionales, hasta 60 caracteres', () => {
    expect(errorDeCampo('rubro', '')).toBeNull();
    expect(errorDeCampo('localidad', '')).toBeNull();
    expect(errorDeCampo('rubro', letras(60))).toBeNull();
    expect(errorDeCampo('rubro', letras(61))).toBe('El rubro puede tener hasta 60 caracteres.');
    expect(errorDeCampo('localidad', letras(61))).toBe(
      'La localidad puede tener hasta 60 caracteres.',
    );
  });

  it('interés: tiene que ser una de las opciones', () => {
    expect(errorDeCampo('interes', '')).toBe('Elegí qué te interesa.');
    expect(errorDeCampo('interes', 'Otra cosa')).toBe('Elegí qué te interesa.');
    expect(errorDeCampo('interes', 'Soporte técnico')).toBeNull();
  });

  it('mensaje: obligatorio, hasta 500 caracteres', () => {
    expect(errorDeCampo('mensaje', '')).toBe('Contanos qué necesitás.');
    expect(errorDeCampo('mensaje', letras(500))).toBeNull();
    expect(errorDeCampo('mensaje', letras(501))).toBe(
      'El mensaje puede tener hasta 500 caracteres (tiene 501).',
    );
  });

  it('cuenta los largos después de quitar espacios sobrantes', () => {
    expect(errorDeCampo('nombre', `  ${letras(60)}  `)).toBeNull();
    expect(errorDeCampo('nombre', ' A ')).toBe('El nombre tiene que tener al menos 2 caracteres.');
  });
});

describe('contarCaracteres', () => {
  it('cuenta un emoji como un solo carácter', () => {
    expect(contarCaracteres('Hola 🙌')).toBe(6);
  });
});

describe('erroresConsulta', () => {
  it('sin errores con datos válidos', () => {
    expect(erroresConsulta(VALIDOS)).toEqual({});
  });

  it('devuelve un error por cada campo inválido', () => {
    expect(erroresConsulta({ ...VALIDOS, nombre: '', interes: '' })).toEqual({
      nombre: 'Escribí tu nombre.',
      interes: 'Elegí qué te interesa.',
    });
  });

  it('expone los límites para el contador del mensaje', () => {
    expect(LIMITES.mensaje.max).toBe(500);
  });
});

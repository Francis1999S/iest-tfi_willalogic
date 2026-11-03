import {
  DatosConsulta,
  INTERESES,
  armarMensaje,
  enlaceWhatsApp,
  interesDesdeUrl,
  limpiar,
} from './consulta';

const DATOS: DatosConsulta = {
  nombre: 'Ana',
  negocio: 'Despensa Don Pepe',
  rubro: 'Almacén',
  localidad: 'Tinogasta',
  interes: 'Plan Escala',
  mensaje: 'Quiero ordenar el stock.',
};

describe('INTERESES', () => {
  it('ofrece las cinco opciones de la spec', () => {
    expect(INTERESES).toEqual([
      'Página web ($34.999 el primer año)',
      'Plan Crecimiento',
      'Plan Escala',
      'Plan E-Gov',
      'Soporte técnico',
    ]);
  });
});

describe('limpiar', () => {
  it('quita espacios de los extremos y los repetidos', () => {
    expect(limpiar('   Despensa    Don   Pepe  ')).toBe('Despensa Don Pepe');
  });

  it('conserva los saltos de línea del mensaje', () => {
    expect(limpiar('  Hola  \n  ¿precio?  ')).toBe('Hola\n¿precio?');
  });
});

describe('armarMensaje', () => {
  it('arma el mensaje completo', () => {
    expect(armarMensaje(DATOS)).toBe(
      'Hola WillaLogic, soy Ana de Despensa Don Pepe (Almacén, Tinogasta). ' +
        'Me interesa: Plan Escala. Quiero ordenar el stock.',
    );
  });

  it('omite el paréntesis si no hay rubro ni localidad', () => {
    expect(armarMensaje({ ...DATOS, rubro: '', localidad: '' })).toBe(
      'Hola WillaLogic, soy Ana de Despensa Don Pepe. Me interesa: Plan Escala. ' +
        'Quiero ordenar el stock.',
    );
  });

  it('con solo rubro o solo localidad no deja comas sueltas', () => {
    expect(armarMensaje({ ...DATOS, localidad: '' })).toContain('Despensa Don Pepe (Almacén).');
    expect(armarMensaje({ ...DATOS, rubro: '  ' })).toContain('Despensa Don Pepe (Tinogasta).');
  });

  it('limpia los espacios de todos los campos', () => {
    expect(armarMensaje({ ...DATOS, nombre: '  Ana  ', negocio: ' Despensa   Don Pepe ' })).toContain(
      'soy Ana de Despensa Don Pepe (',
    );
  });
});

describe('enlaceWhatsApp', () => {
  it('apunta al número de WillaLogic', () => {
    expect(enlaceWhatsApp('Hola')).toBe('https://wa.me/5493837693573?text=Hola');
  });

  it('codifica &, #, ? y los saltos de línea para no romper el enlace', () => {
    const enlace = enlaceWhatsApp('Precio & plazos? #1\nGracias');
    expect(enlace).toBe(
      'https://wa.me/5493837693573?text=Precio%20%26%20plazos%3F%20%231%0AGracias',
    );
    expect(new URL(enlace).searchParams.get('text')).toBe('Precio & plazos? #1\nGracias');
  });

  it('conserva los emojis', () => {
    const enlace = enlaceWhatsApp('Gracias 🙌');
    expect(new URL(enlace).searchParams.get('text')).toBe('Gracias 🙌');
  });
});

describe('interesDesdeUrl', () => {
  it('acepta un plan que está en la lista', () => {
    expect(interesDesdeUrl('Plan Escala')).toBe('Plan Escala');
  });

  it('ignora espacios sobrantes alrededor del valor', () => {
    expect(interesDesdeUrl('  Plan E-Gov ')).toBe('Plan E-Gov');
  });

  it('ignora código y valores desconocidos', () => {
    expect(interesDesdeUrl('<script>alert(1)</script>')).toBe('');
    expect(interesDesdeUrl('Plan Inexistente')).toBe('');
    expect(interesDesdeUrl('plan escala')).toBe('');
  });

  it('sin parámetro devuelve vacío', () => {
    expect(interesDesdeUrl(null)).toBe('');
    expect(interesDesdeUrl(undefined)).toBe('');
    expect(interesDesdeUrl('')).toBe('');
  });
});

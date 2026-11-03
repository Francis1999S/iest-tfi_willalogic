import { formatoPesos, formatoUsd, precioEnPesos } from './precios';

describe('precioEnPesos', () => {
  it('multiplica el precio en dólares por la cotización', () => {
    expect(precioEnPesos(25, 1565)).toBe(39125);
  });

  it('redondea al peso entero', () => {
    expect(precioEnPesos(13.5, 1565.3)).toBe(21132);
  });

  it('devuelve null si la cotización es cero, negativa o no existe', () => {
    expect(precioEnPesos(25, 0)).toBeNull();
    expect(precioEnPesos(25, -10)).toBeNull();
    expect(precioEnPesos(25, null)).toBeNull();
    expect(precioEnPesos(25, undefined)).toBeNull();
  });
});

describe('formatoPesos', () => {
  it('usa punto como separador de miles y sin decimales', () => {
    expect(formatoPesos(39125)).toBe('$39.125');
    expect(formatoPesos(563400)).toBe('$563.400');
    expect(formatoPesos(950)).toBe('$950');
  });
});

describe('formatoUsd', () => {
  it('no muestra decimales cuando el precio es entero', () => {
    expect(formatoUsd(13)).toBe('USD 13');
    expect(formatoUsd(360)).toBe('USD 360');
  });

  it('muestra los decimales con coma cuando existen', () => {
    expect(formatoUsd(13.5)).toBe('USD 13,5');
  });
});

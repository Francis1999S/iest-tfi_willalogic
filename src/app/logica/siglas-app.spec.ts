import { siglasApp } from './siglas-app';

describe('siglasApp', () => {
  it('toma la inicial de cada palabra', () => {
    expect(siglasApp('Willa Stock')).toBe('WS');
    expect(siglasApp('Willa Community Center')).toBe('WCC');
  });

  it('devuelve "W" si el texto está vacío o tiene solo espacios', () => {
    expect(siglasApp('')).toBe('W');
    expect(siglasApp('   ')).toBe('W');
  });

  it('ignora espacios repetidos y de los extremos', () => {
    expect(siglasApp('  Willa   Stock ')).toBe('WS');
  });

  it('devuelve las siglas en mayúsculas', () => {
    expect(siglasApp('willa catálogo')).toBe('WC');
  });
});

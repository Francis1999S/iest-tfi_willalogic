import { formatoFecha } from './fechas';

describe('formatoFecha', () => {
  it('pasa de AAAA-MM-DD a DD/MM/AAAA', () => {
    expect(formatoFecha('2026-11-03')).toBe('03/11/2026');
  });

  it('no corre la fecha un día por la zona horaria', () => {
    expect(formatoFecha('2026-01-01')).toBe('01/01/2026');
  });

  it('devuelve el texto tal cual si no tiene el formato esperado', () => {
    expect(formatoFecha('')).toBe('');
    expect(formatoFecha('ayer')).toBe('ayer');
  });
});

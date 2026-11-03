import { AppWilla } from '../modelos/app-willa';
import { filtrarApps, normalizar } from './filtrar-apps';

function app(nombre: string, descripcion: string): AppWilla {
  return { uuid: nombre, nombre, descripcion, color: '', logo: '', version: '1.0.0' };
}

const APPS: AppWilla[] = [
  app('Willa Stock', 'Aplicación de Gestión de Inventario'),
  app('Willa Sessions', 'Gestión de turnos para organizaciones'),
  app('Willa Trámites', 'Seguimiento de expedientes'),
];

function nombres(apps: AppWilla[]): string[] {
  return apps.map((a) => a.nombre);
}

describe('normalizar', () => {
  it('pasa a minúsculas, quita tildes y espacios de los extremos', () => {
    expect(normalizar('  Gestión de TRÁMITES  ')).toBe('gestion de tramites');
  });
});

describe('filtrarApps', () => {
  it('devuelve todas las apps si el texto está vacío', () => {
    expect(filtrarApps(APPS, '')).toEqual(APPS);
  });

  it('devuelve todas las apps si el texto tiene solo espacios', () => {
    expect(filtrarApps(APPS, '   ')).toEqual(APPS);
  });

  it('no distingue mayúsculas', () => {
    expect(nombres(filtrarApps(APPS, 'STOCK'))).toEqual(['Willa Stock']);
  });

  it('no distingue tildes en ninguno de los dos sentidos', () => {
    expect(nombres(filtrarApps(APPS, 'tramites'))).toEqual(['Willa Trámites']);
    expect(nombres(filtrarApps(APPS, 'inventarío'))).toEqual(['Willa Stock']);
  });

  it('ignora los espacios al principio y al final', () => {
    expect(nombres(filtrarApps(APPS, '  turnos  '))).toEqual(['Willa Sessions']);
  });

  it('busca también en la descripción', () => {
    expect(nombres(filtrarApps(APPS, 'gestion'))).toEqual(['Willa Stock', 'Willa Sessions']);
  });

  it('devuelve una lista vacía si no hay resultados', () => {
    expect(filtrarApps(APPS, 'heladería')).toEqual([]);
  });

  it('con una lista vacía devuelve una lista vacía', () => {
    expect(filtrarApps([], 'stock')).toEqual([]);
  });
});

import { AppWilla } from '../modelos/app-willa';
import { appsDePlan } from './apps-de-plan';

function app(uuid: string, nombre: string): AppWilla {
  return { uuid, nombre, descripcion: '', color: '', logo: '', version: '1.0.0' };
}

const APPS = [app('a', 'Willa Finance'), app('b', 'Willa Stock'), app('c', 'Willa POS')];

describe('appsDePlan', () => {
  it('devuelve las apps en el orden en que las lista el plan', () => {
    expect(appsDePlan(['c', 'a'], APPS).map((a) => a.nombre)).toEqual([
      'Willa POS',
      'Willa Finance',
    ]);
  });

  it('omite los uuids que no existen en apps.json', () => {
    expect(appsDePlan(['b', 'no-existe', 'c'], APPS).map((a) => a.uuid)).toEqual(['b', 'c']);
  });

  it('con un plan sin apps o sin catálogo devuelve una lista vacía', () => {
    expect(appsDePlan([], APPS)).toEqual([]);
    expect(appsDePlan(['a'], [])).toEqual([]);
  });
});

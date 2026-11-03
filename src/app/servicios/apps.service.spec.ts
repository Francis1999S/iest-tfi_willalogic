import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AppsService } from './apps.service';

const BASE = 'https://willalogic.com.ar/PUBLIC_SRC/APPS_ICONS/';

function appCruda(n: number) {
  return {
    uuid: `uuid-${n}`,
    slug: `W${n}`,
    ruta: `W${n}`,
    nombre: `Willa ${n}`,
    descripcion: `Descripción ${n}`,
    version: '1.0.0',
    color: '#244A85',
    logo: `willa${n}.png`,
    precio_individual: '5',
  };
}

function instantanea(cantidad: number) {
  return {
    fuente: 'https://willalogic.com.ar/api/apps',
    capturado: '2026-11-03',
    base_iconos: BASE,
    cotizacion_usd: 1565,
    apps: Array.from({ length: cantidad }, (_, i) => appCruda(i + 1)),
  };
}

describe('AppsService', () => {
  let servicio: AppsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servicio = TestBed.inject(AppsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('arranca en estado "cargando" y pide data/apps.json', () => {
    expect(servicio.estado()).toBe('cargando');
    expect(servicio.apps()).toEqual([]);
    http.expectOne('data/apps.json');
  });

  it('con datos pasa a "listo" y expone las 11 apps', () => {
    http.expectOne('data/apps.json').flush(instantanea(11));
    expect(servicio.estado()).toBe('listo');
    expect(servicio.apps().length).toBe(11);
  });

  it('copia solo los campos públicos y arma la URL completa del ícono', () => {
    http.expectOne('data/apps.json').flush(instantanea(1));
    expect(servicio.apps()[0]).toEqual({
      uuid: 'uuid-1',
      nombre: 'Willa 1',
      descripcion: 'Descripción 1',
      color: '#244A85',
      logo: `${BASE}willa1.png`,
      version: '1.0.0',
    });
  });

  it('con una lista vacía queda "listo" sin apps, no en error', () => {
    http.expectOne('data/apps.json').flush(instantanea(0));
    expect(servicio.estado()).toBe('listo');
    expect(servicio.apps()).toEqual([]);
  });

  it('si la carga falla pasa a "error"', () => {
    http
      .expectOne('data/apps.json')
      .flush('No encontrado', { status: 404, statusText: 'Not Found' });
    expect(servicio.estado()).toBe('error');
    expect(servicio.apps()).toEqual([]);
  });

  it('si el JSON no trae la lista de apps pasa a "error"', () => {
    http.expectOne('data/apps.json').flush({ fuente: 'x' });
    expect(servicio.estado()).toBe('error');
  });
});

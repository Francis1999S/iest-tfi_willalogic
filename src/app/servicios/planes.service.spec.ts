import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PlanesService } from './planes.service';

function planCrudo(nombre: string, precio: string) {
  return {
    uuid: `uuid-${nombre}`,
    nombre,
    tipo: 'MultiApp Plan',
    precio_usd: precio,
    descripcion: `Descripción de ${nombre}`,
    max_sucursales: 5,
    max_usuarios: 15,
    soporte: '24/7',
    apps: ['a', 'b'],
    chatbot: true,
  };
}

const INSTANTANEA = {
  fuente: 'API pública de planes de WillaLogic',
  capturado: '2026-11-03',
  cotizacion_usd: 1565,
  planes: [planCrudo('Plan Crecimiento', '13.00'), planCrudo('Plan Escala', '25.00')],
};

describe('PlanesService', () => {
  let servicio: PlanesService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    servicio = TestBed.inject(PlanesService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('arranca en estado "cargando" y pide /data/planes.json', () => {
    expect(servicio.estado()).toBe('cargando');
    http.expectOne('/data/planes.json');
  });

  it('convierte el precio de texto a número', () => {
    http.expectOne('/data/planes.json').flush(INSTANTANEA);
    expect(servicio.estado()).toBe('listo');
    expect(servicio.planes().map((p) => p.precioUsd)).toEqual([13, 25]);
  });

  it('expone la cotización y la fecha de captura', () => {
    http.expectOne('/data/planes.json').flush(INSTANTANEA);
    expect(servicio.cotizacion()).toBe(1565);
    expect(servicio.fecha()).toBe('2026-11-03');
  });

  it('marca Plan Escala como recomendado', () => {
    http.expectOne('/data/planes.json').flush(INSTANTANEA);
    expect(servicio.planes().map((p) => p.recomendado)).toEqual([false, true]);
  });

  it('copia límites, soporte y apps, y no copia el campo chatbot', () => {
    http.expectOne('/data/planes.json').flush(INSTANTANEA);
    const plan = servicio.planes()[1];
    expect(plan.maxSucursales).toBe(5);
    expect(plan.maxUsuarios).toBe(15);
    expect(plan.soporte).toBe('24/7');
    expect(plan.apps).toEqual(['a', 'b']);
    expect('chatbot' in plan).toBe(false);
  });

  it('sin cotización expone null', () => {
    http.expectOne('/data/planes.json').flush({ ...INSTANTANEA, cotizacion_usd: undefined });
    expect(servicio.cotizacion()).toBeNull();
  });

  it('si la carga falla pasa a "error"', () => {
    http
      .expectOne('/data/planes.json')
      .flush('Error', { status: 500, statusText: 'Server Error' });
    expect(servicio.estado()).toBe('error');
    expect(servicio.planes()).toEqual([]);
  });

  it('si el JSON no trae la lista de planes pasa a "error"', () => {
    http.expectOne('/data/planes.json').flush({ capturado: '2026-11-03' });
    expect(servicio.estado()).toBe('error');
  });
});

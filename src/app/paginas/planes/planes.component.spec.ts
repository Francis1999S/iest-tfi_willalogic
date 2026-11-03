import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppWilla } from '../../modelos/app-willa';
import { Plan } from '../../modelos/plan';
import { AppsService, EstadoCarga } from '../../servicios/apps.service';
import { PlanesService } from '../../servicios/planes.service';
import { PlanesComponent } from './planes.component';

function plan(nombre: string, precioUsd: number, recomendado = false): Plan {
  return {
    uuid: `uuid-${nombre}`,
    nombre,
    tipo: 'MultiApp Plan',
    descripcion: '',
    precioUsd,
    maxSucursales: 1,
    maxUsuarios: 5,
    soporte: 'Prioritario',
    apps: [],
    recomendado,
  };
}

const TRES_PLANES = [
  plan('Plan Crecimiento', 13),
  plan('Plan Escala', 25, true),
  plan('Plan E-Gov', 360),
];

describe('PlanesComponent', () => {
  let fixture: ComponentFixture<PlanesComponent>;
  let elemento: HTMLElement;

  async function crear(planes: Plan[], estado: EstadoCarga, cotizacion: number | null = 1565) {
    await TestBed.configureTestingModule({
      imports: [PlanesComponent],
      providers: [
        provideRouter([]),
        {
          provide: PlanesService,
          useValue: {
            planes: signal(planes),
            estado: signal(estado),
            cotizacion: signal(cotizacion),
            fecha: signal('2026-11-03'),
          },
        },
        {
          provide: AppsService,
          useValue: { apps: signal<AppWilla[]>([]), estado: signal<EstadoCarga>('listo') },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PlanesComponent);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  }

  function texto(): string {
    return (elemento.textContent ?? '').replace(/\s+/g, ' ');
  }

  it('tiene un único h1 y muestra los 3 planes', async () => {
    await crear(TRES_PLANES, 'listo');
    expect(elemento.querySelectorAll('h1').length).toBe(1);
    expect(elemento.querySelectorAll('wl-tarjeta-plan').length).toBe(3);
  });

  it('avisa la fecha de la cotización', async () => {
    await crear(TRES_PLANES, 'listo');
    expect(texto()).toContain(
      'Cotización del 03/11/2026. El precio final se calcula el día del pago.',
    );
  });

  it('sin cotización no muestra el aviso', async () => {
    await crear(TRES_PLANES, 'listo', null);
    expect(texto()).not.toContain('Cotización del');
  });

  it('muestra un indicador mientras carga', async () => {
    await crear([], 'cargando');
    expect(elemento.querySelector('[role="status"]')?.textContent).toContain('Cargando');
  });

  it('muestra el error en lugar de los planes si no se pudo cargar', async () => {
    await crear([], 'error');
    expect(texto()).toContain('No pudimos cargar los planes. Recargá la página.');
    expect(elemento.querySelectorAll('wl-tarjeta-plan').length).toBe(0);
  });
});

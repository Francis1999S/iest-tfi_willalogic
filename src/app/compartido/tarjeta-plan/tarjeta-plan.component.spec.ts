import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppWilla } from '../../modelos/app-willa';
import { Plan } from '../../modelos/plan';
import { TarjetaPlanComponent } from './tarjeta-plan.component';

function app(uuid: string, nombre: string): AppWilla {
  return { uuid, nombre, descripcion: '', color: '#244A85', logo: `${uuid}.png`, version: '1' };
}

const CATALOGO = [app('a', 'Willa Finance'), app('b', 'Willa Stock'), app('c', 'Willa POS')];

const PLAN_ESCALA: Plan = {
  uuid: 'uuid-escala',
  nombre: 'Plan Escala',
  tipo: 'MultiApp Plan',
  descripcion: 'Operá y expandí tu empresa sin límites.',
  precioUsd: 25,
  maxSucursales: 5,
  maxUsuarios: 15,
  soporte: '24/7',
  apps: ['b', 'no-existe', 'c'],
  recomendado: true,
};

describe('TarjetaPlanComponent', () => {
  let fixture: ComponentFixture<TarjetaPlanComponent>;
  let elemento: HTMLElement;

  async function crear(plan: Plan, cotizacion: number | null) {
    await TestBed.configureTestingModule({
      imports: [TarjetaPlanComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(TarjetaPlanComponent);
    fixture.componentRef.setInput('plan', plan);
    fixture.componentRef.setInput('catalogo', CATALOGO);
    fixture.componentRef.setInput('cotizacion', cotizacion);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  }

  function texto(): string {
    return (elemento.textContent ?? '').replace(/\s+/g, ' ');
  }

  it('muestra nombre, tipo y descripción', async () => {
    await crear(PLAN_ESCALA, 1565);
    expect(elemento.querySelector('h2')?.textContent?.trim()).toBe('Plan Escala');
    expect(texto()).toContain('MultiApp Plan');
    expect(texto()).toContain('Operá y expandí tu empresa sin límites.');
  });

  it('muestra el precio en dólares y el aproximado en pesos', async () => {
    await crear(PLAN_ESCALA, 1565);
    expect(texto()).toContain('USD 25 / mes');
    expect(texto()).toContain('≈ $39.125 / mes');
  });

  it('sin cotización muestra solo el precio en dólares', async () => {
    await crear(PLAN_ESCALA, null);
    expect(texto()).toContain('USD 25 / mes');
    expect(texto()).not.toContain('≈');
  });

  it('muestra sucursales, usuarios y soporte', async () => {
    await crear(PLAN_ESCALA, 1565);
    const limites = Array.from(elemento.querySelectorAll('dt, dd')).map((e) =>
      e.textContent?.trim(),
    );
    expect(limites).toEqual(['Sucursales', '5', 'Usuarios', '15', 'Soporte', '24/7']);
  });

  it('lista las apps incluidas en orden y omite las que no existen', async () => {
    await crear(PLAN_ESCALA, 1565);
    const nombres = Array.from(elemento.querySelectorAll('.wl-tarjeta-plan__app-nombre')).map(
      (e) => e.textContent?.trim(),
    );
    expect(nombres).toEqual(['Willa Stock', 'Willa POS']);
  });

  it('destaca el plan recomendado y no los demás', async () => {
    await crear(PLAN_ESCALA, 1565);
    expect(texto()).toContain('Recomendado');
    TestBed.resetTestingModule();
    await crear({ ...PLAN_ESCALA, nombre: 'Plan Crecimiento', recomendado: false }, 1565);
    expect(texto()).not.toContain('Recomendado');
  });

  it('el botón lleva a la consulta con el plan elegido', async () => {
    await crear(PLAN_ESCALA, 1565);
    const enlace = elemento.querySelector('a');
    expect(enlace?.textContent?.trim()).toBe('Quiero este plan');
    expect(enlace?.getAttribute('href')).toBe('/consulta?plan=Plan%20Escala');
  });

  it('no menciona el chatbot', async () => {
    await crear(PLAN_ESCALA, 1565);
    expect(texto().toLowerCase()).not.toMatch(/chatbot|asistente/);
  });
});

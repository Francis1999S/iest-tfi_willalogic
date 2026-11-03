import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWilla } from '../../modelos/app-willa';
import { AppsService, EstadoCarga } from '../../servicios/apps.service';
import { CatalogoAppsComponent } from './catalogo-apps.component';

function app(n: number): AppWilla {
  return {
    uuid: `uuid-${n}`,
    nombre: `Willa ${n}`,
    descripcion: `Descripción ${n}`,
    color: '#244A85',
    logo: `willa${n}.png`,
    version: '1.0.0',
  };
}

const ONCE_APPS = Array.from({ length: 11 }, (_, i) => app(i + 1));

describe('CatalogoAppsComponent', () => {
  let fixture: ComponentFixture<CatalogoAppsComponent>;
  let elemento: HTMLElement;
  const apps = signal<AppWilla[]>([]);
  const estado = signal<EstadoCarga>('cargando');

  async function crear(lista: AppWilla[], estadoInicial: EstadoCarga) {
    apps.set(lista);
    estado.set(estadoInicial);
    await TestBed.configureTestingModule({
      imports: [CatalogoAppsComponent],
      providers: [{ provide: AppsService, useValue: { apps, estado } }],
    }).compileComponents();
    fixture = TestBed.createComponent(CatalogoAppsComponent);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  }

  async function buscar(texto: string) {
    const campo = elemento.querySelector('input') as HTMLInputElement;
    campo.value = texto;
    campo.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  function tarjetas(): number {
    return elemento.querySelectorAll('wl-tarjeta-app').length;
  }

  function anuncio(): string {
    return elemento.querySelector('[aria-live="polite"]')?.textContent?.trim() ?? '';
  }

  it('tiene un único h1 y un buscador con etiqueta visible', async () => {
    await crear(ONCE_APPS, 'listo');
    expect(elemento.querySelectorAll('h1').length).toBe(1);
    const campo = elemento.querySelector('input');
    const etiqueta = elemento.querySelector(`label[for="${campo?.id}"]`);
    expect(etiqueta?.textContent?.trim()).toBeTruthy();
  });

  it('muestra las 11 tarjetas', async () => {
    await crear(ONCE_APPS, 'listo');
    expect(tarjetas()).toBe(11);
  });

  it('filtra al escribir y vuelve a mostrar todas al vaciar el buscador', async () => {
    await crear(ONCE_APPS, 'listo');
    await buscar('willa 11');
    expect(tarjetas()).toBe(1);
    await buscar('');
    expect(tarjetas()).toBe(11);
  });

  it('muestra y anuncia el mensaje sin resultados', async () => {
    await crear(ONCE_APPS, 'listo');
    await buscar('heladería');
    expect(tarjetas()).toBe(0);
    expect(anuncio()).toBe('No encontramos apps con "heladería". Probá con otra palabra.');
  });

  it('muestra un indicador mientras carga', async () => {
    await crear([], 'cargando');
    expect(elemento.querySelector('[role="status"]')?.textContent).toContain('Cargando');
    expect(tarjetas()).toBe(0);
  });

  it('muestra el error en lugar de la grilla si no se pudo cargar', async () => {
    await crear([], 'error');
    expect(elemento.textContent).toContain('No pudimos cargar las apps. Recargá la página.');
    expect(elemento.querySelector('ul')).toBeNull();
  });
});

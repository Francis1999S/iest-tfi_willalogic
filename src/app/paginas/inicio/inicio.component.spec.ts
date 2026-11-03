import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { InicioComponent } from './inicio.component';

describe('InicioComponent', () => {
  let fixture: ComponentFixture<InicioComponent>;
  let elemento: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(InicioComponent);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  });

  it('tiene un único h1 con el eslogan de la marca', () => {
    const titulos = elemento.querySelectorAll('h1');
    expect(titulos.length).toBe(1);
    expect(titulos[0].textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Arquitectura digital para empresas que escalan.',
    );
  });

  it('da acceso a Apps, Planes y Consulta', () => {
    const destinos = Array.from(elemento.querySelectorAll('a')).map((a) => a.getAttribute('href'));
    expect(destinos).toContain('/apps');
    expect(destinos).toContain('/planes');
    expect(destinos).toContain('/consulta');
  });

  it('tiene un solo botón primario', () => {
    expect(elemento.querySelectorAll('.wl-boton-primario').length).toBe(1);
  });
});

describe('rutas', () => {
  it('el inicio usa el título SEO de la marca', () => {
    const inicio = routes.find((r) => r.path === '');
    expect(inicio?.title).toBe('WillaLogic — Arquitectura digital para empresas que escalan');
  });

  it('una ruta desconocida vuelve al inicio', () => {
    const comodin = routes.find((r) => r.path === '**');
    expect(comodin?.redirectTo).toBe('');
  });
});

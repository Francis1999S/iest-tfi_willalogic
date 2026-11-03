import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el logo de WillaLogic en el encabezado', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector<HTMLImageElement>('header img');
    expect(logo).not.toBeNull();
    expect(logo?.getAttribute('src')).toBe('marca/logo-willalogic.png');
    expect(logo?.getAttribute('alt')).toBe('WillaLogic');
  });

  it('muestra el pie con el origen de la marca', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('footer')?.textContent).toContain(
      '© 2026 WillaLogic · Tinogasta, Catamarca',
    );
  });
});

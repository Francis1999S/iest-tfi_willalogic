import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppWilla } from '../../modelos/app-willa';
import { TarjetaAppComponent } from './tarjeta-app.component';

const WILLA_STOCK: AppWilla = {
  uuid: 'uuid-ws',
  nombre: 'Willa Stock',
  descripcion: 'Aplicación de Gestión de Inventario',
  color: '#244A85',
  logo: 'https://willalogic.com.ar/PUBLIC_SRC/APPS_ICONS/willastock.jpg',
  version: '1.3.0',
};

describe('TarjetaAppComponent', () => {
  let fixture: ComponentFixture<TarjetaAppComponent>;
  let elemento: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TarjetaAppComponent] }).compileComponents();
    fixture = TestBed.createComponent(TarjetaAppComponent);
    fixture.componentRef.setInput('app', WILLA_STOCK);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  });

  it('muestra el ícono con su texto alternativo', () => {
    const icono = elemento.querySelector('img');
    expect(icono?.getAttribute('src')).toBe(WILLA_STOCK.logo);
    expect(icono?.getAttribute('alt')).toBe('Ícono de Willa Stock');
  });

  it('muestra el nombre y la descripción', () => {
    expect(elemento.querySelector('h2')?.textContent?.trim()).toBe('Willa Stock');
    expect(elemento.querySelector('p')?.textContent?.trim()).toBe(
      'Aplicación de Gestión de Inventario',
    );
  });

  it('pasa el color de la app como variable --color-app', () => {
    const tarjeta = elemento.querySelector<HTMLElement>('article');
    expect(tarjeta?.style.getPropertyValue('--color-app')).toBe('#244A85');
  });

  it('si el ícono no carga muestra una insignia con las siglas', async () => {
    elemento.querySelector('img')?.dispatchEvent(new Event('error'));
    await fixture.whenStable();

    expect(elemento.querySelector('img')).toBeNull();
    const insignia = elemento.querySelector('[role="img"]');
    expect(insignia?.textContent?.trim()).toBe('WS');
    expect(insignia?.getAttribute('aria-label')).toBe('Ícono de Willa Stock');
  });
});

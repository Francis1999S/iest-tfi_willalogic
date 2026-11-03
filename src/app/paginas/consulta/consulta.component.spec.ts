import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ConsultaComponent } from './consulta.component';

describe('ConsultaComponent', () => {
  let fixture: ComponentFixture<ConsultaComponent>;
  let elemento: HTMLElement;

  async function crear(query: Record<string, string> = {}) {
    await TestBed.configureTestingModule({
      imports: [ConsultaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap(query) } },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ConsultaComponent);
    await fixture.whenStable();
    elemento = fixture.nativeElement as HTMLElement;
  }

  function campo<T extends HTMLElement>(nombre: string): T {
    return elemento.querySelector(`#wl-consulta-${nombre}`) as T;
  }

  async function escribir(nombre: string, valor: string) {
    const control = campo<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(nombre);
    control.value = valor;
    control.dispatchEvent(new Event(control instanceof HTMLSelectElement ? 'change' : 'input'));
    await fixture.whenStable();
  }

  async function enviar() {
    elemento.querySelector('form')?.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
  }

  function errorDe(nombre: string): string {
    const control = campo(nombre);
    const id = control.getAttribute('aria-describedby') ?? '';
    const textos = id
      .split(' ')
      .filter(Boolean)
      .map((i) => elemento.querySelector(`#${i}.wl-consulta__error`)?.textContent?.trim())
      .filter(Boolean);
    return textos.join(' ');
  }

  async function completarValido() {
    await escribir('nombre', 'Ana');
    await escribir('negocio', 'Despensa & Cía');
    await escribir('interes', 'Plan Escala');
    await escribir('mensaje', '¿Cuánto sale? #urgente');
  }

  it('muestra los seis campos, cada uno con su etiqueta visible', async () => {
    await crear();
    for (const nombre of ['nombre', 'negocio', 'rubro', 'localidad', 'interes', 'mensaje']) {
      const etiqueta = elemento.querySelector(`label[for="wl-consulta-${nombre}"]`);
      expect(campo(nombre), nombre).not.toBeNull();
      expect(etiqueta?.textContent?.trim(), nombre).toBeTruthy();
    }
  });

  it('ofrece las cinco opciones de interés', async () => {
    await crear();
    const opciones = Array.from(campo<HTMLSelectElement>('interes').options)
      .filter((o) => o.value)
      .map((o) => o.textContent?.trim());
    expect(opciones).toEqual([
      'Página web ($34.999 el primer año)',
      'Plan Crecimiento',
      'Plan Escala',
      'Plan E-Gov',
      'Soporte técnico',
    ]);
  });

  it('deja elegido el plan que llega en la URL', async () => {
    await crear({ plan: 'Plan Escala' });
    expect(campo<HTMLSelectElement>('interes').value).toBe('Plan Escala');
  });

  it('ignora un plan de la URL que no está en la lista', async () => {
    await crear({ plan: '<script>alert(1)</script>' });
    expect(campo<HTMLSelectElement>('interes').value).toBe('');
  });

  it('muestra el error al salir de un campo inválido, no antes', async () => {
    await crear();
    expect(errorDe('nombre')).toBe('');
    campo('nombre').dispatchEvent(new Event('blur'));
    await fixture.whenStable();
    expect(errorDe('nombre')).toBe('Escribí tu nombre.');
    expect(campo('nombre').getAttribute('aria-invalid')).toBe('true');
  });

  it('con errores no abre WhatsApp y muestra todos los mensajes', async () => {
    await crear();
    const abrir = vi.spyOn(fixture.componentInstance, 'abrirWhatsApp').mockImplementation(() => {});
    await enviar();
    expect(abrir).not.toHaveBeenCalled();
    expect(errorDe('nombre')).toBe('Escribí tu nombre.');
    expect(errorDe('negocio')).toBe('Escribí el nombre de tu negocio.');
    expect(errorDe('interes')).toBe('Elegí qué te interesa.');
    expect(errorDe('mensaje')).toBe('Contanos qué necesitás.');
  });

  it('con datos válidos abre WhatsApp con el mensaje codificado', async () => {
    await crear();
    const abrir = vi.spyOn(fixture.componentInstance, 'abrirWhatsApp').mockImplementation(() => {});
    await completarValido();
    await enviar();
    expect(abrir).toHaveBeenCalledTimes(1);
    const url = new URL(abrir.mock.calls[0][0]);
    expect(url.origin + url.pathname).toBe('https://wa.me/5493837693573');
    expect(url.searchParams.get('text')).toBe(
      'Hola WillaLogic, soy Ana de Despensa & Cía. Me interesa: Plan Escala. ' +
        '¿Cuánto sale? #urgente',
    );
  });

  it('muestra el contador del mensaje y lo marca al pasarse de 500', async () => {
    await crear();
    const contador = () => elemento.querySelector('.wl-consulta__contador');
    expect(contador()?.textContent?.trim()).toBe('0 / 500');
    await escribir('mensaje', 'a'.repeat(501));
    expect(contador()?.textContent?.trim()).toBe('501 / 500');
    expect(contador()?.classList).toContain('wl-consulta__contador--excedido');
  });

  it('avisa que no guarda los datos', async () => {
    await crear();
    expect(elemento.textContent).toContain(
      'No guardamos tus datos: la consulta se envía directamente desde tu WhatsApp.',
    );
  });
});

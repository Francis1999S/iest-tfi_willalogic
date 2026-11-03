import { Component, computed, input, signal } from '@angular/core';
import { AppWilla } from '../../modelos/app-willa';
import { siglasApp } from '../../logica/siglas-app';

/** Ícono de una app; si la imagen no carga muestra una insignia con sus siglas (RF-001-08).
 *  Con `decorativo` el ícono no se anuncia, para cuando el nombre ya está escrito al lado. */
@Component({
  selector: 'wl-icono-app',
  templateUrl: './icono-app.component.html',
  styleUrl: './icono-app.component.css',
  host: { '[style.--color-app]': 'app().color' },
})
export class IconoAppComponent {
  readonly app = input.required<AppWilla>();
  readonly decorativo = input(false);

  protected readonly fallo = signal(false);
  protected readonly siglas = computed(() => siglasApp(this.app().nombre));
  protected readonly texto = computed(() => `Ícono de ${this.app().nombre}`);
}

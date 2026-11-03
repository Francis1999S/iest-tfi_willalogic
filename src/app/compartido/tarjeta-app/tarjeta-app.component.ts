import { Component, computed, input, signal } from '@angular/core';
import { AppWilla } from '../../modelos/app-willa';
import { siglasApp } from '../../logica/siglas-app';

/** Tarjeta de una app del ecosistema: ícono (o insignia con siglas), nombre y descripción. */
@Component({
  selector: 'wl-tarjeta-app',
  templateUrl: './tarjeta-app.component.html',
  styleUrl: './tarjeta-app.component.css',
})
export class TarjetaAppComponent {
  readonly app = input.required<AppWilla>();

  protected readonly iconoFallo = signal(false);
  protected readonly siglas = computed(() => siglasApp(this.app().nombre));
  protected readonly textoIcono = computed(() => `Ícono de ${this.app().nombre}`);
}

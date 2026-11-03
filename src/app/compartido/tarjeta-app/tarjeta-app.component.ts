import { Component, input } from '@angular/core';
import { AppWilla } from '../../modelos/app-willa';
import { IconoAppComponent } from '../icono-app/icono-app.component';

/** Tarjeta de una app del ecosistema: ícono (o insignia con siglas), nombre y descripción. */
@Component({
  selector: 'wl-tarjeta-app',
  imports: [IconoAppComponent],
  templateUrl: './tarjeta-app.component.html',
  styleUrl: './tarjeta-app.component.css',
})
export class TarjetaAppComponent {
  readonly app = input.required<AppWilla>();
}

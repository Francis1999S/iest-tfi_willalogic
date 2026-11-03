import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Página de inicio: eslogan y accesos a Apps, Planes y Consulta. */
@Component({
  selector: 'wl-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}

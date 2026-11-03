import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppWilla } from '../../modelos/app-willa';
import { Plan } from '../../modelos/plan';
import { appsDePlan } from '../../logica/apps-de-plan';
import { formatoPesos, formatoUsd, precioEnPesos } from '../../logica/precios';
import { IconoAppComponent } from '../icono-app/icono-app.component';

/** Tarjeta de un plan: precios, límites, apps incluidas y acceso a la consulta. */
@Component({
  selector: 'wl-tarjeta-plan',
  imports: [RouterLink, IconoAppComponent],
  templateUrl: './tarjeta-plan.component.html',
  styleUrl: './tarjeta-plan.component.css',
})
export class TarjetaPlanComponent {
  readonly plan = input.required<Plan>();
  readonly catalogo = input.required<AppWilla[]>();
  readonly cotizacion = input<number | null>(null);

  protected readonly apps = computed(() => appsDePlan(this.plan().apps, this.catalogo()));
  protected readonly usd = computed(() => formatoUsd(this.plan().precioUsd));
  protected readonly pesos = computed(() => {
    const pesos = precioEnPesos(this.plan().precioUsd, this.cotizacion());
    return pesos === null ? null : formatoPesos(pesos);
  });
}

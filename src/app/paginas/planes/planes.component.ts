import { Component, computed, inject } from '@angular/core';
import { TarjetaPlanComponent } from '../../compartido/tarjeta-plan/tarjeta-plan.component';
import { formatoFecha } from '../../logica/fechas';
import { AppsService } from '../../servicios/apps.service';
import { PlanesService } from '../../servicios/planes.service';

/** Página `/planes`: planes con precio en dólares y aproximado en pesos. */
@Component({
  selector: 'wl-planes',
  imports: [TarjetaPlanComponent],
  templateUrl: './planes.component.html',
  styleUrl: './planes.component.css',
})
export class PlanesComponent {
  private readonly planesService = inject(PlanesService);
  private readonly appsService = inject(AppsService);

  protected readonly estado = this.planesService.estado;
  protected readonly planes = this.planesService.planes;
  protected readonly cotizacion = this.planesService.cotizacion;
  /** Si las apps no cargan, las tarjetas se muestran igual, sin la lista de apps. */
  protected readonly catalogo = this.appsService.apps;
  protected readonly fecha = computed(() => formatoFecha(this.planesService.fecha()));
}

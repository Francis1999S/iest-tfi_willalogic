import { Component, computed, inject, signal } from '@angular/core';
import { TarjetaAppComponent } from '../../compartido/tarjeta-app/tarjeta-app.component';
import { filtrarApps } from '../../logica/filtrar-apps';
import { AppsService } from '../../servicios/apps.service';

/** Página `/apps`: catálogo de aplicaciones Willa con buscador. */
@Component({
  selector: 'wl-catalogo-apps',
  imports: [TarjetaAppComponent],
  templateUrl: './catalogo-apps.component.html',
  styleUrl: './catalogo-apps.component.css',
})
export class CatalogoAppsComponent {
  private readonly appsService = inject(AppsService);

  protected readonly estado = this.appsService.estado;
  protected readonly texto = signal('');
  protected readonly visibles = computed(() => filtrarApps(this.appsService.apps(), this.texto()));
  protected readonly busqueda = computed(() => this.texto().trim());
}

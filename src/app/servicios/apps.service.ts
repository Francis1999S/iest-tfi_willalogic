import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { AppWilla } from '../modelos/app-willa';

export type EstadoCarga = 'cargando' | 'listo' | 'error';

/** Forma de `public/data/apps.json`. Los campos que no se usan quedan sin tipar. */
interface InstantaneaApps {
  base_iconos: string;
  apps: AppWilla[];
}

const URL_APPS = 'data/apps.json';

/** Lee la instantánea de apps y la entrega como señales. */
@Injectable({ providedIn: 'root' })
export class AppsService {
  private readonly http = inject(HttpClient);

  private readonly _apps = signal<AppWilla[]>([]);
  private readonly _estado = signal<EstadoCarga>('cargando');

  readonly apps = this._apps.asReadonly();
  readonly estado = this._estado.asReadonly();

  constructor() {
    this.http.get<Partial<InstantaneaApps>>(URL_APPS).subscribe({
      next: (datos) => {
        if (!Array.isArray(datos.apps)) {
          this._estado.set('error');
          return;
        }
        const base = datos.base_iconos ?? '';
        this._apps.set(datos.apps.map((a) => appPublica(a, base)));
        this._estado.set('listo');
      },
      error: () => this._estado.set('error'),
    });
  }
}

/** Copia solo los campos públicos (clarificación C2) y arma la URL del ícono. */
function appPublica(a: AppWilla, baseIconos: string): AppWilla {
  return {
    uuid: a.uuid,
    nombre: a.nombre,
    descripcion: a.descripcion,
    color: a.color,
    logo: baseIconos + a.logo,
    version: a.version,
  };
}

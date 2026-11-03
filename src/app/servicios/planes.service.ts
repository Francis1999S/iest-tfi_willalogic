import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Plan } from '../modelos/plan';
import { EstadoCarga } from './apps.service';

/** Forma de cada plan en `public/data/planes.json`. */
interface PlanCrudo {
  uuid: string;
  nombre: string;
  tipo: string;
  precio_usd: string;
  descripcion: string;
  max_sucursales: number;
  max_usuarios: number;
  soporte: string;
  apps: string[];
}

interface InstantaneaPlanes {
  capturado: string;
  cotizacion_usd: number;
  planes: PlanCrudo[];
}

const URL_PLANES = '/data/planes.json';

/** Plan destacado por decisión comercial (clarificación C3 de 002), no por un dato del JSON. */
export const PLAN_RECOMENDADO = 'Plan Escala';

/** Lee la instantánea de planes y la entrega como señales. */
@Injectable({ providedIn: 'root' })
export class PlanesService {
  private readonly http = inject(HttpClient);

  private readonly _planes = signal<Plan[]>([]);
  private readonly _cotizacion = signal<number | null>(null);
  private readonly _fecha = signal('');
  private readonly _estado = signal<EstadoCarga>('cargando');

  readonly planes = this._planes.asReadonly();
  readonly cotizacion = this._cotizacion.asReadonly();
  /** Fecha de captura de la instantánea, en formato AAAA-MM-DD. */
  readonly fecha = this._fecha.asReadonly();
  readonly estado = this._estado.asReadonly();

  constructor() {
    this.http.get<Partial<InstantaneaPlanes>>(URL_PLANES).subscribe({
      next: (datos) => {
        if (!Array.isArray(datos.planes)) {
          this._estado.set('error');
          return;
        }
        this._planes.set(datos.planes.map(planPublico));
        this._cotizacion.set(datos.cotizacion_usd ?? null);
        this._fecha.set(datos.capturado ?? '');
        this._estado.set('listo');
      },
      error: () => this._estado.set('error'),
    });
  }
}

/** Convierte el precio a número y copia solo lo que se muestra (sin `chatbot`, C5 de 002). */
function planPublico(p: PlanCrudo): Plan {
  return {
    uuid: p.uuid,
    nombre: p.nombre,
    tipo: p.tipo,
    descripcion: p.descripcion,
    precioUsd: Number(p.precio_usd),
    maxSucursales: p.max_sucursales,
    maxUsuarios: p.max_usuarios,
    soporte: p.soporte,
    apps: Array.isArray(p.apps) ? p.apps : [],
    recomendado: p.nombre === PLAN_RECOMENDADO,
  };
}

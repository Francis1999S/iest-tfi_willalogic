import { Routes } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'WillaLogic — Arquitectura digital para empresas que escalan',
    component: InicioComponent,
  },
  {
    path: 'apps',
    title: 'Aplicaciones Willa · WillaLogic',
    loadComponent: () =>
      import('./paginas/catalogo-apps/catalogo-apps.component').then(
        (m) => m.CatalogoAppsComponent,
      ),
  },
  {
    path: 'planes',
    title: 'Planes y precios · WillaLogic',
    loadComponent: () =>
      import('./paginas/planes/planes.component').then((m) => m.PlanesComponent),
  },
  {
    path: 'consulta',
    title: 'Quiero mi web · WillaLogic',
    loadComponent: () =>
      import('./paginas/consulta/consulta.component').then((m) => m.ConsultaComponent),
  },
  { path: '**', redirectTo: '' },
];

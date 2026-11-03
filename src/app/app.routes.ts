import { Routes } from '@angular/router';

export const routes: Routes = [
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
];

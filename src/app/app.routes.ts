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
];

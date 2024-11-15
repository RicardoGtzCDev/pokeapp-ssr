import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    children: [
      {
        path: 'page/:numPage',
        loadComponent: () => import('@pages/pokemons/pokemons-page.component'),
      },
      {
        path: ':pokemon',
        loadComponent: () => import('@pages/pokemon/pokemon-page.component'),
      },
      {
        path: '',
        redirectTo: 'page/1',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('@pages/about/about-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('@pages/pricing/pricing-page.component')
  },
  {
    path: 'contact',
    loadComponent: () => import('@pages/contact/contact-page.component')
  },
  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found-page.component')
  }
];
